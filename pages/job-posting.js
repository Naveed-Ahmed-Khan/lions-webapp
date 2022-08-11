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
import { useAuth } from "../contexts/AuthContext";
import AccessDenied from "../components/UI/AccessDenied";
import axios from "axios";

export default function JobPosting() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(3);
  const { currentUser } = useAuth();
  console.log(currentStep);
  return (
    <>
      {currentUser?.userType !== "student" && <AccessDenied />}

      <Container color={"gray-50"}>
        <div className="bg-white w-full mx-auto">
          <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
            Job Posting
          </h1>
          <div className="hidden sm:block pt-6 pb-12 px-8">
            <ChevronDots
              steps={["Student", "Tutor", "Description"]}
              currentStep={currentStep}
            />
          </div>
          <div className="px-5">
            {currentStep === 1 && <Student setCurrentStep={setCurrentStep} />}
            {currentStep === 2 && <Tutor setCurrentStep={setCurrentStep} />}
            {currentStep === 3 && (
              <Description setCurrentStep={setCurrentStep} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
function Student({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      subjects: "",
      class: "",
      institute: "",
      duration: "",
    },
    onSubmit: (values) => {
      localStorage.setItem("Student", JSON.stringify(values));
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
            formik={formik}
          />
        </FormGroup>
        <FormGroup horizontal>
          <Input
            required
            label="Class"
            type="text"
            name="class"
            formik={formik}
          />
          <Select required label="Duration" name="duration" formik={formik}>
            <option value="">Select</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="More Than 3 Months">More Than 3 Months</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Institute"
            type="text"
            name="institute"
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
function Tutor({ setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      qualification: "",
      teachingMode: "",
      gender: "",
      city: "",
      experience: "",
    },
    onSubmit: (values) => {
      localStorage.setItem("Tutor", JSON.stringify(values));
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
            formik={formik}
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
          <Input
            required
            label="Experience"
            type="text"
            name="experience"
            formik={formik}
          />
        </FormGroup>

        <FormGroup horizontal>
          <Select
            required
            label="Mode of Teaching"
            name="teachingMode"
            formik={formik}
          >
            <option value="">Select</option>
            <option value="One to One">One to One</option>
            <option value="Online">Online</option>
          </Select>
          <Select
            required
            label="Gender Preference"
            name="gender"
            formik={formik}
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
function Description({ setCurrentStep }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      budget: "",
      description: "",
    },
    onSubmit: async (values) => {
      localStorage.setItem("Description", JSON.stringify(values));

      const student = JSON.parse(localStorage.getItem("Student"));
      const tutor = JSON.parse(localStorage.getItem("Tutor"));
      const description = JSON.parse(localStorage.getItem("Description"));

      if (student && tutor && description) {
        setError("");
        const data = {
          ...student,
          ...tutor,
          ...description,
          user_id: currentUser.userId,
          isFeatured: false,
        };
        console.log(data);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/add-job`,
            data
          );
          console.log(response.data);
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
            formik={formik}
          />
        </FormGroup>
        <FormGroup>
          <TextArea
            required
            label="Job Description"
            type="text"
            name="description"
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
          <Button type="submit">Post Job</Button>
        </div>
      </form>
    </div>
  );
}
