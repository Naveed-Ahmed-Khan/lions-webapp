import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import SelectGroup from "../components/UI/SelectGroup";
import InputGroup from "../components/UI/InputGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { useRouter } from "next/dist/client/router";
import Input from "../components/UI/Input";
import { useFormik } from "formik";
import InputFile from "../components/UI/InputFile";
import TextArea from "../components/UI/TextArea";
import Select from "../components/UI/Select";
// import CheckboxGroup from "../components/CheckboxGroup";
// import TextareaGroup from "../components/UI/TextareaGroup";
// import Button from "../components/UI/Button";

export default function TutorSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  console.log(currentStep);
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
          {currentStep === 4 && <Profile />}
        </div>
      </div>
    </Container>
  );
}

function Account({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setCurrentStep((prev) => ++prev);
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Account Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup>
          <Input
            required
            label="Email"
            type="email"
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            required
            label="Password"
            type="password"
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            required
            label="Confirm Password"
            type="text"
            name={"confirmPassword"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <Button type={"submit"}>Next</Button>
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
      dateOfBirth: "",
      address: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setCurrentStep((prev) => ++prev);
    },
  });
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Personal Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup horizontal>
          <Input
            required
            label="Full Name"
            type="text"
            name={"fullName"}
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="CNIC"
            type="text"
            name={"cnic"}
            value={formik.values.cnic}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            label="Date of Birth"
            type="text"
            name={"dateOfBirth"}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="Gender"
            type="text"
            name={"gender"}
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            label="Mobile No."
            type="text"
            name={"mobile"}
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="Watsapp No."
            type="text"
            name={"watsapp"}
            value={formik.values.watsapp}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Address"
            type="text"
            name={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <Button type={"submit"}>Next</Button>
      </form>
    </div>
  );
}

function Qualification({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      qualification: "",
      Institute: "",
      passingYear: new Date().getFullYear(),
      job: "",
      jobInstitute: "",
      experience: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setCurrentStep((prev) => ++prev);
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Qualification Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup horizontal>
          <Input
            required
            label="Highest Qualification"
            type="text"
            name={"qualification"}
            value={formik.values.qualification}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup horizontal>
          <Input
            required
            label="Institute"
            type="text"
            name={"institute"}
            value={formik.values.institute}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="Passing Year"
            type="text"
            name={"passingYear"}
            value={formik.values.passingYear}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup horizontal>
          <Input
            required
            label="Current Job"
            type="text"
            name={"job"}
            value={formik.values.job}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="Experience"
            type="text"
            name={"experience"}
            value={formik.values.experience}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Associated Institute"
            type="text"
            name={"jobInstitute"}
            value={formik.values.jobInstitute}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <Button type="submit">Next</Button>
        <Button
          onClick={() => {
            setCurrentStep((prev) => --prev);
          }}
          type="button"
        >
          Back
        </Button>
      </form>
    </div>
  );
}

function Profile() {
  const formik = useFormik({
    initialValues: {
      profilePic: "",
      aboutMe: "",
      subjects: [],
      classes: [],
      modesOfTeaching: "",
      achievement: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // router.push("/");
    },
  });
  const router = useRouter();
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Profile Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <div className="sm:flex gap-6">
          <div className=" mb-6 sm:mb-0 bg-gray-300 h-40 w-40" />
          <div className="flex-auto self-end">
            <InputFile label="Profile Picture" />
          </div>
        </div>

        <FormGroup>
          <Input
            required
            label="Subjects"
            type="text"
            name={"subjects"}
            value={formik.values.subjects}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Classes"
            type="text"
            name={"classes"}
            value={formik.values.classes}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Select
            required
            label="Mode of Teaching"
            type="text"
            name={"modeOfTeaching"}
            value={formik.values.modesOfTeaching}
            onChange={formik.handleChange}
          >
            <option value={"One to One"}>One to One</option>
            <option value={"Online"}>Online</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <TextArea
            required
            rows={6}
            label="About Me"
            type="text"
            name={"aboutMe"}
            value={formik.values.aboutMe}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <TextArea
            required
            rows={6}
            label="Achievements"
            type="text"
            name={"achievements"}
            value={formik.values.achievements}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <Button type="submit">Create and Account</Button>
        <Button
          onClick={() => {
            setCurrentStep((prev) => --prev);
          }}
          type="button"
        >
          Back
        </Button>
      </form>
    </div>
  );
}
