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
  const [selected, setSelected] = useState(null);
  const [selectedModal, setSelectedModal] = useState(null);

  console.log(selected)

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

  console.log(selectedModal)

  const formik = useFormik({
    initialValues: {
      data: selected?.classes || [],
      name: selected?.name || "",
      title: selectedModal?.title || "",
      rate: selectedModal?.rate || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      if (values.data.length > 0) {
        let payload = {}
        if (selected) {
          tutor?.subjectsTaught.forEach(item => {
            if (item._id === selected._id) {
              item.name = values.name
              item.classes = values.data
            }
          })
          payload = { subjectsTaught: tutor?.subjectsTaught }
        } else {
          payload = { subjectsTaught: [...tutor?.subjectsTaught, { name: values.name, classes: values.data }] }
        }
        try {
          await updateTutor(payload);
          setEditMode(false);
          setSelected(null);
          setSelectedModal(null)
        } catch (error) {
          console.log(error);
        }
      } else {
        setError("Classes cannot be empty");
      }
    },
  });

  const addClass = () => {
    if (selectedModal) {
      formik.values.data.forEach(item => {
        if (item._id === selectedModal._id) {
          item.title = formik.values.title
          item.rate = formik.values.rate
        }
      })
      console.log(formik.values.data)
      formik.setFieldValue("data",
        formik.values.data,
      );
      setSelectedModal(null)
    } else {
      formik.setFieldValue("data", [
        ...formik.values.data,
        { title: formik.values.title, rate: formik.values.rate },
      ]);
    }
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
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            {`${editMode ? selected ? "Edit Subject" : "Add Subject" : "Subject Card"}`}
          </h3>
          {!editMode &&
            <div>
              <div className="my-6 sm:my-0 sm:w-fit">
                <Button fullwidth onClick={() => setEditMode(true)}>
                  Add Subject
                </Button>
              </div>
            </div>
          }
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
                <div className="sm:flex justify-between">
                  <h3 className="mb-4 text-gray-600 font-medium">Classes</h3>
                  {editMode &&
                    <div className="my-6 sm:my-0 sm:w-fit">
                      <Button
                        fullwidth
                        type={"button"}
                        onClick={() => {
                          setError("");
                          setShowModal(true);
                        }}
                      >
                        Add Class
                      </Button>
                    </div>
                  }
                </div>
                {formik.values.data.length > 0 ? (
                  <div className="pt-4 grid grid-cols-3 gap-6">
                    {formik.values.data.map((item, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 grid grid-cols-3 gap-4 border border-gray-200 rounded-lg"
                      >
                        <div className="col-span-2">
                          <h4 className="mb-2 text-gray-500 font-medium">
                            {item.title}
                          </h4>
                          <p className=" text-gray-600">{`@Rs. ${item.rate}`}</p>
                        </div>
                        <div className="col-span-1 flex justify-end items-start gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowModal(true)
                              setSelectedModal(item)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none" viewBox="0 0 24 24"
                              strokeWidth={2} stroke="currentColor"
                              className="h-5 w-5 text-gray-500 opacity-60 hover:opacity-100">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button type="button" onClick={() => deleteClass(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="col-span-1 ml-auto h-5 w-5 text-red-500 opacity-60 hover:opacity-100"
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="py-4 text-center text-gray-500">
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
                    setSelected(null)
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
              title={selectedModal ? "Edit Class" : "Add Class"}
              show={showModal}
              setShow={setShowModal}
              onSave={addClass}
              onCancel={() => selectedModal && setSelectedModal(null)}
            >
              <div className="mb-6">
                <FormGroup horizontal>
                  <Select required label="Class" name={"title"} formik={formik}>
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
                      <div className="space-x-4">
                        <button
                          onClick={() => {
                            setEditMode(true)
                            setSelected(subject)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={2} stroke="currentColor"
                            className="h-5 w-5 text-gray-500 opacity-60 hover:opacity-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
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
    </div>
  );
}
