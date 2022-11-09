import React, { useEffect, useMemo, useState } from "react";
import Button from "../UI/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import Input from "../UI/Input";
import FormGroup from "../UI/FormGroup";
import Select from "../UI/Select";

import CheckBox from "../UI/CheckBox";
import axios from "axios";
import { getCookie } from "cookies-next";
import BackdropModal from "../UI/BackdropModal";

export default function EditSubjects2({
  classes,
  subjects,
  setSubjectFilled,
  tutor,
  updateData,
}) {
  console.log(subjects);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const updateTutor = async (data) => {
    const updated = await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    if (updated.status === 200) {
      updateData();
      if (data.subjectsTaught.length > 0) {
        setSubjectFilled(true);
      } else {
        setSubjectFilled(false);
      }
      false;
    }
  };

  const formik = useFormik({
    initialValues: {
      data: [],
      class: "",
      rate: "",
      name: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      if (values.data.length > 0) {
        try {
          await updateTutor({
            subjectsTaught: [
              ...tutor.subjectsTaught,
              { name: values.name, classes: values.data },
            ],
          });
          setEditMode(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        setError("Classes cannot be empty");
      }

      /* localStorage.setItem("Personal", JSON.stringify(values));
        setCurrentStep((prev) => ++prev); */
    },
  });

  const addClass = () => {
    formik.setFieldValue("data", [
      ...formik.values.data,
      { title: formik.values.class, rate: formik.values.rate },
    ]);
  };
  const deleteClass = (item) => {
    const updated = formik.values.data.filter(
      (val) => val.title !== item.title
    );
    formik.setFieldValue("data", updated);
  };

  return (
    <div className="space-y-8 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold text-primary">
        Subjects Taught
        <span className="text-primary text-lg font-normal">{` (Required)`}</span>
      </h2>

      <div className="sm:p-6 sm:border border-gray-200 rounded-lg">
        <div className="sm:flex justify-between">
          <h3 className="text-lg font-medium text-gray-700">Subjects Cards</h3>
          {!editMode ? (
            <div>
              <div className="my-6 sm:my-0 sm:w-fit">
                <Button fullwidth onClick={() => setEditMode(true)}>
                  Add Subject
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="my-6 sm:my-0 sm:w-fit">
                <Button
                  fullwidth
                  onClick={() => {
                    setError("");
                    setShowModal(true);
                  }}
                >
                  Add Class
                </Button>
              </div>
            </div>
          )}
        </div>
        {editMode ? (
          <>
            <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
              <Select required label="Subject" name={"name"} formik={formik}>
                <option value="">Select</option>
                {subjects?.map((subject) => {
                  return (
                    <option key={subject._id} value={subject.name}>
                      {subject.name}
                    </option>
                  );
                })}
              </Select>
              <div className="mt-6 sm:p-6 sm:border border-gray-300 rounded-lg">
                <h3 className="mb-4 text-gray-600 font-medium">Classes</h3>
                {formik.values.data.length > 0 ? (
                  <div className="grid grid-cols-3 gap-6">
                    {formik.values.data.map((item, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 grid grid-cols-9 gap-4 border border-gray-200 rounded-lg"
                      >
                        <h4 className="col-span-4 text-gray-500 font-medium">
                          {item.title}
                        </h4>
                        <p className="col-span-4 text-gray-600">{`@Rs. ${item.rate}`}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="col-span-1 ml-auto h-5 w-5 text-red-500 opacity-60 hover:opacity-100 cursor-pointer "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          onClick={() => deleteClass(item)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-center text-gray-500">
                      {"No Classes Added"}
                    </p>
                  </div>
                )}
              </div>
              {error && (
                <div onClick={() => setError("")} className="mt-6 px-5 xl:px-0">
                  <p className="max-w-screen-xl mx-auto cursor-pointer mt-2 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg">
                    {error}
                  </p>
                </div>
              )}

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
            </form>

            <BackdropModal
              title="Add Subject"
              show={showModal}
              setShow={setShowModal}
              onSave={addClass}
            >
              <div className="mb-6">
                <FormGroup horizontal>
                  <Select required label="Class" name={"class"} formik={formik}>
                    <option value="">Select</option>
                    {classes?.map((item) => {
                      return (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                  <Input
                    required
                    label={"@ Rs."}
                    type="number"
                    name={"rate"}
                    formik={formik}
                  />
                </FormGroup>
              </div>
            </BackdropModal>
          </>
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
