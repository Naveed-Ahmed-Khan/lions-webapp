import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import SelectGroup from "../components/UI/SelectGroup";
import InputGroup from "../components/UI/InputGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { useRouter } from "next/dist/client/router";
// import CheckboxGroup from "../components/CheckboxGroup";
// import TextareaGroup from "../components/UI/TextareaGroup";
// import Button from "../components/UI/Button";

export default function JobPosting() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        {/* <div className="pt-12 px-16">
          <h1 className="text-3xl text-gray-500 font-semibold">
            Tutor Registration
          </h1>
        </div> */}
        <div className="py-12 px-8">
          <ChevronDots
            steps={["Student", "Tutor", "Description"]}
            currentStep={currentStep}
          />
        </div>
        <div>
          {currentStep === 1 && <Personal setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Career setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Profile setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </Container>
  );
}

function Personal({ setCurrentStep }) {
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Student Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup>
          <InputGroup label="Subjects" type="text" name="firstName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Class" type="text" name="firstName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Institute" type="text" name="firstName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Duration" type="text" />
        </FormGroup>
        <Button onClick={() => setCurrentStep((prev) => ++prev)}>Next</Button>
      </form>
    </div>
  );
}
function Career({ setCurrentStep }) {
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Tutor Requirements
      </h1>
      <form className="mt-2 w-full">
        <FormGroup horizontal>
          <InputGroup label="Qualification" type="text" name="firstName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Gender Preference" type="text" name="lastName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Location" type="text" name="lastName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Experience" type="text" name="lastName" />
        </FormGroup>
        <Button onClick={() => setCurrentStep((prev) => ++prev)}>Next</Button>
      </form>
    </div>
  );
}
function Profile({ setCurrentStep }) {
  const router = useRouter();
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Job Description
      </h1>
      <form className="mt-2 w-full">
        <FormGroup>
          <InputGroup label="Description" type="text" name="lastName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="About Student" type="text" name="lastName" />
        </FormGroup>
        <FormGroup>
          <InputGroup label="Expected budget" type="text" name="lastName" />
        </FormGroup>
        <Button
          onClick={() => {
            router.push("/");
            setCurrentStep(1);
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
