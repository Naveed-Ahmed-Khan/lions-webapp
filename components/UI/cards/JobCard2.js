import { useRouter } from "next/router";
import React from "react";
import { jobTimeStamp } from "../../../utility/jobTimeStamp";
import Anchor from "../Anchor";
import Button from "../Button";

const JobCard2 = ({ job }) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col max-w-[340] overflow-hidden rounded-md shadow-xl">
      <div className="flex flex-col p-4 sm:p-8 space-y-4 bg-gray-200 ">
        {/* <h3 className="text-xl font-semibold text-gray-700">Tutor Required</h3> */}
        <div className="sm:flex justify-between items-center">
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-700 text-lg sm:text-xl font-semibold">
              Tutor Required
            </p>
            {job.isFeatured && (
              <p className="bg-primary-light py-1 px-2 w-fit rounded-full text-sm text-center text-white font-medium">
                Featured
              </p>
            )}
          </div>
          <p className="self-end text-gray-500 text-sm">
            {/* {jobTimeStamp(job.user_id?._id)} */}
          </p>
        </div>
        <p className="mt-6 text-gray-700 h-24 overflow-y-auto">
          {job.description}
        </p>
        {router.pathname !== "/my-jobs" && (
          <div className="flex justify-between">
            <div>
              <p className="text-gray-800 text-sm font-medium">
                Job posted by | {job.user_id?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">
                Job Status:
                <span className="ml-2 px-1 py-0.5 border-2 border-primary rounded-full">
                  {job.jobType}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-8 flex flex-col bg-white ">
        <p className="flex text-gray-800">
          <span className="mb-4 text-xl font-semibold">Requirements</span>
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 mb-8 space-y-2">
          <li className="flex items-end space-x-2">
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
          <li className="flex space-x-2">
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
          <li className="flex space-x-2">
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
          <li className="flex space-x-2">
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
            <span>Location | {job.location.city}</span>
          </li>
          <li className="flex space-x-2">
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
          <li className="flex space-x-2">
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

        {router.pathname === "/jobs" && (
          <div className="w-full sm:w-fit self-end">
            <Anchor button href={`/job-description/${job._id}`}>
              Apply Now
            </Anchor>
          </div>
        )}

        {router.pathname.includes("/my-jobs") && (
          <div className="space-y-4 sm:space-y-0 sm:flex items-end justify-between">
            <div className="w-full sm:w-fit self-end">
              <Button
                onClick={() => {
                  router.push({
                    pathname: "/view-applicants/[jobId]",
                    query: {
                      jobId: job._id,
                    },
                  });
                }}
              >
                <p>View Applicants</p>
              </Button>
            </div>
          </div>
        )}

        {router.pathname.includes("/applied-jobs") && (
          <div className="space-y-4 sm:space-y-0 sm:flex items-end justify-between">
            <div className="w-full sm:w-fit self-end">
              <Button
                onClick={() => {
                  router.push({
                    pathname: "/my-application/[jobId]",
                    query: {
                      jobId: job._id,
                    },
                  });
                }}
              >
                <p>View My application</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard2;
