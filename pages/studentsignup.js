import React, { useEffect, useMemo, useState } from "react";

import Button from "../components/UI/Button";
import ChevronDots from "../components/UI/ChevronDots";
import Container from "../components/UI/Container";
import FormGroup from "../components/UI/FormGroup";
import Input from "../components/UI/Input";

import Image from "next/image";
import TextArea from "../components/UI/TextArea";
import { filetobase64 } from "../util/filetobase64";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import Select from "../components/UI/Select";
import { useAuth } from "../contexts/AuthContext";

export async function getServerSideProps() {
  const areas = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-areas`);
  const cities = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-allcities`
  );

  return {
    props: {
      areas: areas.data,
      cities: cities.data,
    },
  };
}

export default function StudentSignup({ areas, cities }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(null);

  // console.log(currentStep);

  useEffect(() => {
    const step = localStorage.getItem("step");
    step ? setCurrentStep(Number(step)) : setCurrentStep(1);
    return () => {
      localStorage.removeItem("Account");
      localStorage.removeItem("Student");
      localStorage.removeItem("step");
    };
  }, [router.pathname !== "/studentsignup"]);
  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h2 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Student Signup
        </h2>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            steps={["Student", "Account"]}
            currentStep={currentStep}
          />
        </div>
        <div className="px-5">
          {currentStep === 1 && (
            <Student
              cities={cities}
              areas={areas}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && <Account setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </Container>
  );
}

function Student({ cities, areas, setCurrentStep }) {
  const [imagePath, setImagePath] = useState(null);

  const router = useRouter();

  // console.log(imagePath);

  const path = useMemo(
    () => imagePath && URL.createObjectURL(imagePath),
    [imagePath]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      profilePic: "",
      city: "",
      area: "",
      address: "",
    },
    onSubmit: async (values) => {
      try {
        values.profilePic = await filetobase64(imagePath);
        // console.log(values.profilePic);
        localStorage.setItem("Student", JSON.stringify(values));
        localStorage.setItem("step", JSON.stringify(2));
        setCurrentStep((prev) => ++prev);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-primary">
        Student Details
      </h2>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <div className="relative sm:flex gap-6">
          {path ? (
            <Image
              height={160}
              width={160}
              layout="fixed"
              className="object-cover rounded-lg"
              src={path}
              alt=""
            />
          ) : (
            <div className=" mb-6 sm:mb-0 bg-gray-300 h-40 w-40 rounded-lg" />
          )}

          <div className="flex-auto self-end">
            <Input
              type="file"
              label="Profile Picture"
              name={"profilePic"}
              onChange={(e) => {
                setImagePath(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <FormGroup>
          <Input
            required
            label="Student Name"
            type="text"
            name={"name"}
            formik={formik}
          />
        </FormGroup>
        <FormGroup horizontal>
          <Select required label="City" name={"city"} formik={formik}>
            <option value="">Select</option>
            {cities.map((city) => {
              return (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              );
            })}
          </Select>
          <Select
            required
            disabled={!formik.values.city ? true : false}
            label="Area"
            name={"area"}
            formik={formik}
          >
            <option value="">Select</option>
            {areas
              .filter((area) => area.city_id.name === formik.values.city)
              .map((area) => {
                return (
                  <option key={area._id} value={area.name}>
                    {area.name}
                  </option>
                );
              })}
          </Select>
        </FormGroup>

        <FormGroup>
          <TextArea
            required
            rows={6}
            label="Address"
            type="text"
            name={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
          {/* <Button
            type="button"
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
          >
            Back
          </Button> */}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

function Account({ setCurrentStep }) {
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState("");

  const signupSchema = yup.object({
    email: yup.string("Enter your email").email("Enter a valid email"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length"),
    confirmPassword: yup
      .string("Confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      // console.log(values);
      localStorage.setItem(
        "Account",
        JSON.stringify({ email: values.email, password: values.password })
      );
      const account = JSON.parse(localStorage.getItem("Account"));
      const student = JSON.parse(localStorage.getItem("Student"));

      if (account && student) {
        setError("");
        const data = {
          ...account,
          ...student,
          userType: "student",
          userStatus: "unverified",
          tag: "none",
        };
        console.log(data);
        try {
          const response = await signup(data);
          console.log(response);
          if (response.error) {
            setError(response.error);
          } else {
            router.push("/login");
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      }
    },
  });

  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-primary">
        Account Details
      </h2>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup>
          <Input required label="Email" name={"email"} formik={formik} />
        </FormGroup>

        <FormGroup>
          <Input required label="Password" name={"password"} formik={formik} />
        </FormGroup>

        <FormGroup>
          <Input
            required
            label="Confirm Password"
            name={"confirmPassword"}
            formik={formik}
          />
        </FormGroup>
        {error && (
          <p
            onClick={() => {
              setError("");
            }}
            className="cursor-pointer mt-4 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg"
          >
            {error}, please try again.
          </p>
        )}
        <div className="sm:pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
