import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import SelectGroup from "../components/UI/SelectGroup";
import InputGroup from "../components/UI/InputGroup";
import Button from "../components/UI/Button";
// import CheckboxGroup from "../components/CheckboxGroup";
// import TextareaGroup from "../components/UI/TextareaGroup";
// import Button from "../components/UI/Button";

const Personal = ({ setCurrentStep }) => {
  return (
    <div className="my-12 pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-center text-primary">
        Personal Details
      </h1>
      <form className="mt-2 w-full">
        <FormGroup horizontal>
          <InputGroup label="First Name" type="text" name="firstName" />
          <InputGroup label="Last Name" type="text" name="lastName" />
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
};
const Career = ({ setCurrentStep }) => {
  return (
    <div className="my-12 pb-12 w-full max-w-screen-md mx-auto">
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
};
const Profile = ({ setCurrentStep }) => {
  return (
    <div className="my-12 pb-12 w-full max-w-screen-md mx-auto">
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
        <Button onClick={() => setCurrentStep(1)}>Submit</Button>
      </form>
    </div>
  );
};

function SimpleOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="container mx-auto">
      {/* <div className="w-full flex justify-between item-center py-6">
        <div className="h-8">
          <img
            src="https://gustui.s3.amazonaws.com/gustlogo.png"
            className="h-full"
          />
        </div>
        <a href="#" className="no-underline font-medium text-blue-400">
          Get Help
        </a>
      </div> */}
      <div className="mt-8 pb-4">
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
  );
}

export default SimpleOnboarding;
