/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

import Container from "../../components/UI/Container";
import TextArea from "../../components/UI/TextArea";
import Input from "../../components/UI/Input";
import InputGroup from "../../components/UI/InputGroup";
import FormGroup from "../../components/UI/FormGroup";
import Button from "../../components/UI/Button";

export async function getServerSideProps(context) {
  const { jobId } = context.params;

  const jobs = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`
  );
  const applications = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`
  );
  // console.log(jobs);

  return {
    props: {
      job: jobs.data,
      applications: applications.data,
    },
  };
}

export default function JobDescription({ job, applications }) {
  const router = useRouter();
  const timestamp = job._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const uploadedAt = date.toDateString();

  // console.log(applications);
  // console.log(job);

  return (
    <Container color={"white"}>
      {/* <div className="p-4 sm:p-8 flex flex-col bg-white">
        <h2 className=" text-primary text-3xl font-semibold">
          View Applicants
        </h2>
      </div> */}
      <main className="px-5 sm:px-0 py-8 md:flex gap-6 bg-white ">
        <section className="md:flex w-full">
          <div className="md:max-w-xs lg:h-[calc(100vh-110px)] bg-white rounded sm:p-8 overflow-auto ">
            <div className="mb-6">
              <div className=" flex items-center justify-between">
                <h2 className=" text-primary text-2xl font-semibold">
                  Details
                </h2>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-gray-700">Job Status :</p>
                  <div className="px-2 py-0.5 text-sm text-gray-700 rounded-full border-2 border-primary">
                    Open
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700">
                Posted on {uploadedAt} by You
              </p>
            </div>
            <p className="">{job.description}</p>
            <ul className="mt-4 grid grid-cols-1 gap-4 ">
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

          <div className="mt-12 md:mt-0 md:flex-1 lg:h-[calc(100vh-110px)] bg-white md:bg-neutral-100 rounded sm:p-8 overflow-auto ">
            <div className="mb-8 flex items-center">
              <h2 className="text-primary text-2xl font-semibold">
                Applicants
              </h2>
              <div className="ml-1 flex item-center">
                <p className="text-primary text-xl font-semibold">
                  ({applications.length})
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {applications.length > 0 ? (
                applications.map((application) => {
                  const applicant = application.applicant_id;
                  return (
                    <div className=" flex flex-col gap-3 md:bg-white bg-neutral-100 rounded p-4 md:p-8">
                      <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                        {applicant.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                        {application.coverLetter}
                      </p>
                      <div className="w-fit">
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
                      </div>
                      <div className="text-gray-700 space-y-2">
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
                          <span>Qualification | {applicant.qualification}</span>
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
                      <div className="mt-2 flex justify-end">
                        <div className="w-full sm:w-fit">
                          <Button>Accept Application</Button>
                        </div>
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
        </section>
      </main>
    </Container>
  );
}
