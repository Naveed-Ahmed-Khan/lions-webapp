import React, { useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { useRouter } from "next/router";
import Input from "../components/UI/Input";
import { useFormik } from "formik";
import InputFile from "../components/UI/InputFile";
import TextArea from "../components/UI/TextArea";
import Select from "../components/UI/Select";
import DatePicker from "../components/UI/DatePicker";
import fileToBase64 from "../utility/filetobase64";
import Image from "next/image";

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
          {currentStep === 4 && <Profile setCurrentStep={setCurrentStep} />}
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
  const formik = useFormik({
    initialValues: {
      fullName: "",
      cnic: "",
      mobile: "",
      watsapp: "",
      gender: "",
      dateOfBirth: new Date(),
      address: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
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
          <DatePicker
            required
            label="Date of Birth"
            name={"dateOfBirth"}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
          />

          <Select
            required
            label="Gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
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
      Institute: "",
      passingYear: "",
      job: "",
      jobInstitute: "",
      experience: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
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
          <Select
            required
            label="Highest Qualification"
            type="text"
            name={"qualification"}
            value={formik.values.qualification}
            onChange={formik.handleChange}
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
            type="text"
            name={"institute"}
            value={formik.values.institute}
            onChange={formik.handleChange}
          />
          <Input
            required
            label="Passing Year"
            type="number"
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
            type="number"
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
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      profilePic: imagePath,
      aboutMe: "",
      subjects: [],
      classes: [],
      modesOfTeaching: "",
      achievement: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      router.push("/");
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-left text-primary">
        Profile Details
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
                const path = await fileToBase64(e.target.files[0]);
                setImagePath(path);
              }}
            />
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
            name="modesOfTeaching"
            value={formik.values.modesOfTeaching}
            onChange={formik.handleChange}
          >
            <option value={""}>Select</option>
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
