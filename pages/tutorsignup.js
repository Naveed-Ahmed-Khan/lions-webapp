import React, { useEffect, useMemo, useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import InputFile from "../components/UI/InputFile";
import TextArea from "../components/UI/TextArea";
import Select from "../components/UI/Select";
import DatePicker from "../components/UI/DatePicker";
import { filetobase64 } from "../util/filetobase64";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import * as yup from "yup";
import axios from "axios";
import CheckBox from "../components/UI/CheckBox";
import Spinner from "../components/UI/loader/Spinner";

export async function getStaticProps() {
  const areas = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-areas`);
  const cities = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-allcities`
  );
  console.log(cities.data);
  return {
    props: {
      areas: areas.data,
      cities: cities.data,
    },
    revalidate: 30,
  };
}

export default function TutorSignup({ areas, cities }) {
  console.log(cities);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(null);
  // console.log(currentStep);
  useEffect(() => {
    const step = localStorage.getItem("step");
    step ? setCurrentStep(Number(step)) : setCurrentStep(1);
    return () => {
      localStorage.removeItem("Account");
      localStorage.removeItem("Personal");
      localStorage.removeItem("Profile");
      localStorage.removeItem("step");
    };
  }, [router.pathname !== "/tutorsignup"]);

  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Tutor Signup
        </h1>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            // steps={["Account", "Personal", "Qualification", "Profile"]}
            steps={["Personal", "Profile", "Account"]}
            currentStep={currentStep}
          />
        </div>

        <div className="px-5">
          {currentStep === 1 && (
            <Personal
              cities={cities}
              areas={areas}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && <Profile setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Account setCurrentStep={setCurrentStep} />}
          {/* {currentStep === 3 && (
            <Qualification setCurrentStep={setCurrentStep} />
          )}*/}
        </div>
      </div>
    </Container>
  );
}
function Personal({ cities, areas, setCurrentStep }) {
  console.log(cities);
  console.log(areas);

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      cnic: "",
      birth: "",
      gender: "",
      mobile: "",
      watsapp: "",
      city: "",
      area: "",
      teachingModes: [],
      address: "",
    },
    onSubmit: async (values) => {
      // console.log(values);
      localStorage.setItem("Personal", JSON.stringify(values));

      setCurrentStep((prev) => ++prev);
      localStorage.setItem("step", 2);
    },
  });
  const modes = [
    { label: "Tutor travels", value: "Tutor travels" },
    { label: "Student travels", value: "Student travels" },
    { label: "Online", value: "Online" },
  ];

  const modesHandler = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("teachingModes", [
        ...formik.values.teachingModes,
        e.target.name,
      ]);
    } else {
      formik.setFieldValue(
        "teachingModes",
        formik.values.teachingModes.filter(
          (item) => item.name !== e.target.name
        )
      );
    }
  };

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Personal Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup horizontal>
          <Input required label="Full Name" name={"name"} formik={formik} />
          <Input
            required
            type="number"
            label="CNIC"
            name={"cnic"}
            formik={formik}
          />
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            type={"date"}
            label="Date of Birth"
            name={"birth"}
            formik={formik}
          />
          <Select required label="Gender" name="gender" formik={formik}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            label="Mobile No."
            type="number"
            name={"mobile"}
            formik={formik}
          />
          <Input
            required
            label="Watsapp No."
            type="number"
            name={"watsapp"}
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

        {/* <div className="mt-5">
          <h3 className="mb-2 text-gray-600 font-medium">
            Availablity (from - to)
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <Input
              required
              type="time"
              name={"availableFrom"}
              formik={formik}
            />

            <Input required type="time" name={"availableTo"} formik={formik} />
          </div>
        </div> */}

        <div className="my-5">
          <p className="text-gray-600 font-medium ">Modes of Teaching</p>
          <div className="px-2 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-8 ">
            {modes.map((mode) => {
              return (
                <div key={mode.label}>
                  <CheckBox
                    label={mode.label}
                    name={mode.value}
                    onChange={modesHandler}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <FormGroup>
          <TextArea required label="Address" name={"address"} formik={formik} />
        </FormGroup>

        <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
          {/* <Button
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
            type="button"
          >
            Back
          </Button> */}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

function Profile({ setCurrentStep }) {
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
      profilePic: "",
      aboutMe: "",
      achievements: "",
    },
    onSubmit: async (values) => {
      try {
        values.profilePic = await filetobase64(imagePath);
        // console.log(values.profilePic);
        localStorage.setItem("Profile", JSON.stringify(values));
        setCurrentStep((prev) => ++prev);
        localStorage.setItem("step", 3);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Profile Details
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
              required
              type="file"
              label="Profile Picture"
              name={"profilePic"}
              onChange={(e) => {
                setImagePath(e.target.files[0]);
              }}
            />
          </div>
        </div>

        {/* <FormGroup>
          <Input required label="Subjects" name={"subjects"} formik={formik} />
        </FormGroup>
        <FormGroup>
          <Input required label="Classes" name={"classes"} formik={formik} />
        </FormGroup> */}
        {/* <FormGroup>
          <Select
            required
            label="Mode of Teaching"
            name="teachingMode"
            formik={formik}
          >
            <option value={""}>Select</option>
            <option value={"One to One"}>One to One</option>
            <option value={"Online"}>Online</option>
          </Select>
        </FormGroup> */}

        <FormGroup>
          <TextArea
            required
            label="About Me"
            name={"aboutMe"}
            formik={formik}
          />
        </FormGroup>

        <FormGroup>
          <TextArea
            required
            label="Achievements"
            name={"achievements"}
            formik={formik}
          />
        </FormGroup>
        <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
          {/* <Button
            type="button"
            onClick={() => {
              setCurrentStep((prev) => ++prev);
            }}
          >
            Next
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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      // console.log(values);
      localStorage.setItem(
        "Account",
        JSON.stringify({ email: values.email, password: values.password })
      );

      const account = JSON.parse(localStorage.getItem("Account"));
      const personal = JSON.parse(localStorage.getItem("Personal"));
      const profile = JSON.parse(localStorage.getItem("Profile"));

      if (account && personal && profile) {
        // setError("");
        const data = {
          ...account,
          tutor: {
            ...personal,
            email: account.email,
            profilePic: profile.profilePic,
            sections: [
              {
                type: "Collapsable",
                title: "Profile",
                subSections: [
                  {
                    heading: "About Me",
                    content: profile.aboutMe,
                  },
                  {
                    heading: "Achievements",
                    content: profile.achievements,
                  },
                ],
              },
            ],
          },
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
        } finally {
          setIsLoading(false);
        }
      }
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
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Spinner sm text={"text-white"} stroke={"stroke-white"} />
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Qualification({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      qualification: "",
      degreeInstitute: "",
      passingYear: "",
      jobTitle: "",
      jobInstitute: "",
      experience: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      localStorage.setItem("Qualification", JSON.stringify(values));
      setCurrentStep((prev) => ++prev);
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Qualification Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup horizontal>
          <Select
            required
            label="Highest Qualification"
            name={"qualification"}
            formik={formik}
          >
            <option value="">Select</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </Select>
        </FormGroup>
        <FormGroup horizontal>
          <Input
            required
            label="Institute"
            name={"degreeInstitute"}
            formik={formik}
          />
          <Input
            required
            label="Passing Year"
            type="number"
            name={"passingYear"}
            formik={formik}
          />
        </FormGroup>
        <FormGroup horizontal>
          <Input
            required
            label="Current Job"
            name={"jobTitle"}
            formik={formik}
          />
          <Input
            required
            label="Experience"
            type="number"
            name={"experience"}
            formik={formik}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Associated Institute"
            name={"jobInstitute"}
            formik={formik}
          />
        </FormGroup>
        <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
          <Button
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
            type="button"
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
