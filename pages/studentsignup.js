import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import SelectGroup from "../components/UI/SelectGroup";
import InputGroup from "../components/UI/InputGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { useRouter } from "next/router";
// import CheckboxGroup from "../components/CheckboxGroup";
// import TextareaGroup from "../components/UI/TextareaGroup";
// import Button from "../components/UI/Button";

export default function StudentSignup() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <div className="py-12 px-8">
          <ChevronDots
            steps={["Personal", "Student", "Academics"]}
            currentStep={currentStep}
          />
        </div>
        <div className="">
          {currentStep === 1 && <Personal setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Student setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Class setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </Container>
  );
}

function Personal({ setCurrentStep }) {
  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Personal Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup>
          <InputGroup
            label="Parent/Gurdian Name"
            type="text"
            name="firstName"
          />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Email" type="text" />
        </FormGroup>
        <FormGroup horizontal>
          <SelectGroup
            label="Country of Residence"
            placeholder="Select..."
            name="country"
            options={[
              {
                value: "Australia",
                label: "Australia",
              },
              {
                value: "Japan",
                label: "Japan",
              },
              {
                value: "United States",
                label: "United States",
              },
              {
                value: "United Kingdom",
                label: "United Kingdom",
              },
            ]}
          />
          <InputGroup label="City" type="text" name="city" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Address" type="text" />
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
        <Button onClick={() => setCurrentStep((prev) => ++prev)}>Next</Button>
      </form>
    </div>
  );
}
function Student({ setCurrentStep }) {
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Student Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup>
          <InputGroup label="Student Name" type="text" name="lastName" />
        </FormGroup>
        <FormGroup horizontal>
          <InputGroup label="Age" type="text" name="lastName" />
          <InputGroup label="Gender" type="text" name="lastName" />
        </FormGroup>
        <FormGroup horizontal>
          <InputGroup label="Class" type="text" name="firstName" />
          <InputGroup label="Institute" type="text" name="lastName" />
        </FormGroup>
        <FormGroup>
          {/* <InputGroup label="Resume" type="file" name="resume" /> */}
        </FormGroup>
        <FormGroup>{/* <Button text="Next" submit full /> */}</FormGroup>
        <Button onClick={() => setCurrentStep((prev) => ++prev)}>Next</Button>
      </form>
    </div>
  );
}
function Class({ setCurrentStep }) {
  const router = useRouter();
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Academics Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup>
          {/* <InputGroup label="Profile Picture" type="file" name="resume" /> */}
          <InputGroup label="About Student" type="text" name="firstName" />
          <InputGroup label="Subjects" type="text" name="firstName" />
          <InputGroup label="Achievements" type="text" name="firstName" />
          {/* <InputGroup label="Achievements" type="file" name="resume" /> */}
          {/* <InputGroup label="Intermediate" type="text" name="lastName" />
      <InputGroup label="Matric" type="text" name="lastName" /> */}
        </FormGroup>
        <FormGroup>
          {/* <InputGroup label="Resume" type="file" name="resume" /> */}
        </FormGroup>
        <FormGroup>{/* <Button text="Next" submit full /> */}</FormGroup>
        <Button
          type={"button"}
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
