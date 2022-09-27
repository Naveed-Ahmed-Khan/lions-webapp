import React, { useEffect, useState } from "react";

import ChevronDots from "../components/UI/ChevronDots";
import FormGroup from "../components/UI/FormGroup";
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
import CheckBox from "../components/UI/CheckBox";

export async function getStaticProps() {
  const cities = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-cities`);
  const areas = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-areas`);
  const subjects = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-subjects`
  );
  const classes = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-classes`);

  return {
    props: {
      cities: cities.data,
      areas: areas.data,
      subjects: subjects.data,
      classes: classes.data,
    },
    revalidate: 30,
  };
}

export default function JobPosting({ cities, areas, subjects, classes }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(null);
  const { currentUser } = useAuth();
  console.log(currentStep);

  useEffect(() => {
    const step = localStorage.getItem("step");
    step ? setCurrentStep(Number(step)) : setCurrentStep(1);
    return () => {
      localStorage.removeItem("Student");
      localStorage.removeItem("Tutor");
      localStorage.removeItem("Description");
      localStorage.removeItem("step");
    };
  }, [router.pathname !== "/job-posting"]);

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
            {currentStep === 1 && (
              <Student allSubjects={subjects} setCurrentStep={setCurrentStep} />
            )}
            {currentStep === 2 && (
              <Tutor cities={cities} setCurrentStep={setCurrentStep} />
            )}
            {currentStep === 3 && (
              <Description setCurrentStep={setCurrentStep} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
function Student({ allSubjects, setCurrentStep }) {
  const formik = useFormik({
    initialValues: {
      subjects: "",
      class: "",
      institute: "",
      duration: "",
    },
    onSubmit: (values) => {
      localStorage.setItem("Student", JSON.stringify(values));
      localStorage.setItem("step", 2);
      setCurrentStep((prev) => ++prev);
    },
  });

  const allClasses = [
    { label: "Class 1", value: "Class 1" },
    { label: "Class 2", value: "Class 2" },
    { label: "Class 3", value: "Class 3" },
    { label: "Class 4", value: "Class 4" },
    { label: "Class 5", value: "Class 5" },
    { label: "Class 6", value: "Class 6" },
    { label: "Class 7", value: "Class 7" },
    { label: "Class 8", value: "Class 8" },
    { label: "Class 9", value: "Class 9" },
    { label: "Class 10", value: "Class 10" },
    { label: "Class 11", value: "Class 11" },
    { label: "Class 12", value: "Class 12" },
  ];

  const subjectsHandler = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("subjects", [
        ...formik.values.subjects,
        e.target.name,
      ]);
    } else {
      formik.setFieldValue(
        "subjects",
        formik.values.subjects.filter((item) => item.name !== e.target.name)
      );
    }
  };

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="mb-5 text-xl sm:text-2xl font-semibold text-primary">
        Student Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <p className="text-gray-600 font-medium ">Subjects</p>
        <div className="px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-6 max-h-[calc(100vh-500px)] overflow-auto">
          {allSubjects.map((subject) => {
            return (
              <div key={subject._id}>
                <CheckBox
                  label={subject.name}
                  name={subject.name}
                  onChange={subjectsHandler}
                />
              </div>
            );
          })}
        </div>

        <FormGroup horizontal>
          <Select required label="Class" name="class" formik={formik}>
            <option value="">Select</option>
            {allClasses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
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
function Tutor({ cities, setCurrentStep }) {
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
      localStorage.setItem("step", 2);
      setCurrentStep((prev) => ++prev);
    },
  });
  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="mb-5 text-xl sm:text-2xl font-semibold text-primary">
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
          <Select required label="Experience" name="experience" formik={formik}>
            <option value="">Select</option>
            <option value="no">No experience</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="5+">5+ Years</option>
          </Select>
        </FormGroup>

        <FormGroup horizontal>
          <Select
            required
            label="Mode of Teaching"
            name="teachingMode"
            formik={formik}
          >
            <option value="">Select</option>
            <option value="Any">Any</option>
            <option value="Tutor travels">Tutor travels</option>
            <option value="Student travels">Student travels</option>
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

        {formik.values.teachingMode !== "Online" && (
          <FormGroup>
            <Select required label="City" name="city" formik={formik}>
              <option value="">Select</option>
              {cities.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        )}

        <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
          {/* <Button
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
            type="button"
          >
            Back
          </Button> */}
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
      title: "",
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
          userModel: "Student",
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

      router.push("/dashboard/admin/jobs");
    },
  });

  return (
    <div className=" pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="mb-5 text-xl sm:text-2xl font-semibold text-primary">
        Job Description
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
        <FormGroup>
          <Input
            required
            label="Job Title"
            type="text"
            name="title"
            formik={formik}
          />
        </FormGroup>
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
          {/* <Button
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
            type="button"
          >
            Back
          </Button> */}
          <Button type="submit">Post Job</Button>
        </div>
      </form>
    </div>
  );
}
