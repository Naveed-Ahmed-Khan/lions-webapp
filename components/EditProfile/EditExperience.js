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
import { getCookie } from "cookies-next";

export default function EditExperience({ tutor, updateData }) {
  const [editMode, setEditMode] = useState(false);

  const updateTutor = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    updateData();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: {
      institute: "",
      years: "",
      months: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateTutor({
          experience: [...tutor.experience, { ...values }],
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className=" pb-12 w-full">
      <h2 className="mb-8 text-xl sm:text-2xl font-semibold text-primary">
        Experience Details
        <span className="text-primary text-lg font-normal">{` (Optional)`}</span>
      </h2>
      <div className="py-10 sm:px-6 sm:border border-gray-200 rounded-lg">
        <div className="sm:flex justify-between">
          <h3 className="text-lg font-medium text-gray-700">
            Tutoring Experience
          </h3>
          {!editMode && (
            <div className="my-6 sm:my-0 sm:w-fit">
              <Button fullwidth onClick={() => setEditMode(true)}>
                Add Experience
              </Button>
            </div>
          )}
        </div>

        {editMode ? (
          <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
            <FormGroup>
              <Input
                required
                label="Institute"
                name={"institute"}
                formik={formik}
              />
            </FormGroup>
            <FormGroup horizontal>
              <Input
                required
                label="Years"
                type="number"
                name={"years"}
                formik={formik}
              />
              <Input
                required
                label="Months"
                type="number"
                name={"months"}
                formik={formik}
              />
            </FormGroup>
            <div className="sm:pt-10 space-y-4 sm:space-y-0 sm:flex gap-8">
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
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {tutor.experience.length > 0 ? (
              tutor.experience.map((experience) => {
                const { institute, years, months } = experience;
                return (
                  <div
                    key={experience._id}
                    className="p-6 w-full sm:w-[320px] border border-gray-200 rounded-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg text-gray-600 font-medium">
                        {institute}
                      </h3>
                      <button
                        onClick={async () => {
                          const filtered = tutor.experience.filter(
                            (item) => item._id !== experience._id
                          );
                          // console.log(filtered);
                          try {
                            await updateTutor({
                              experience: filtered,
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
                    <div className="flex justify-between">
                      <p className="text-gray-600">
                        {years} years | {months} months
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>No Experience</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
