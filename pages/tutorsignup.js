import React, { useMemo, useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Input from "../components/UI/Input";
import InputFile from "../components/UI/InputFile";
import TextArea from "../components/UI/TextArea";
import Select from "../components/UI/Select";
import DatePicker from "../components/UI/DatePicker";
import { fileToBase64 } from "../public/utility/filetobase64";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import * as yup from "yup";

export default function TutorSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  // console.log(currentStep);
  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Tutor Signup
        </h1>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            steps={["Account", "Personal", "Qualification", "Profile"]}
            currentStep={currentStep}
          />
        </div>
        <div className="px-5">
          {currentStep === 1 && <Account setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Personal setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && (
            <Qualification setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 4 && <Profile setCurrentStep={setCurrentStep} />}
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
      localStorage.setItem("Account", JSON.stringify(values));
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

        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function Personal({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      cnic: "",
      mobile: "",
      watsapp: "",
      gender: "",
      dateOfBirth: new Date(),
      address: "",
      city: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      localStorage.setItem("Personal", JSON.stringify(values));
      setCurrentStep((prev) => ++prev);
    },
  });
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Personal Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup horizontal>
          <Input required label="Full Name" name={"fullName"} formik={formik} />
          <Input required label="CNIC" name={"cnic"} formik={formik} />
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            type={"date"}
            label="Date of Birth"
            name={"dateOfBirth"}
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
            type="tel"
            name={"mobile"}
            formik={formik}
          />
          <Input
            required
            label="Watsapp No."
            type="tel"
            name={"watsapp"}
            formik={formik}
          />
        </FormGroup>

        <FormGroup>
          <Input required label="City" name={"city"} formik={formik} />
        </FormGroup>

        <FormGroup>
          <TextArea required label="Address" name={"address"} formik={formik} />
        </FormGroup>

        <div className="space-y-4 sm:space-y-0 sm:flex gap-8">
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

function Qualification({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      qualification: "",
      institute: "",
      passingYear: "",
      job: "",
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
            name={"institute"}
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
          <Input required label="Current Job" name={"job"} formik={formik} />
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
        <div className="space-y-4 sm:space-y-0 sm:flex gap-8">
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

function Profile({ setCurrentStep }) {
  const [imagePath, setImagePath] = useState(null);
  const [data, setData] = useState(null);
  console.log(data);
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
      subjects: "",
      classes: "",
      modesOfTeaching: "",
      achievements: "",
    },
    onSubmit: async (values) => {
      try {
        values.profilePic = await fileToBase64(imagePath);
        // console.log(values);
        localStorage.setItem("Profile", JSON.stringify(values));
      } catch (error) {
        console.log(error);
      }

      const account = JSON.parse(localStorage.getItem("Account"));
      const profile = JSON.parse(localStorage.getItem("Profile"));
      const personal = JSON.parse(localStorage.getItem("Personal"));
      const qualification = JSON.parse(localStorage.getItem("Qualification"));

      if (account && profile && personal && qualification) {
        setData({ ...account, ...profile, ...personal, ...qualification });
      }
      router.push("/");
      localStorage.clear();
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
          <Input required label="Subjects" name={"subjects"} formik={formik} />
        </FormGroup>
        <FormGroup>
          <Input required label="Classes" name={"classes"} formik={formik} />
        </FormGroup>
        <FormGroup>
          <Select
            required
            label="Mode of Teaching"
            name="modesOfTeaching"
            formik={formik}
          >
            <option value={""}>Select</option>
            <option value={"One to One"}>One to One</option>
            <option value={"Online"}>Online</option>
          </Select>
        </FormGroup>

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
        <div className="flex gap-8">
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
