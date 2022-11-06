/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { findHighestQualification } from "../../../util/findHighestQualification";
import Anchor from "../Anchor";

const TutorCard = ({ tutor }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div>
        <Image
          height={"100%"}
          width={"100%"}
          layout="responsive"
          className="object-cover object-top"
          src={tutor?.profilePic}
          alt={""}
        />

        <div
          className={`flex items-center justify-center px-6 py-3 ${
            tutor?.isVerified ? "bg-primary" : "bg-gray-500"
          } `}
        >
          {tutor?.isVerified ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          )}

          <h2 className="mx-3 text-lg tracking-wide font-semibold text-white">
            {tutor?.isVerified ? "Verified" : "Unverified"}
          </h2>
        </div>
      </div>

      <div>
        <div className="p-4">
          <h3 className="text-xl font-medium text-gray-700 dark:text-white">
            {tutor?.name}
          </h3>
          <div className="flex mt-2 item-center">
            <svg
              className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>

            <svg
              className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>

            <svg
              className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>

            <svg
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>

            <svg
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
            <p className="ml-1 -mt-0.5 text-gray-600">(0)</p>
          </div>

          {/* <p className="py-1 text-sm sm:text-base text-gray-700 dark:text-gray-400">
            Full Stack maker & UI / UX Designer , Author of Building UI.
          </p> */}

          <div className="flex justify-between gap-1">
            <div>
              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <svg
                  className="w-6 h-6 fill-current text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 11H10V13H14V11Z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                  />
                </svg>

                <h6 className="px-2 text-xs font-semibold">
                  {findHighestQualification(tutor?.qualifications)}
                </h6>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <svg
                  className="w-6 h-6 fill-current text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                  />
                </svg>

                <h6 className="px-2 text-xs font-semibold">{tutor?.city}</h6>
              </div>
            </div>

            <div>
              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <h6 className="px-2 text-xs font-semibold">
                  {tutor?.selectedJobs?.length || 0} | Students taught
                </h6>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
                <h6 className="px-2 text-xs font-semibold">
                  {tutor?.shortlistedDemos?.length || 0} | Trial lessons
                </h6>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between mt-4 mb-2">
            <div className="w-full">
              <Anchor button href={`/profile/${tutor?._id}`}>
                View Profile
              </Anchor>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
