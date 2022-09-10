import React, { useEffect, useMemo, useState } from "react";
import Button from "../../components/UI/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import Input from "../../components/UI/Input";
import FormGroup from "../../components/UI/FormGroup";
import Select from "../../components/UI/Select";

import CheckBox from "../../components/UI/CheckBox";
import axios from "axios";

export default function EditSubjects({ tutor, updateData }) {
  const [editMode, setEditMode] = useState(false);

  const updateTutor = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data
    );
    updateData();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: {
      preSchool: "",
      checkPreSchool: false,
      junior: "",
      checkJunior: false,
      middle: "",
      checkMiddle: false,
      Matric: "",
      checkMatric: false,
      intermediate: "",
      checkIntermediate: false,
      bachelors: "",
      checkBachelors: false,
      masters: "",
      checkMasters: false,
      phd: "",
      checkPhd: false,
      name: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = [];
      // console.log(values);
      values.checkPreSchool &&
        data.push({
          title: "Pre School",
          rate: values.preSchool,
        });
      values.checkJunior &&
        data.push({
          title: "Junior",
          rate: values.junior,
        });
      values.checkMiddle &&
        data.push({
          title: "Middle",
          rate: values.middle,
        });
      values.checkMatric &&
        data.push({
          title: "Matric",
          rate: values.matric,
        });
      values.checkIntermediate &&
        data.push({
          title: "Intermediate",
          rate: values.intermediate,
        });
      values.checkBachelors &&
        data.push({
          title: "Bachelors",
          rate: values.bachelors,
        });
      values.checkMasters &&
        data.push({
          title: "Masters",
          rate: values.masters,
        });
      values.checkPhd &&
        data.push({
          title: "PhD",
          rate: values.phd,
        });
      console.log(data);
      try {
        await updateTutor({
          subjectsTaught: [
            ...tutor.subjectsTaught,
            { name: values.name, classes: data },
          ],
        });
      } catch (error) {
        console.log(error);
      }
      setEditMode(false);
      /* localStorage.setItem("Personal", JSON.stringify(values));
        setCurrentStep((prev) => ++prev); */
    },
  });

  return (
    <div className="space-y-8 w-full">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Subjects Taught
      </h1>

      <div className="sm:p-6 sm:border border-gray-200 rounded-lg">
        <div className="sm:flex justify-between">
          <h3 className="text-lg font-medium text-gray-700">Subjects Cards</h3>
          {!editMode && (
            <div className="my-6 sm:my-0 sm:w-fit">
              <Button fullwidth onClick={() => setEditMode(true)}>
                Add Subject
              </Button>
            </div>
          )}
        </div>
        {editMode ? (
          <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
            <Select required label="Subject" name={"name"} formik={formik}>
              <option value="">Select</option>
              <option value="Arts">Arts</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Civis">Civis</option>
              <option value="Computer">Computer</option>
              <option value="Economics">Economics</option>
              <option value="English">English</option>
              <option value="Geography">Geography</option>
              <option value="History">History</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Sociology">Sociology</option>
              <option value="Urdu">Urdu</option>
            </Select>

            <FormGroup>
              <ul className="space-y-2">
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Pre-School"}
                    name={"checkPreSchool"}
                    formik={formik}
                  />

                  {formik.values.checkPreSchool && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"preSchool"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Junior(1-5)"}
                    name={"checkJunior"}
                    formik={formik}
                  />
                  {formik.values.checkJunior && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"junior"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Middle(6-8)"}
                    name={"checkMiddle"}
                    formik={formik}
                  />
                  {formik.values.checkMiddle && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"middle"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Secondary(9-10)"}
                    name={"checkMatric"}
                    formik={formik}
                  />
                  {formik.values.checkMatric && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"matric"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Intermediate(11-12)"}
                    name={"checkIntermediate"}
                    formik={formik}
                  />
                  {formik.values.checkIntermediate && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"intermediate"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Bachelors"}
                    name={"checkBachelors"}
                    formik={formik}
                  />
                  {formik.values.checkBachelors && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"bachelors"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox
                    label={"Masters"}
                    name={"checkMasters"}
                    formik={formik}
                  />
                  {formik.values.checkMasters && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"masters"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
                <li className="h-14 grid grid-cols-2 gap-3 items-center">
                  <CheckBox label={"PhD"} name={"checkPhd"} formik={formik} />
                  {formik.values.checkPhd && (
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-3">@ Rs.</p>
                      <Input
                        required
                        type="number"
                        name={"phd"}
                        formik={formik}
                      />
                    </div>
                  )}
                </li>
              </ul>
              <div className="pt-10 space-y-4 sm:space-y-0 sm:flex gap-8">
                <Button
                  fullwidth
                  onClick={() => {
                    setEditMode(false);
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button fullwidth type="submit">
                  Save
                </Button>
              </div>
            </FormGroup>
          </form>
        ) : (
          <div className="sm:p-6 grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
            {tutor.subjectsTaught.length > 0 ? (
              tutor.subjectsTaught.map((subject) => {
                const { name, classes } = subject;
                return (
                  <div
                    key={subject._id}
                    className="w-full sm:w-[320px] p-6 border border-gray-200 rounded-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg text-primary font-medium">
                        {name}
                      </h3>
                      <button
                        onClick={async () => {
                          const filtered = tutor.subjectsTaught.filter(
                            (item) => item._id !== subject._id
                          );
                          // console.log(filtered);
                          try {
                            await updateTutor({
                              subjectsTaught: filtered,
                            });
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500 opacity-60 hover:opacity-100 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {classes.map((item) => {
                        return (
                          <div key={item._id}>
                            <p className="text-gray-600 font-medium">
                              {item.title}
                            </p>
                            <p className="text-gray-600">@ Rs.{item.rate}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <>No Subjects</>
            )}
          </div>
        )}
      </div>

      {/*  <div className="p-6 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700">
          Subjects & Classes
        </h3>

        <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
          <FormGroup>
            <Input
              required
              label="Subjects"
              name={"subjects"}
              formik={formik}
            />
          </FormGroup>
          <FormGroup>
            <Input required label="Classes" name={"classes"} formik={formik} />
          </FormGroup>
        </form>
      </div> */}
    </div>
  );
}
