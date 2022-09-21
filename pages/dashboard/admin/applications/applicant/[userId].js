import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Collapse from "../../../../../components/UI/Collapse";
import Container from "../../../../../components/UI/Container";
import ProfileSidebar from "../../../../../components/UI/ProfileSidebar";
import Button from "../../../../../components/UI/Button";
import Tabs from "../../../../../components/UI/Tabs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../../../../contexts/AuthContext";
import * as yup from "yup";
import Input from "../../../../../components/UI/Input";
import FormGroup from "../../../../../components/UI/FormGroup";
import Select from "../../../../../components/UI/Select";
import TextArea from "../../../../../components/UI/TextArea";
import EditSections from "../../../../../components/EditProfile/EditSections";
import EditSubjects from "../../../../../components/EditProfile/EditSubjects";
import EditPersonal from "../../../../../components/EditProfile/EditPersonal";
import EditLocations from "../../../../../components/EditProfile/EditLocations";
import EditQualification from "../../../../../components/EditProfile/EditQualification";
import EditExperience from "../../../../../components/EditProfile/EditExperience";
import useFetch from "../../../../../hooks/useFetch";
import AccessDenied from "../../../../../components/UI/AccessDenied";
import Progress from "../../../../../components/UI/progress/Progress";
import Spinner from "../../../../../components/UI/loader/Spinner";

export default function EditProfile() {
  const { currentUser, checkAuth } = useAuth();

  const router = useRouter();
  const { userId } = router.query;
  const API = `${process.env.NEXT_PUBLIC_API}/get-user/${userId}`;
  const CITY_API = `${process.env.NEXT_PUBLIC_API}/get-cities`;
  const AREA_API = `${process.env.NEXT_PUBLIC_API}/get-areas`;

  const { data: tutor, isLoading, isError, updateData } = useFetch(API, true);
  const { data: cities } = useFetch(CITY_API, false);
  const { data: areas } = useFetch(AREA_API, false);

  console.log(tutor);
  console.log(isError);
  console.log(tutor?.profileStatus);

  const [currentTab, setCurrentTab] = useState("Personal");
  const [profile, setProfile] = useState(tutor?.profileStatus);

  console.log(profile);

  useEffect(() => {
    return async () => {
      console.log("unmounting");
      if (tutor?.profileStatus === "incomplete") {
        if (profile === "complete") {
          console.log("complete");
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor?._id}`,
            { profileStatus: "complete" }
          );
          /* const user = JSON.parse(localStorage.getItem("user"));
          console.log({ ...user, profileStatus: "complete" });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, profileStatus: "complete" })
          ); */
          checkAuth();
        }
      }
      if (tutor?.profileStatus === "complete") {
        if (profile === "incomplete") {
          console.log("incomplete");
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor?._id}`,
            { profileStatus: "incomplete" }
          );
          /* const user = JSON.parse(localStorage.getItem("user"));
          console.log({ ...user, profileStatus: "incomplete" });

          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, profileStatus: "incomplete" })
          ); */
          checkAuth();
        }
      }
    };
  });

  const tabs = [
    "Personal",
    "Qualification",
    "Experience",
    "Subjects",
    "Locations",
    "Sections",
    // "Gallery",
  ];

  return (
    <Container color={"white"}>
      <div className="sm:p-5 bg-white max-w-4xl mx-auto">
        <div className="p-5 sm:p-0 my-4">
          <h1 className="text-3xl text-primary font-semibold">
            Detailed Profile
          </h1>
        </div>
        {!isError && isLoading ? (
          <div className="h-[calc(100vh-100px)]">
            <Spinner md />
          </div>
        ) : (
          <>
            <div className="my-6">
              <Progress setProfile={setProfile} tutor={tutor} />
            </div>

            <div className="relative flex flex-col">
              <div className="my-4">
                <Tabs
                  tabs={tabs}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              </div>
            </div>
            <div className="p-5 sm:p-0 ">
              {currentTab === "Sections" && (
                <EditSections tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Personal" && (
                <EditPersonal
                  tutor={tutor}
                  updateData={updateData}
                  cities={cities}
                  areas={areas}
                />
              )}
              {currentTab === "Locations" && (
                <EditLocations
                  cities={cities}
                  areas={areas}
                  tutor={tutor}
                  updateData={updateData}
                />
              )}
              {currentTab === "Subjects" && (
                <EditSubjects tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Experience" && (
                <EditExperience tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Qualification" && (
                <EditQualification tutor={tutor} updateData={updateData} />
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
