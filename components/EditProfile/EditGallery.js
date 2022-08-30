import React, { useMemo, useState } from "react";

import FormGroup from "../UI/FormGroup";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Input from "../UI/Input";
import InputFile from "../UI/InputFile";
import TextArea from "../UI/TextArea";
import Select from "../UI/Select";
import DatePicker from "../UI/DatePicker";

import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import axios from "axios";
import { filetobase64 } from "../../utility/filetobase64";

export default function EditGallery({ tutor, updateData }) {
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

  const formik = useFormik({
    initialValues: {
      profilePic: "",

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

        /* await updateTutor({
          mobile: values.mobile,
          watsapp: values.watsapp,
          city: values.city,
          address: values.address,
          profilePic: values.profilePic || tutor.profilePic,
          bannerImage: values.bannerImage || tutor.bannerImage,
        }); */
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="pb-12 w-full max-w-screen-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary">
        Gallery
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
