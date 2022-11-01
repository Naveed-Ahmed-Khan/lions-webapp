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

export default function EditLocations({
  setLocationFilled,
  areas,
  cities,
  tutor,
  updateData,
}) {
  const [editMode, setEditMode] = useState(false);

  const updateTutor = async (data) => {
    const updated = await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    if (updated.status === 200) {
      updateData();
      if (data.locations.length > 0) {
        setLocationFilled(true);
      } else {
        setLocationFilled(false);
      }
      setEditMode(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      city: "",
      places: [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateTutor({
          locations: [...tutor.locations, { ...values }],
        });
        formik.setFieldValue("places", []);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const locationHandler = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("places", [...formik.values.places, e.target.name]);
    } else {
      formik.setFieldValue(
        "places",
        formik.values.places.filter((item) => item.name !== e.target.name)
      );
    }
  };

  return (
    <div className=" pb-12 w-full">
      <h2 className="mb-8 text-xl sm:text-2xl font-semibold text-primary">
        Locations
        <span className="text-primary text-lg font-normal">{` (Required)`}</span>
      </h2>
      <div className="sm:p-6 sm:border border-gray-200 rounded-lg">
        <div className="sm:flex justify-between">
          <h3 className="text-lg font-medium text-gray-700">
            Places I can travel
          </h3>
          {!editMode && (
            <div className="my-6 sm:my-0 sm:w-fit">
              <Button fullwidth onClick={() => setEditMode(true)}>
                Add Locations
              </Button>
            </div>
          )}
        </div>

        {editMode ? (
          <form onSubmit={formik.handleSubmit} className="mt-2 w-full">
            <FormGroup>
              <Select required label="City" name={"city"} formik={formik}>
                <option value="">Select</option>
                {cities?.map((city) => {
                  return (
                    <option key={city._id} value={city.name}>
                      {city.name}
                    </option>
                  );
                })}
              </Select>
            </FormGroup>

            <ul className="px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-4 max-h-[calc(100vh-500px)] overflow-auto">
              {areas?.map((area) => {
                const { city_id } = area;
                if (city_id?.name !== formik.values.city) {
                  return;
                } else {
                  return (
                    <li key={area._id}>
                      <CheckBox
                        label={area.name}
                        name={area.name}
                        onChange={locationHandler}
                      />
                    </li>
                  );
                }
              })}
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
          </form>
        ) : (
          <div className="sm:p-6 grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
            {tutor.locations.length > 0 ? (
              tutor.locations.map((location) => {
                const { city, places } = location;
                return (
                  <div
                    key={location._id}
                    className="w-full sm:w-[320px] p-6 border border-gray-200 rounded-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg text-primary font-medium">
                        {city}
                      </h3>
                      <button
                        onClick={async () => {
                          const filtered = tutor.locations.filter(
                            (item) => item._id !== location._id
                          );
                          // console.log(filtered);
                          try {
                            await updateTutor({
                              locations: filtered,
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
                      {places.map((place, index) => {
                        return (
                          <p key={index} className="text-gray-700">
                            {place}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <>No Locations</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
