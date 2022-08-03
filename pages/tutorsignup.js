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
// import CheckboxGroup from "../components/CheckboxGroup";
// import TextareaGroup from "../components/UI/TextareaGroup";
// import Button from "../components/UI/Button";

export default function TutorSignup() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Tutor Signup
        </h1>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            steps={["Personal", "Career", "Profile"]}
            currentStep={currentStep}
          />
        </div>
        <div className="px-5">
          {currentStep === 1 && <Personal setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Career setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Profile setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </Container>
  );
}

function Personal({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
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
            label="First Name"
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Email"
            type="text"
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Address"
            type="text"
            name={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          {/* <InputGroup label="Short Bio" type="text" /> */}
          {/* <TextareaGroup label="Short Bio" name="bio" /> */}
          {/* <InputGroup label="Short Bio" type="file" name="resume" /> */}
        </FormGroup>

        <FormGroup>
          {/* <InputGroup label="Resume" type="file" name="resume" /> */}
        </FormGroup>

        <FormGroup>{/* <Button text="Next" submit full /> */}</FormGroup>

        <Button type={"submit"}>Next</Button>
      </form>
    </div>
  );
}
function Career({ setCurrentStep }) {
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Career Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup horizontal>
          <InputGroup label="Bachelor" type="text" name="firstName" />
          <InputGroup label="Intermediate" type="text" name="lastName" />
          <InputGroup label="Matric" type="text" name="lastName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Resume" type="file" name="resume" />
        </FormGroup>
        <FormGroup>{/* <Button text="Next" submit full /> */}</FormGroup>
        <Button onClick={() => setCurrentStep((prev) => ++prev)}>Next</Button>
      </form>
    </div>
  );
}
function Profile({ setCurrentStep }) {
  const router = useRouter();
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Profile Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup>
          <InputGroup label="Profile Picture" type="file" name="resume" />
          <InputGroup label="About Me" type="text" name="firstName" />
          <InputGroup label="Courses" type="text" name="firstName" />
          <InputGroup label="Certificates" type="file" name="resume" />

          {/* <InputGroup label="Intermediate" type="text" name="lastName" />
          <InputGroup label="Matric" type="text" name="lastName" /> */}
        </FormGroup>
        <FormGroup>
          {/* <InputGroup label="Resume" type="file" name="resume" /> */}
        </FormGroup>
        <FormGroup>{/* <Button text="Next" submit full /> */}</FormGroup>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
