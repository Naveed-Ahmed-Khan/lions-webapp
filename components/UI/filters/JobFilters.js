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
  allClasses,
  allSubjects,
  setIsLoading,
}) {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [areas, setAreas] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [search, setSearch] = useState("");

  const allQualifications = [
    { label: "Matric", value: "Matric" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Bachelors", value: "Bachelors" },
    { label: "Masters", value: "Masters" },
    { label: "MPhil", value: "MPhil" },
    { label: "PhD", value: "PhD" },
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

    if (search) {
      query["name"] = search;
    }

    if (areas.length > 0) {
      query["area"] = areas.map((area) => {
        return area.name;
      });
    }

    return query;
  };

  const getJobs = async (query) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/get-paginatedjobs`,
      { params: query }
    );
    setFilteredJobs(res.data.jobs);
    router.push(
      {
        pathname: "/jobs",
        query: query,
      },
      undefined,
      {
        shallow: false,
      }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const queryParams = createQueryString();
    queryParams && getJobs({ ...queryParams, page: 1 });
    setOpenFilter && setOpenFilter(false);
    setIsLoading(false)
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
        <div className="divide-y divide-gray-100">
          <div className="">
            <fieldset>
              <legend className="mb-3 text-xl text-primary font-medium">
                Search
              </legend>

              <div className="relative h-fit">
                <Input
                  label=""
                  name="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="group absolute py-[.95rem]  px-1 sm:px-2 right-0 top-7 sm:top-0 bg-white"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </fieldset>
          </div>
          <div className="py-8">
            <fieldset>
              <legend className="text-xl text-primary font-medium">
                Qualification
              </legend>

              <ul className="px-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4 h-60 overflow-auto">
                {allQualifications.map((item) => {
                  const checked = qualification?.includes(item.value);
                  return (
                    <li key={item.value}>
                      <CheckBox
                        defaultChecked={checked}
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
                  const checked = classes.includes(item.name);
                  return (
                    <li key={item._id}>
                      <CheckBox
                        defaultChecked={checked}
                        label={item.name}
                        name={item.name}
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
                  const checked = subjects.includes(item.name);
                  return (
                    <li key={item._id}>
                      <CheckBox
                        defaultChecked={checked}
                        label={item.name}
                        name={item.name}
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
                className={`px-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4 overflow-auto ${selectedCity && "h-60 "
                  }`}
              >
                {allAreas.map((area) => {
                  const { city_id } = area;
                  const checked = areas?.includes(area.name);
                  if (city_id?.name !== selectedCity) {
                    return;
                  } else {
                    return (
                      <li key={area._id}>
                        <CheckBox
                          defaultChecked={checked}
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
        <div className="flex justify-between gap-3">
          <Button
            type={"button"}
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