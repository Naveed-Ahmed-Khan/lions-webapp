import React, { useMemo, useState } from "react";

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

export default function EditPersonal({ tutor, updateData }) {
  const { signup } = useAuth();
  const [imagePath, setImagePath] = useState(null);
  const [bannerPath, setBannerPath] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  const updateTutor = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data
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
      profilePic: "",
      bannerImage: "",
      mobile: tutor.mobile || "",
      watsapp: tutor.watsapp || "",
      city: tutor.city || "",
      address: tutor.address || "",
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
          mobile: values.mobile,
          watsapp: values.watsapp,
          city: values.city,
          address: values.address,
          profilePic: values.profilePic || tutor.profilePic,
          bannerImage: values.bannerImage || tutor.bannerImage,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Profile Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-8 w-full">
        <div className="space-y-8">
          <div className="sm:flex gap-6">
            {profilePath || tutor.profilePic ? (
              <div className="relative h-44 w-44 rounded-lg overflow-clip">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={profilePath || tutor.profilePic}
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
          <div className=" space-y-6 ">
            {bannerImagePath || tutor.bannerImage ? (
              <div className="relative h-44 rounded-lg overflow-clip">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={bannerImagePath || tutor.bannerImage}
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
          </div>
        </div>

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