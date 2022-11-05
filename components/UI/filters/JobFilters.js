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
import FormGroup from "../FormGroup";
import Select from "../Select";

export default function JobFilters({
  setFilteredJobs,
  setOpenFilter,
  allAreas,
  allCities,
}) {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [areas, setAreas] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  // const [gender, setGender] = useState([]);

  // console.log(subjects);
  // console.log(classes);
  // console.log(qualification);

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

  const allQualifications = [
    { label: "Matric", value: "Matric" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Bachelors", value: "Bachelors" },
    { label: "Masters", value: "Masters" },
    { label: "MPhil", value: "MPhil" },
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
  const areasHandler = (e) => {
    if (e.target.checked) {
      setAreas([...areas, { name: e.target.name, value: e.target.checked }]);
    } else {
      setAreas(areas.filter((item) => item.name !== e.target.name));
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

    if (selectedCity) {
      query["city"] = selectedCity;
    }

    if (areas.length > 0) {
      query["area"] = areas.map((area) => {
        return area.name;
      });
    }

    console.log(query);
    return query;
  };
  const getJobs = async (query) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/get-paginatedjobs`,
      {
        params: query,
      }
    );
    console.log(res.data);
    setFilteredJobs(res.data.jobs);
    router.push(
      {
        pathname: "/jobs",
        query: query,
      },
      undefined
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const queryParams = createQueryString();
    queryParams && getJobs({ ...queryParams, page: 1 });
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

          <div className="py-8">
            <fieldset>
              <legend className="text-xl text-primary font-medium">
                Location
              </legend>

              <FormGroup>
                <Select
                  label="City"
                  name="city"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {allCities.map((city) => {
                    return (
                      <option key={city._id} value={city.name}>
                        {city.name}
                      </option>
                    );
                  })}
                </Select>
              </FormGroup>

              <ul
                className={`px-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4 overflow-auto ${
                  selectedCity && "h-60 "
                }`}
              >
                {allAreas.map((area) => {
                  const { city_id } = area;
                  if (city_id?.name !== selectedCity) {
                    return;
                  } else {
                    return (
                      <li key={area._id}>
                        <CheckBox
                          label={area.name}
                          name={area.name}
                          onChange={areasHandler}
                        />
                      </li>
                    );
                  }
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
        >
          Clear all
        </button> */}
        {/*  <div className="w-full">
        <Button
            type={"submit"}
            onClick={() => {
              setIsLoading(true);
              setAreas([]);
              setClasses([]);
              setQualification([]);
              setSubjects([]);
              setSelectedCity("");
              setSearch("");
            }}
          >
            <p>Reset</p>
          </Button>
          <Button type={"submit"}>
            <p>Show results</p>
          </Button>
        </div> */}

        <div className="flex justify-between gap-3">
          <Button
            type={"submit"}
            onClick={() => {
              // setIsLoading(true);
              setAreas([]);
              setClasses([]);
              setQualification([]);
              setSubjects([]);
              setSelectedCity("");
              // setSearch("");
            }}
          >
            <p>Reset</p>
          </Button>
          <Button
            type={"submit"}
            // onClick={() => setIsLoading(true)}
          >
            <p>Show results</p>
          </Button>
        </div>
      </footer>
    </form>
  );
}
