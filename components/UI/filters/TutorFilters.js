import React, { useEffect, useState } from "react";
import CheckBox from "../CheckBox";
import Container from "../Container";
import Input from "../Input";
import InputFile from "../InputFile";
import { useFormik } from "formik";
import Button from "../Button";
import { useStateContext } from "../../../contexts/StateContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function TutorFilters({ setFilteredTutors, setOpenFilter }) {
  const router = useRouter();
  const [classes, setClasses] = useState("");
  const [qualification, setQualification] = useState("");
  const [subjects, setSubjects] = useState("");
  // const [queryParams, setQueryParams] = useState(null);
  // const [clear, setClear] = useState(false);
  // const [gender, setGender] = useState([]);

  console.log(subjects);
  // console.log(classes);
  // console.log(qualification);

  const allClasses = [
    { value: "Pre-School", id: "1" },
    { value: "Junior", id: "2" },
    { value: "Middle", id: "3" },
    { value: "Secondary", id: "4" },
    { value: "Intermediate", id: "5" },
    { value: "Bachelors", id: "6" },
    { value: "Masters", id: "7" },
    { value: "PhD", id: "8" },
  ];

  const allQualifications = [
    { label: "Matric", value: "Matric" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Bachelors", value: "Bachelors" },
    { label: "Masters", value: "Masters" },
    { label: "PhD", value: "PhD" },
  ];

  const allSubjects = [
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "Physics", value: "Physics" },
    { label: "Maths", value: "Maths" },
    { label: "Computer", value: "Computer" },
    { label: "English", value: "English" },
    { label: "Urdu", value: "Urdu" },
    { label: "Islamiat", value: "Islamiat" },
    { label: "Pak Studies", value: "Pak Studies" },
  ];

  const classesHandler = (e) => {
    if (e.target.checked) {
      setClasses([
        ...classes,
        { name: e.target.name, value: e.target.checked },
      ]);
    } else {
      setClasses(classes.filter((item) => item.name !== e.target.name));
    }
  };

  const qualificationHandler = (e) => {
    if (e.target.checked) {
      setQualification([
        ...qualification,
        { name: e.target.name, value: e.target.checked },
      ]);
    } else {
      setQualification(
        qualification.filter((item) => item.name !== e.target.name)
      );
    }
  };

  const subjectHandler = (e) => {
    if (e.target.checked) {
      setSubjects([
        ...subjects,
        { name: e.target.name, value: e.target.checked },
      ]);
    } else {
      setSubjects(subjects.filter((item) => item.name !== e.target.name));
    }
  };

  const createQueryString = () => {
    let query = {};
    if (qualification.length > 0) {
      query["qualification"] = qualification.map((qual) => {
        return qual.name;
      });
    }

    if (subjects.length > 0) {
      query["subject"] = subjects.map((sub) => {
        return sub.name;
      });
    }

    if (classes.length > 0) {
      query["class"] = classes.map((clas) => {
        return clas.name;
      });
    }
    console.log(query);
    return query;
  };

  const getTutors = async (query) => {
    const tutors = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/get-tutors`,
      { params: query }
    );
    console.log(tutors.data);
    setFilteredTutors(tutors.data);
    router.push(
      {
        pathname: "/tutors",
        query: query,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const queryParams = createQueryString();
    queryParams && getTutors(queryParams);
    setOpenFilter && setOpenFilter(false);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col  w-full lg:h-[calc(100vh-110px)] max-w-2xl lg:w-screen lg:max-w-xs mx-auto overflow-auto 
      bg-white divide-y divide-gray-100 rounded-md shadow-md lg:shadow-2xl"
      role="dialog"
      aria-label="Filters"
    >
      <header className="p-4 text-center">
        <h2 className="text-xl text-gray-700 font-semibold">Job Filters</h2>
      </header>

      <main className="flow-root p-6 overflow-y-auto">
        <div className="-my-8 divide-y divide-gray-100">
          <div className="py-8">
            <fieldset>
              <legend className="text-xl text-primary font-medium">
                Qualification
              </legend>

              <ul className="px-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4 h-60 overflow-auto">
                {allQualifications.map((item) => {
                  return (
                    <li key={item.value}>
                      <CheckBox
                        label={item.label}
                        name={item.value}
                        onChange={qualificationHandler}
                      />
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>

          <div className="py-8">
            <fieldset>
              <legend className="text-xl text-primary font-medium">
                Class
              </legend>

              <ul className="px-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4 h-60 overflow-auto ">
                {allClasses.map((item) => {
                  return (
                    <li key={item.id}>
                      <CheckBox
                        label={item.value}
                        name={item.value}
                        onChange={classesHandler}
                      />
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>

          <div className="py-8">
            <fieldset>
              <legend className="text-xl text-primary font-medium">
                Subjects
              </legend>

              <ul className="px-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4 h-60 overflow-auto">
                {allSubjects.map((item) => {
                  return (
                    <li key={item.value}>
                      <CheckBox
                        label={item.label}
                        name={item.value}
                        onChange={subjectHandler}
                      />
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-between p-6">
        {/* <button
          className="text-sm font-medium text-gray-600 underline"
          type="button"
          onClick={() => {
            setClear(true);
          }}
        >
          Clear all
        </button> */}
        <div className="w-full">
          <Button type={"submit"}>
            <p>Show results</p>
          </Button>
        </div>
      </footer>
    </form>
  );
}
