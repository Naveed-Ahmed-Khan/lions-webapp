import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { jobTimeStamp } from "../../../util/jobTimeStamp";
import Anchor from "../Anchor";
import Button from "../Button";

const JobCard2 = ({ job, isSelected, isShortlisted }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  return (
    <div className="relative flex flex-col w-full overflow-hidden rounded-2xl shadow-xl">
      <div className="flex flex-col p-4 sm:p-8 space-y-4 bg-white border-b border-b-gray-300">
        {/* <h3 className="text-xl font-semibold text-gray-700">Tutor Required</h3> */}
        <div className="sm:flex justify-between items-center">
          <div className="w-full flex items-center justify-between gap-4">
            <p className="text-primary text-lg sm:text-xl font-medium">
              {job.title}
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
                  {job.isOpen ? "Open" : "Closed"}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-8 flex flex-col bg-white ">
        <p className="flex text-gray-800">
          <span className="mb-4 text-primary text-xl font-medium">
            Requirements
          </span>
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 mb-8 space-y-2">
          <li className="flex items-end space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
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
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>{" "}
            <span>Subject | {job.subjects.join(", ")}</span>
          </li>
          <li className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
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
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span>Location | {job.city || job.location.city}</span>
          </li>
          <li className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
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
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span>Duration | {job.duration}</span>
          </li>
          <li className="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>

            <span>Expected Budget | Rs. {job.budget}</span>
          </li>
        </ul>

        {router.pathname === "/jobs" && (
          <div className="flex justify-between">
            <Anchor button href={`/tution-job/${job._id}`}>
              View Details
            </Anchor>
            <Anchor button href={`/tution-job/apply/${job._id}`}>
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
          <div className="space-y-4 sm:space-y-0 sm:flex items-center justify-between">
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
            {isSelected ? (
              <div className="py-2 px-6 border-2 border-primary rounded-lg">
                <p className="text-primary font-medium">Selected For Job</p>
              </div>
            ) : isShortlisted ? (
              <div className="py-2 px-6 border-2 border-primary rounded-lg">
                <p className="text-primary font-medium">Selected For Demo</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard2;
