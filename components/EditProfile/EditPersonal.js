import React, { useEffect, useMemo, useState } from "react";

import FormGroup from "../../components/UI/FormGroup";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import Input from "../../components/UI/Input";
import InputFile from "../../components/UI/InputFile";
import TextArea from "../../components/UI/TextArea";
import Select from "../../components/UI/Select";
import DatePicker from "../../components/UI/DatePicker";

import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import axios from "axios";
import { filetobase64 } from "../../utility/filetobase64";
import CheckBox from "../UI/CheckBox";
import { getCookie } from "cookies-next";

export default function EditPersonal({ tutor, updateData, cities, areas }) {
  const { signup } = useAuth();
  const [imagePath, setImagePath] = useState(null);
  const [bannerPath, setBannerPath] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  const updateTutor = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor?._id}`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    updateData();
  };

  const profilePath = useMemo(
    () => imagePath && URL.createObjectURL(imagePath),
    [imagePath]
  );

  const bannerImagePath = useMemo(
    () => bannerPath && URL.createObjectURL(bannerPath),
    [bannerPath]
  );

  const formik = useFormik({
    initialValues: {
      name: tutor?.name || "",
      cnic: tutor?.cnic || "",
      birth: tutor?.birth || "",
      gender: tutor?.gender || "",
      city: tutor?.city || "",
      area: tutor?.area || "",
      availableFrom: tutor?.availableFrom || "",
      availableTo: tutor?.availableTo || "",
      teachingModes: tutor?.teachingModes || [],
      profilePic: "",
      bannerImage: "",
      mobile: tutor?.mobile || "",
      watsapp: tutor?.watsapp || "",
      city: tutor?.city || "",
      address: tutor?.address || "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        if (imagePath) {
          values.profilePic = await filetobase64(imagePath);
        }
        if (bannerPath) {
          values.bannerImage = await filetobase64(bannerPath);
        }

        await updateTutor({
          availableFrom: values.availableFrom,
          availableTo: values.availableTo,
          teachingModes: values.teachingModes,
          mobile: values.mobile,
          watsapp: values.watsapp,
          city: values.city,
          address: values.address,
          profilePic: values.profilePic || tutor?.profilePic,
          bannerImage: values.bannerImage || tutor?.bannerImage,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("teachingModes", tutor?.teachingModes);
  }, []);

  const modes = ["Tutor travels", "Student travels", "Online"];

  const modesHandler = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("teachingModes", [
        ...formik.values.teachingModes,
        e.target.name,
      ]);
    } else {
      formik.setFieldValue(
        "teachingModes",
        formik.values.teachingModes.filter(
          (item) => item.name !== e.target.name
        )
      );
    }
  };

  return (
    <div className="pb-12 w-full">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Profile Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-8 w-full">
        <div className="space-y-8">
          <div className="sm:flex gap-6">
            {profilePath || tutor?.profilePic ? (
              <div className="relative h-44 w-44 rounded-lg overflow-clip">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={profilePath || tutor?.profilePic}
                  alt=""
                />
              </div>
            ) : (
              <div className=" mb-6 sm:mb-0 bg-gray-300 h-44 w-44 rounded-lg" />
            )}

            <div className="flex-auto self-end">
              <Input
                type="file"
                label="Profile Picture"
                name={"profilePic"}
                onChange={(e) => {
                  setImagePath(e.target.files[0]);
                }}
              />
            </div>
          </div>
          {/* <div className=" space-y-6 ">
            {bannerImagePath || tutor?.bannerImage ? (
              <div className="relative h-44 rounded-lg overflow-clip">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={bannerImagePath || tutor?.bannerImage}
                  alt=""
                />
              </div>
            ) : (
              <div className=" mb-6 sm:mb-0 bg-gray-300 h-40 w-full rounded-lg" />
            )}

            <div className="">
              <Input
                type="file"
                label="Banner Image"
                name={"bannerImage"}
                onChange={(e) => {
                  setBannerPath(e.target.files[0]);
                }}
              />
            </div>
          </div> */}
        </div>
        <FormGroup horizontal>
          <Input required label="Full Name" name={"name"} formik={formik} />
          <Input required label="CNIC" name={"cnic"} formik={formik} />
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            type={"date"}
            label="Date of Birth"
            name={"birth"}
            formik={formik}
          />
          <Select required label="Gender" name="gender" formik={formik}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            label="Mobile No."
            type="tel"
            name={"mobile"}
            formik={formik}
          />
          <Input
            required
            label="Watsapp No."
            type="tel"
            name={"watsapp"}
            formik={formik}
          />
        </FormGroup>

        <FormGroup horizontal>
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
          <Select
            required
            disabled={!formik.values.city ? true : false}
            label="Area"
            name={"area"}
            formik={formik}
          >
            <option value="">Select</option>
            {areas
              ?.filter((area) => area.city_id.name === formik.values.city)
              .map((area) => {
                return (
                  <option key={area._id} value={area.name}>
                    {area.name}
                  </option>
                );
              })}
          </Select>
        </FormGroup>

        <div className="mt-5">
          <h3 className="mb-2 text-gray-600 font-medium">
            Availablity (from - to)
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <Input
              required
              type="time"
              name={"availableFrom"}
              formik={formik}
            />

            <Input required type="time" name={"availableTo"} formik={formik} />
          </div>
        </div>

        <FormGroup>
          <div>
            <h3 className="text-gray-600 font-medium">Modes of Teaching</h3>
            <ul className="px-2 grid grid-cols-1 sm:grid-cols-3 gap-8 mt-2">
              {modes.map((item) => {
                const checked = formik.values.teachingModes.includes(item);
                // console.log(checked);
                return (
                  <li key={item}>
                    <CheckBox
                      defaultChecked={checked}
                      label={item}
                      name={item}
                      onChange={modesHandler}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </FormGroup>

        <FormGroup horizontal>
          <Input
            required
            label="Mobile No."
            type="tel"
            name={"mobile"}
            formik={formik}
          />
          <Input
            required
            label="Watsapp No."
            type="tel"
            name={"watsapp"}
            formik={formik}
          />
        </FormGroup>

        <FormGroup>
          <Input required label="City" name={"city"} formik={formik} />
        </FormGroup>

        <FormGroup>
          <TextArea required label="Address" name={"address"} formik={formik} />
        </FormGroup>
        <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
          {/* <Button
            type="button"
            onClick={() => {
              setCurrentStep((prev) => --prev);
            }}
          >
            Cancel
          </Button> */}
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
