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
import AccessDenied from "../../components/UI/AccessDenied";
import Progress from "../../components/UI/progress/Progress";
import Spinner from "../../components/UI/loader/Spinner";
import { getCookie } from "cookies-next";
import EditAvailability from "../../components/EditProfile/EditAvailability";
import EditSubjects2 from "../../components/EditProfile/EditSubjects2";

export default function EditProfile() {
  const { currentUser, checkAuth } = useAuth();

  const router = useRouter();
  const { userId } = router.query;
  const API = `${process.env.NEXT_PUBLIC_API}/get-tutor/${userId}`;
  const CITY_API = `${process.env.NEXT_PUBLIC_API}/get-allcities`;
  const AREA_API = `${process.env.NEXT_PUBLIC_API}/get-areas`;
  const SUBJECTS_API = `${process.env.NEXT_PUBLIC_API}/get-subjects`;
  const CLASSES_API = `${process.env.NEXT_PUBLIC_API}/get-tutor-classes`;

  const {
    data: tutor,
    isLoading: tutorLoading,
    updateData,
  } = useFetch(API, false);
  const { data: cities, isLoading: citiesLoading } = useFetch(CITY_API, false);
  const { data: areas, isLoading: areasLoading } = useFetch(AREA_API, false);
  const { data: classes, isLoading: classesLoading } = useFetch(
    CLASSES_API,
    false
  );
  const { data: subjects, isLoading: subjectsLoading } = useFetch(
    SUBJECTS_API,
    false
  );

  const [currentTab, setCurrentTab] = useState("Personal");
  const [profile, setProfile] = useState(tutor?.profileStatus);

  const [qualFilled, setQualFilled] = useState(false);
  const [availableFilled, setAvailableFilled] = useState(false);
  const [subjectFilled, setSubjectFilled] = useState(false);
  const [locationFilled, setLocationFilled] = useState(false);
  const [experienceFilled, setExperienceFilled] = useState(false);
  const [sectionFilled, setSectionFilled] = useState(false);

  useEffect(() => {
    if (tutor?.qualifications?.length > 0) {
      setQualFilled(true);
    } else {
      setQualFilled(false);
    }
    if (tutor?.subjectsTaught?.length > 0) {
      setSubjectFilled(true);
    } else {
      setSubjectFilled(false);
    }
    if (tutor?.slots?.length > 0) {
      setAvailableFilled(true);
    } else {
      setAvailableFilled(false);
    }
    if (tutor?.experience?.length > 0) {
      setExperienceFilled(true);
    } else {
      setExperienceFilled(false);
    }
    if (tutor?.sections?.length > 0) {
      setSectionFilled(true);
    } else {
      setSectionFilled(false);
    }
    if (tutor?.teachingModes?.includes("Tutor travels")) {
      if (tutor?.locations?.length > 0) {
        setLocationFilled(true);
      } else {
        setLocationFilled(false);
      }
    } else {
      setLocationFilled(true);
    }
  }, [tutor]);

  useEffect(() => {
    const setProfileStatus = async () => {
      if (tutor?.profileStatus === "incomplete") {
        if (profile === "complete") {
          console.log("Updating to complete status");
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor?._id}`,
            { profileStatus: "complete" },
            { headers: { Authorization: `Bearer ${getCookie("token")}` } }
          );

          updateData();
          checkAuth();
        }
      }
      if (tutor?.profileStatus === "complete") {
        if (profile === "incomplete") {
          console.log("Updating to incomplete status");
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor?._id}`,
            { profileStatus: "incomplete" },
            { headers: { Authorization: `Bearer ${getCookie("token")}` } }
          );
          updateData();
          checkAuth();
        }
      }
    };
    console.log("Current " + tutor?.profileStatus);
    console.log("New " + profile);
    setProfileStatus();
  }, [tutor, profile]);

  const tabs = [
    { id: 1, name: "Sections", value: "sections" },
    { id: 2, name: "Qualification", value: "qualifications" },
    { id: 3, name: "Subjects", value: "subjectsTaught" },
    { id: 4, name: "Availability", value: "slots" },
    { id: 5, name: "Locations", value: !tutor?.teachingModes?.includes("Tutor travels") ? true : "locations" },
    { id: 6, name: "Experience", value: "experience" },
    { id: 7, name: "Personal", value: true },
  ];
  console.log(subjects);
  return (
    <Container color={"gray-50"}>
      <div className="sm:p-5 bg-white max-w-5xl mx-auto">
        <div className="p-5 sm:p-0 sm:my-4">
          <h2 className="text-3xl text-primary font-semibold">Edit Profile</h2>
        </div>
        {tutorLoading ? (
          <div className="h-[calc(100vh-100px)]">
            <Spinner md />
          </div>
        ) : (
          <>
            <div className="px-5 sm:px-0 mb-4 sm:my-6">
              {!tutorLoading && (
                <Progress
                  qualFilled={qualFilled}
                  subjectFilled={subjectFilled}
                  locationFilled={locationFilled}
                  availableFilled={availableFilled}
                  setProfile={setProfile}
                // tutor={tutor}
                // profileStatus={tutor.profileStatus}
                // tutorId={tutor._id}
                />
              )}
            </div>

            <div className="px-5 sm:px-0 relative flex flex-col">
              <div className="my-4">
                <Tabs
                  tabs={tabs}
                  tutor={tutor}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              </div>
            </div>
            <div className="p-5 sm:p-0 ">
              {currentTab === "Personal" && (
                <EditPersonal tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Availability" && (
                <EditAvailability
                  setAvailableFilled={setAvailableFilled}
                  tutor={tutor}
                  updateData={updateData}
                />
              )}
              {currentTab === "Locations" && (
                <EditLocations
                  setLocationFilled={setLocationFilled}
                  cities={cities}
                  areas={areas}
                  tutor={tutor}
                  updateData={updateData}
                />
              )}
              {currentTab === "Subjects" && (
                <EditSubjects2
                  classes={classes}
                  subjects={subjects}
                  setSubjectFilled={setSubjectFilled}
                  tutor={tutor}
                  updateData={updateData}
                />
              )}
              {currentTab === "Qualification" && (
                <EditQualification
                  setQualFilled={setQualFilled}
                  tutor={tutor}
                  updateData={updateData}
                />
              )}
              {currentTab === "Experience" && (
                <EditExperience tutor={tutor} updateData={updateData} />
              )}
              {currentTab === "Sections" && (
                <EditSections tutor={tutor} updateData={updateData} />
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
