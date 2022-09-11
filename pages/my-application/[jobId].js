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

/* export async function getServerSideProps(context) {
  const { jobId } = context.params;

  const jobs = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`
  );
  const applications = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`
  );

  return {
    props: {
      job: jobs.data,
      applications: applications.data,
    },
  };
} */
export async function getStaticPaths() {
  const jobs = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-jobs`);

  return {
    paths: jobs.data.map((job) => ({
      params: { jobId: job?._id },
    })),
    fallback: false,
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
      applications: applications.data,
    },
    revalidate: 30,
  };
}

export default function JobDescription({ job, applications }) {
  console.log(applications);
  console.log(job);
  const router = useRouter();
  const { currentUser } = useAuth();

  const timestamp = job?._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const uploadedAt = date.toDateString();

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
                <p className="text-gray-800 text-sm font-medium">
                  Job Status:
                  <span className="ml-2 px-1 py-0.5 border-2 border-primary rounded-full">
                    {job.jobType}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Posted on {uploadedAt} by {job.user_id.name}
              </p>
            </div>

            <p>{job.description}</p>
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
                <span>Class | {job.class}</span>
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
                <span>Subject | {job.subjects}</span>
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
                <span>Budget | Rs. {job.budget}</span>
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
                <span>Experience | {job.experience} Year</span>
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
                <span>Qualification | {job.qualification}</span>
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
                <span>Location | {job.city}</span>
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
                <span>Gender Preferance | {job.gender}</span>
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
                <span>Duration | {job.duration}</span>
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
              {applications.length > 0 ? (
                applications.map((application) => {
                  const applicant = application.applicant_id;
                  return (
                    <div key={application?._id}>
                      {applicant?._id === currentUser?.userId ? (
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
