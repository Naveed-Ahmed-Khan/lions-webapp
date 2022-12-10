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
  const [selected, setSelected] = useState(null);
  const [onlineOnly, setOnlineOnly] = useState(false)

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
      city: selected?.city || "",
      places: selected?.places || [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (values.places.length === 0) return;

      let payload = {}
      if (selected) {
        tutor?.locations.forEach(item => {
          if (item._id === selected._id) {
            item.city = values.city
            item.places = values.places
          }
        })
        payload = { locations: tutor?.locations }
      } else {
        payload = { locations: [...tutor?.locations, values] }
      }
      try {
        await updateTutor(payload);
        formik.setFieldValue("places", []);
        setSelected(null)
      } catch (error) {
        console.log(error);
      }
    },
  });

  const locationHandler = (e) => {
    if (e.target.checked) {
      console.log("added")
      formik.setFieldValue("places", [...formik.values.places, e.target.name]);
    } else {
      console.log("removed")
      formik.setFieldValue(
        "places",
        formik.values.places.filter((item) => item !== e.target.name)
      );
    }
  };
  // console.log(formik.values.places)
  // console.log(tutor?.teachingModes)

  useEffect(() => {
    if (tutor?.teachingModes?.includes("Online") && !tutor?.teachingModes?.includes("Tutor travels")) {
      setOnlineOnly(true)
      setLocationFilled(true);
    } else {
      setOnlineOnly(false)
    }
  }, [tutor?.teachingModes])


  return (
    <div className=" pb-12 w-full">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary">
          Locations
          <span className="text-primary text-lg font-normal">{` (Required)`}</span>
        </h2>
        <div>
          <CheckBox
            disabled
            defaultChecked={onlineOnly}
            label={"Online Only"}
            name={"onlineOnly"}
            checked={onlineOnly}
            onChange={(e) => setOnlineOnly(e.target.checked)}
          />
          <p className="mt-1 tracking-tight text-gray-500 text-xs">(For online mode only)</p>
        </div>

      </div>
      <div className="sm:p-6 sm:border border-gray-200 rounded-lg">
        {!onlineOnly &&
          <div className="sm:flex justify-between">
            <h3 className="text-lg font-medium text-gray-700">
              {`${editMode ? selected ? "Edit Places" : "Add Places" : "Places I can travel"}`}
            </h3>
            {!editMode && (
              <div className="my-6 sm:my-0 sm:w-fit">
                <Button fullwidth onClick={() => setEditMode(true)}>
                  Add Locations
                </Button>
              </div>
            )}
          </div>
        }

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
                if (city_id?.name === formik.values.city) {
                  return (
                    <li key={area._id}>
                      <CheckBox
                        defaultChecked={formik.values.places.includes(area.name) ? true : false}
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
          <div className="sm:p-6 grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
            {onlineOnly ?
              <div
                key={location._id}
                className="col-span-2 w-full flex items-center justify-center p-4 rounded-lg"
              >
                <p className="text-gray-600">Online Mode Only</p>
              </div> :
              <>
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
                          <div className="space-x-4">
                            <button
                              onClick={() => {
                                setEditMode(true)
                                setSelected(location)
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
              </>
            }

          </div>
        )}
      </div>
    </div>
  );
}
