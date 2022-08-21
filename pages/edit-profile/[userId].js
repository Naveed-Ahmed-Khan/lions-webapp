import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Collapse from "../../components/UI/Collapse";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";
import Button from "../../components/UI/Button";
import Tabs from "../../components/UI/Tabs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import Input from "../../components/UI/Input";
import FormGroup from "../../components/UI/FormGroup";
import Select from "../../components/UI/Select";
import TextArea from "../../components/UI/TextArea";
import EditSections from "../../components/EditProfile/EditSections";
import EditSubjects from "../../components/EditProfile/EditSubjects";
import EditPersonal from "../../components/EditProfile/EditPersonal";
import EditLocations from "../../components/EditProfile/EditLocations";
import EditQualification from "../../components/EditProfile/EditQualification";
import EditExperience from "../../components/EditProfile/EditExperience";
import useFetch from "../../hooks/useFetch";

export default function EditProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const API = `${process.env.NEXT_PUBLIC_API}/get-user/${userId}`;

  const { data: tutor, isLoading, updateData } = useFetch(API);

  console.log(tutor);

  const [currentTab, setCurrentTab] = useState("Personal");

  const tabs = [
    "Personal",
    "Qualification",
    "Experience",
    "Subjects",
    "Locations",
    "Sections",
  ];

  return (
    <Container color={"gray-50"}>
      <div className="bg-white">
        <div className="py-6 mx-auto max-w-[800px] sm:flex justify-between items-center">
          <h1 className="text-3xl text-primary font-semibold">Edit Profile</h1>
        </div>

        <div className="relative flex flex-col">
          <div className="my-8">
            <Tabs
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        </div>
        <div className="p-5">
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {currentTab === "Sections" && (
                <EditSections tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Personal" && (
                <EditPersonal tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Locations" && (
                <EditLocations tutor={tutor} updateData={updateData} />
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
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
