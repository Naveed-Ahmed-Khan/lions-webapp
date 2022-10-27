import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Container from "../../components/UI/Container";
import TextArea from "../../components/UI/TextArea";
import Input from "../../components/UI/Input";
import InputGroup from "../../components/UI/InputGroup";
import FormGroup from "../../components/UI/FormGroup";
import Button from "../../components/UI/Button";
import { useAuth } from "../../contexts/AuthContext";
import { getCookie, getCookies } from "cookies-next";
import Spinner from "../../components/UI/loader/Spinner";
import useFetch from "../../hooks/useFetch";

/* export async function getStaticPaths() {
  const jobs = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-jobs`);

  return {
    paths: jobs.data.map((job) => ({
      params: { jobId: job?._id },
    })),
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { jobId } = params;

  const jobs = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`
  );
  const applications = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`
  );
  return {
    props: {
      job: jobs.data,
      applications: applications?.data,
    },
    revalidate: 30,
  };
} */

export default function JobDescription() {
  const token = getCookie("token");
  const userType = getCookie("user");
  /*   console.log(token);
  console.log(applications);
  console.log(job); */
  const router = useRouter();
  const { jobId } = router.query;
  const { currentUser } = useAuth();

  const JOB_API = `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`;
  const APP_API = `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`;

  const {
    data: job,
    isLoading: jobLoading,
    updateData: updateJob,
  } = useFetch(JOB_API, true);

  const {
    data: applications,
    isLoading: applicationsLoading,
    updateData: updateApplications,
  } = useFetch(APP_API, true);

  const [coverLetter, setCoverLetter] = useState("");
  const [expectedBudget, setExpectedBudget] = useState("");
  const [distance, setDistance] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timestamp = job?._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const uploadedAt = date.toDateString();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    /* console.log({
      job_id: job?._id,
      applicant_id: currentUser?.userId,
      coverLetter: coverLetter,
      quialification: currentUser?.qualification,
      expectedBudget: expectedBudget,
    }); */
    if (!currentUser) {
      setIsLoading(false);
      router.push("/login");
      return;
    }
    console.log(currentUser);
    if (currentUser?.isVerified && userType === "tutor") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/add-application`,
          {
            job_id: job?._id,
            applicant_id: currentUser?._id,
            coverLetter: coverLetter,
            quialification: currentUser?.qualification,
            expectedBudget: expectedBudget,
            distance: distance,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        updateJob();
        updateApplications();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // console.log("You are not eligible to apply");
      setError("Unverified Tutors are not eligible to apply");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && applications?.length > 0) {
      const apl = applications?.filter(
        (appliction) => appliction.applicant_id._id
      );
      apl ? setHasApplied(true) : setHasApplied(false);
    }
  }, [currentUser, applications]);

  return (
    <Container color={"white"}>
      <div className="p-4 sm:px-8 sm:pt-6 sm:pb-0 flex flex-col bg-white">
        <h2 className=" text-primary text-3xl font-semibold">
          Job Description
        </h2>
      </div>
      <main className="p-6 md:flex gap-6 bg-white ">
        <section className="w-full space-y-8 ">
          {jobLoading ? (
            <Spinner md />
          ) : (
            <>
              <div className="bg-white md:bg-neutral-100 rounded sm:p-8">
                <div className="mb-6">
                  <h2 className="mb-1 text-primary text-2xl font-semibold">
                    {job?.title}
                  </h2>
                  <p className="mb-6 text-sm text-gray-700">
                    Posted on {uploadedAt} by {job?.user_id?.name}
                  </p>
                  <h2 className="mb-3 text-primary text-xl font-medium">
                    Job details
                  </h2>
                  <p className="">{job?.description}</p>
                </div>
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Class | {job?.class}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Subject | {job?.subjects}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Budget | Rs. {job?.budget}</span>
                  </li>
                </ul>
                <div className="mt-8 flex flex-col bg-white md:bg-neutral-100">
                  <h2 className="mb-4 text-primary text-xl font-medium">
                    Tutor Requirements
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      <span>Experience | {job?.experience} Year</span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      <span>Qualification | {job?.qualification}</span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      <span>Location | {job?.city}</span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      <span>Gender Preferance | {job?.gender}</span>
                    </li>
                    <li className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      <span>Duration | {job?.duration}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {applicationsLoading ? (
            <Spinner sm />
          ) : (
            <div className="mt-20 md:mt-0 bg-white md:bg-neutral-100 rounded md:p-8">
              <div className="mb-8 md:flex items-center">
                <h2 className="text-primary text-2xl font-semibold">
                  Applicants
                </h2>
                <div className="flex mt-2 item-center">
                  <p className="ml-1 -mt-0.5 text-gray-600">
                    {applications?.length > 0 && `(${applications?.length})`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {applications?.length > 0 ? (
                  applications?.map((application) => {
                    const applicant = application.applicant_id;
                    return (
                      <div
                        key={application._id}
                        className=" flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8"
                      >
                        <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                          {applicant.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                          {application.coverLetter}
                        </p>
                        <button
                          className="flex items-center"
                          onClick={() => {
                            router.push({
                              pathname: "/profile/[userId]",
                              query: { userId: applicant._id },
                            });
                          }}
                        >
                          <p className="flex items-center text-primary text-sm hover:pr-3 transition-all duration-300">
                            View Profile
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mt-px text-primary translate-x-0 hover:translate-x-3 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                        <div className="text-gray-700 my-2">
                          <p className="mb-2 flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                            <span>
                              Qualification | {applicant.qualification}
                            </span>
                          </p>
                          <p className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                            <span>Budget | {application.expectedBudget}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="h-40 flex items-center justify-center text-xl text-gray-700 font-medium">
                    No Applicants!
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </Container>
  );
}
