import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import { useFormik } from "formik";
import InputFile from "../components/UI/InputFile";
import TextArea from "../components/UI/TextArea";
import { filetobase64 } from "../utility/filetobase64";
import Image from "next/image";
import { useRouter } from "next/router";

export default function StudentSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  console.log(currentStep);
  return (
    <Container color={"gray-50"}>
      <div className="bg-white w-full mx-auto">
        <h1 className="py-6 text-gray-600 text-3xl sm:text-4xl text-center font-bold">
          Student Signup
        </h1>
        <div className="hidden sm:block pt-6 pb-12 px-8">
          <ChevronDots
            steps={["Account", "Student"]}
            currentStep={currentStep}
          />
        </div>
        <div className="px-5">
          {currentStep === 1 && <Account setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Personal setCurrentStep={setCurrentStep} />}
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
      // alert(JSON.stringify(values, null, 2));
      setCurrentStep((prev) => ++prev);
    },
  });

  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
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
            type="text"
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

        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function Personal({ setCurrentStep }) {
  const [imagePath, setImagePath] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      profilePic: "",
      city: "",
      address: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      router.push("/");
    },
  });
  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Student Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <div className="relative sm:flex gap-6">
          {imagePath ? (
            <Image
              height={160}
              width={160}
              layout="fixed"
              className="object-cover rounded"
              src={imagePath}
              alt=""
            />
          ) : (
            <div className=" mb-6 sm:mb-0 bg-gray-300 h-40 w-40" />
          )}

          <div className="flex-auto self-end">
            <InputFile
              label="Profile Picture"
              name={"profilePic"}
              value={imagePath}
              onChange={async (e) => {
                console.log(e.target.files[0].size / (1024 * 1024) + "MB");
                const path = await filetobase64(e.target.files[0]);
                setImagePath(path);
              }}
            />
          </div>
        </div>
        <FormGroup horizontal>
          <Input
            required
            label="Student Name"
            type="text"
            name={"fullName"}
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="City"
            type="text"
            name={"city"}
            value={formik.values.city}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <TextArea
            required
            rows={6}
            label="Address"
            type="text"
            name={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
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
