/* eslint-disable @next/next/no-img-element */
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
import { useFormik } from "formik";
import Radio from "../../components/UI/Radio";
import useFetch from "../../hooks/useFetch";
import { getCookie } from "cookies-next";
import { findHighestQualification } from "../../util/findHighestQualification";

export default function JobDescription() {
  const router = useRouter();
  const jobId = router.query.jobId;
  const { currentUser } = useAuth();

  const GET_JOB_API = `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`;
  const GET_APP_API = `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`;
  const GET_API = `${process.env.NEXT_PUBLIC_API}/get-job-payment/${jobId}`;
  const { data: job, isLoading: jobLoading } = useFetch(GET_JOB_API, true);
  const {
    data: payment,
    isLoading: paymentLoading,
    updateData: updateApps,
  } = useFetch(GET_API, true);
  const { data: applications, isLoading: appsLoading } = useFetch(
    GET_APP_API,
    true
  );

  console.log(job);
  console.log(applications);
  console.log(payment);

  const [isFinalized, setIsFinalized] = useState("");
  const [decidedFee, setDecidedfee] = useState("");
  const [feedback, setFeedback] = useState("");
  console.log(isFinalized);

  const timestamp = job?._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const uploadedAt = date.toDateString();

  const demoSuccessfull = async (tutorId, appId) => {
    const APP_API = `${process.env.NEXT_PUBLIC_API}/add-payment`;

    try {
      const res = await axios.post(
        APP_API,
        {
          tutor_id: tutorId,
          app_id: appId,
          earned: decidedFee,
          isFinalized: true,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      console.log(res);
      if (res.status === 201) {
        updateApps();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const demoFailed = async (tutorId, appId) => {
    const APP_API = `${process.env.NEXT_PUBLIC_API}/add-payment`;
    try {
      await axios.post(
        APP_API,
        {
          tutor_id: tutorId,
          app_id: appId,
          isFinalized: true,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container color={"white"}>
      <div className="p-4 sm:p-6 flex flex-col bg-white">
        <h2 className=" text-primary text-3xl font-semibold">
          Application Review
        </h2>
      </div>
      <main className="p-6 md:flex gap-6 bg-white ">
        <section className="w-full space-y-8 ">
          <div className=" bg-white md:bg-neutral-100 rounded sm:p-8">
            <div className="mb-6">
              <div className="flex justify-between">
                <h2 className="mb-2 text-primary text-2xl font-semibold">
                  Job details
                </h2>
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    Job Status:
                    <span
                      className={`ml-2 py-1 px-1.5 rounded-full text-white ${
                        job.isOpen ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    >
                      {job.isOpen ? "Open" : "Closed"}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Posted on {uploadedAt} by {job?.user_id.name}
              </p>
            </div>

            <p>{job?.description}</p>
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
          </div>

          <div className="p-4 sm:p-8 flex flex-col bg-white md:bg-neutral-100">
            <h2 className=" mb-8 text-primary text-2xl font-semibold">
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
                <span>Location | {job?.city || job?.location.city}</span>
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

          <div className="mt-20 md:mt-0 bg-white md:bg-neutral-100 rounded md:p-8">
            <div className="mb-8 md:flex items-center">
              <h2 className="text-primary text-2xl font-semibold">
                My Application
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              {applications?.length > 0 ? (
                applications?.map((application) => {
                  const applicant = application.applicant_id;
                  return (
                    <div key={application?._id}>
                      {applicant?._id === currentUser?._id ? (
                        <>
                          <div className=" flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8">
                            <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                              {applicant.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                              {application.coverLetter}
                            </p>
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
                                  Qualification |{" "}
                                  {findHighestQualification(
                                    applicant.qualifications
                                  )}
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
                                <span>
                                  Budget | {application.expectedBudget}
                                </span>
                              </p>
                            </div>
                          </div>

                          {application.isShortlisted && (
                            <div className="mt-8 flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8">
                              <h3 className="text-primary text-xl font-semibold">
                                Selected For Demo
                              </h3>
                              <div>
                                <p className="text-gray-700">
                                  You have been selected for the demo class.
                                  Your selection will be based on this demo.
                                  After your demo you are required to report
                                  back the result of your demo, whether you were
                                  selected or not. Good Luck!
                                </p>
                                <h3 className="mt-4 text-gray-800 font-medium ">
                                  Watsapp No.
                                </h3>
                                <p className="text-gray-700">
                                  {job?.user_id?.watsapp ||
                                    job?.watsapp ||
                                    "Watsapp Not Available"}
                                </p>
                                <h3 className="mt-4 text-gray-800 font-medium ">
                                  Address
                                </h3>
                                <p className="text-gray-700">
                                  {job?.user_id?.address ||
                                    job?.address ||
                                    "Address Not Available"}
                                </p>
                                {payment.length > 0 ? (
                                  <h3 className="mt-4 text-lg text-gray-800 font-medium ">
                                    Response Submitted Successfuly
                                  </h3>
                                ) : (
                                  <div>
                                    <h3 className="mt-4 text-gray-800 font-medium ">
                                      Result
                                    </h3>
                                    <p className="text-gray-700">
                                      Your are required to select an option and
                                      submit your response after the demo. Your
                                      response will be cross checked with the
                                      parent&apos;s response.
                                    </p>
                                    <FormGroup horizontal>
                                      <Radio
                                        required
                                        label="Selected"
                                        name={"isFinalized"}
                                        value={isFinalized}
                                        onChange={() => {
                                          setIsFinalized(true);
                                        }}
                                      />

                                      <Radio
                                        required
                                        label="Not Selected"
                                        name={"isFinalized"}
                                        value={isFinalized}
                                        onChange={() => {
                                          setIsFinalized(false);
                                        }}
                                      />
                                    </FormGroup>
                                    {isFinalized !== "" && (
                                      <>
                                        {isFinalized ? (
                                          <div>
                                            <FormGroup>
                                              <Input
                                                required
                                                type="number"
                                                label="Fee Decided"
                                                name={"decidedFee"}
                                                value={decidedFee}
                                                onChange={(e) => {
                                                  setDecidedfee(e.target.value);
                                                }}
                                              />
                                            </FormGroup>
                                            <FormGroup>
                                              <TextArea
                                                required
                                                label="Feedback"
                                                name={"feedback"}
                                                value={feedback}
                                                onChange={(e) => {
                                                  setFeedback(e.target.value);
                                                }}
                                              />
                                            </FormGroup>
                                            <div>
                                              <Button
                                                type={"button"}
                                                onClick={() =>
                                                  demoSuccessfull(
                                                    applicant._id,
                                                    application._id
                                                  )
                                                }
                                              >
                                                Submit response
                                              </Button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div>
                                            <FormGroup>
                                              <TextArea
                                                required
                                                label="Feedback"
                                                name={"feedback"}
                                                value={feedback}
                                                onChange={(e) => {
                                                  setFeedback(e.target.value);
                                                }}
                                              />
                                            </FormGroup>
                                            <div>
                                              <Button
                                                type={"button"}
                                                onClick={() =>
                                                  demoFailed(
                                                    applicant._id,
                                                    application._id
                                                  )
                                                }
                                              >
                                                Submit response
                                              </Button>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {application.isSelected && (
                            <div className="mt-8 flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8">
                              <h3 className="text-primary text-xl font-semibold">
                                Selected For The Job
                              </h3>
                              <div>
                                <p className="text-gray-700">
                                  Congratulations! you have been selected for
                                  this job?.Your Contract starts after your
                                  first day at this job?.
                                </p>
                                <h3 className="mt-4 text-gray-800 font-medium ">
                                  Watsapp No.
                                </h3>
                                <p className="text-gray-700">
                                  {job?.user_id?.watsapp ||
                                    job?.watsapp ||
                                    "Watsapp Not Available"}
                                </p>
                                <h3 className="mt-4 text-gray-800 font-medium ">
                                  Address
                                </h3>
                                <p className="text-gray-700">
                                  {job?.user_id?.address ||
                                    job?.address ||
                                    "Address Not Available"}
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      ) : null}
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
        </section>
      </main>
    </Container>
  );
}
