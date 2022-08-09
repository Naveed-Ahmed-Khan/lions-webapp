import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import SelectGroup from "../components/UI/SelectGroup";
import InputGroup from "../components/UI/InputGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";
import TextArea from "../components/UI/TextArea";

export default function JobPosting() {
  const [currentStep, setCurrentStep] = useState(1);
  console.log(currentStep);
  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Job Posting
        </h1>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            steps={["Account", "Tutor", "Description"]}
            currentStep={currentStep}
          />
        </div>
        <div className="px-5">
          {currentStep === 1 && <Personal setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Tutor setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <Profile setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </Container>
  );
}
function Personal({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      subjects: [],
      class: "",
      institute: "",
      duration: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      setCurrentStep((prev) => ++prev);
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Student Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup>
          <Input
            required
            label="Subjects"
            type="text"
            name="subjects"
            value={formik.values.subjects}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Class"
            type="text"
            name="class"
            value={formik.values.class}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Institute"
            type="text"
            name="institute"
            value={formik.values.institute}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Select
            required
            label="Duration"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="More Than 3 Months">More Than 3 Months</option>
          </Select>
        </FormGroup>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}
function Tutor({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      qualification: "",
      gender: "",
      city: "",
      experience: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      setCurrentStep((prev) => ++prev);
    },
  });
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Tutor Requirements
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup>
          <Select
            required
            label="Qualification"
            type="text"
            name="qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
            <option value="Any">Any</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Select
            required
            label="Gender Preference"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="None">None</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="City"
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Experience"
            type="text"
            name="experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
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
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      aboutStudent: "",
      budget: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      router.push("/");
    },
  });
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Job Description
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup>
          <Input
            required
            label="Expected budget"
            type="text"
            name="budget"
            value={formik.values.budget}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <TextArea
            required
            rows={6}
            label="Job Description"
            type="text"
            name="jobDescription"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <TextArea
            required
            rows={6}
            label="About Student"
            type="text"
            name="aboutStudent"
            value={formik.values.aboutStudent}
            onChange={formik.handleChange}
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
          <Button type="submit">Post Job</Button>
        </div>
      </form>
    </div>
  );
}
