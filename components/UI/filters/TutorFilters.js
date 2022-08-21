import React, { useEffect, useState } from "react";
import CheckBox from "../CheckBox";
import Container from "../Container";
import Input from "../Input";
import InputFile from "../InputFile";
import { useFormik } from "formik";
import Button from "../Button";
import { useStateContext } from "../../../contexts/StateContext";

export default function TutorFilters({
  tutors,
  setFilteredTutors,
  setOpenFilter,
}) {
  const [classes, setClasses] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [subjects, setSubjects] = useState([]);
  // const [clear, setClear] = useState(false);
  // const [gender, setGender] = useState([]);

  // console.log(subjects);
  // console.log(classes);
  // console.log(qualification);

  useEffect(() => {
    tutors && setFilteredTutors(tutors);
  }, []);

  /*   useEffect(() => {
    clear && setFilteredTutors(tutors);
  }, []); */

  const allClasses = [
    { label: "Class 1", value: "1" },
    { label: "Class 2", value: "2" },
    { label: "Class 3", value: "3" },
    { label: "Class 4", value: "4" },
    { label: "Class 5", value: "5" },
    { label: "Class 6", value: "6" },
    { label: "Class 7", value: "7" },
    { label: "Class 8", value: "8" },
    { label: "Class 9", value: "9" },
    { label: "Class 10", value: "10" },
    { label: "Class 11", value: "11" },
    { label: "Class 12", value: "12" },
  ];

  const allQualifications = [
    { label: "Matric", value: "matric" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Bachelors", value: "bachelors" },
    { label: "Masters", value: "masters" },
    { label: "PhD", value: "phd" },
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

  const submitHandler = (e) => {
    e.preventDefault();
    let filteredTutors = tutors;
    const applyFilters = () => {
      classes &&
        classes.forEach((item) => {
          filteredTutors = filteredTutors.filter((job) =>
            job.classes[0].includes(item.name)
          );
        });

      qualification &&
        qualification.forEach((item) => {
          filteredTutors = filteredTutors.filter((job) =>
            job.qualification.toLowerCase().includes(item.name.toLowerCase())
          );
        });

      subjects &&
        subjects.forEach((item) => {
          filteredTutors = filteredTutors.filter((job) =>
            job.subjects[0].toLowerCase().includes(item.name.toLowerCase())
          );
        });

      setFilteredTutors(filteredTutors);
      console.log(filteredTutors);
    };
    applyFilters();
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
                    <li key={item.value}>
                      <CheckBox
                        label={item.label}
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