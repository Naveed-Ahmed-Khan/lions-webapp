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

export default function TutorSignup() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <div className="py-12 px-8">
          <ChevronDots
            steps={["Personal", "Career", "Profile"]}
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
        Personal Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup horizontal>
          <InputGroup label="First Name" type="text" name="firstName" />
          <InputGroup label="Last Name" type="text" name="lastName" />
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
function Career({ setCurrentStep }) {
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
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
      <h1 className="text-4xl font-bold text-center text-primary">
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
