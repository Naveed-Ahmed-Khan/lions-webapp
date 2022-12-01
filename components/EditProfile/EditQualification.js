import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Collapse from "../UI/Collapse";
import Container from "../UI/Container";
import ProfileSidebar from "../UI/ProfileSidebar";
import Button from "../UI/Button";
import Tabs from "../UI/Tabs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import Input from "../UI/Input";
import FormGroup from "../UI/FormGroup";
import Select from "../UI/Select";
import TextArea from "../UI/TextArea";
import CheckBox from "../UI/CheckBox";
import { getCookie } from "cookies-next";

export default function EditQualification({
  setQualFilled,
  tutor,
  updateData,
}) {
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(null);

  const updateTutor = async (data) => {
    const updated = await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data,
      {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      }
    );
    if (updated.status === 200) {
      updateData();
      if (data.qualifications.length > 0) {
        setQualFilled(true);
      } else {
        setQualFilled(false);
      }
      setEditMode(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      degree: selected?.degree || "",
      institute: selected?.institute || "",
      passingYear: selected?.passingYear || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      let payload = {}
      if (selected) {
        tutor?.qualifications.forEach(item => {
          if (item._id === selected._id) {
            item.degree = values.degree
            item.institute = values.institute
            item.passingYear = values.passingYear
          }
        })
        payload = { qualifications: tutor?.qualifications }
      } else {
        payload = { qualifications: [...tutor?.qualifications, values] }
      }
      try {
        await updateTutor(payload);
        setSelected(null)
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className=" pb-12 w-full ">
      <h2 className="mb-8 text-xl sm:text-2xl font-semibold text-primary">
        Education Details
        <span className="text-primary text-lg font-normal">{` (Required)`}</span>
      </h2>
      <div className="py-10 sm:px-6 sm:border border-gray-200 rounded-lg">
        <div className="sm:flex justify-between">
          <h3 className="text-lg font-medium text-gray-700">
            {`${editMode ? selected ? "Edit Qualification" : "Add Qualification" : "Tutor Qualification"}`}
          </h3>
          {!editMode && (
            <div className="my-6 sm:my-0 sm:w-fit">
              <Button fullwidth onClick={() => setEditMode(true)}>
                Add Qualification
              </Button>
            </div>
          )}
        </div>

        {editMode ? (
          <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
            <FormGroup>
              <Select required label="Degree" name={"degree"} formik={formik}>
                <option value="">Select</option>
                <option value="Matric">Matric</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Input
                required
                label="Institute"
                name={"institute"}
                formik={formik}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                label="Passing Year"
                type="number"
                name={"passingYear"}
                formik={formik}
              />
            </FormGroup>
            <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
              <Button
                fullwidth
                onClick={() => {
                  setEditMode(false);
                  selected && setSelected(null)
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
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {tutor.qualifications.length > 0 ? (
              tutor.qualifications.map((qualification) => {
                return (
                  <div
                    key={qualification._id}
                    className="p-6 w-full sm:w-[320px] border border-gray-200 rounded-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg text-gray-600 font-medium">
                        {qualification.degree}
                      </h3>
                      <div className="space-x-4">
                        <button
                          onClick={() => {
                            setEditMode(true)
                            setSelected(qualification)
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
                            const filtered = tutor.qualifications.filter(
                              (item) => item._id !== qualification._id
                            );
                            // console.log(filtered);
                            try {
                              await updateTutor({
                                qualifications: filtered,
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
                    <div className="flex justify-between">
                      <p className="text-gray-600">{qualification.institute}</p>
                      <p className="text-gray-600">
                        {qualification.passingYear}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>No Qualifications</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
