import React, { useMemo, useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import InputFile from "../components/UI/InputFile";
import TextArea from "../components/UI/TextArea";
import { filetobase64 } from "../utility/filetobase64";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import * as yup from "yup";

export default function StudentSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  // console.log(currentStep);
  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Student Signup
        </h1>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            steps={["Account", "Student"]}
            currentStep={currentStep}
          />
        </div>
        <div className="px-5">
          {currentStep === 1 && <Account setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Student setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </Container>
  );
}

function Account({ setCurrentStep }) {
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
    onSubmit: (values) => {
      // console.log(values);
      localStorage.setItem(
        "Account",
        JSON.stringify({ email: values.email, password: values.password })
      );
      setCurrentStep((prev) => ++prev);
    },
  });

  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Account Details
      </h1>
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
        <div className="sm:pt-4">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

function Student({ setCurrentStep }) {
  const { signup } = useAuth();
  const [imagePath, setImagePath] = useState(null);
  const [error, setError] = useState("");

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
      address: "",
    },
    onSubmit: async (values) => {
      try {
        values.profilePic = await filetobase64(imagePath);
        // console.log(values.profilePic);
        localStorage.setItem("Student", JSON.stringify(values));
      } catch (error) {
        console.log(error);
      }

      const account = JSON.parse(localStorage.getItem("Account"));
      const student = JSON.parse(localStorage.getItem("Student"));

      if (account && student) {
        setError("");
        const data = {
          ...account,
          ...student,
          userType: "student",
        };
        console.log(data);
        try {
          const response = await signup(data);
          console.log(response);
          if (response.error) {
            setError(response.error);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      }
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Student Details
      </h1>
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

        <FormGroup horizontal>
          <Input
            required
            label="Student Name"
            type="text"
            name={"name"}
            formik={formik}
          />
          <Input
            required
            label="City"
            type="text"
            name={"city"}
            formik={formik}
          />
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
          <Button
            type="button"
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
          >
            Back
          </Button>
          <Button type="submit">Create and Account</Button>
        </div>
      </form>
    </div>
  );
}
