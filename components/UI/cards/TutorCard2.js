import React from "react";
import Link from "next/dist/client/link";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/router";
import { findHighestQualification } from "../../../util/findHighestQualification";
import Anchor from "../Anchor";

const TutorCard2 = ({ tutor, profilePic }) => {
  const router = useRouter();
  console.log(tutor);
  const profile = tutor.sections?.filter(
    (section) => section.title === "Profile"
  );

  console.log(profile);

  return (
    <div className="sm:flex mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
      <div className="flex flex-col">
        {profilePic?.profilePic ? (
          <div className="relative w-full lg:w-64 h-64 sm:h-full">
            <Image
              layout="fill"
              className="object-cover object-center"
              src={profilePic.profilePic}
              alt={""}
            />
          </div>
        ) : (
          <div className="bg-neutral-400 animate-pulse w-full lg:w-64 h-64 sm:h-full" />
        )}

        <div
          className={`flex items-center justify-center px-6 py-3 ${
            tutor.isVerified ? "bg-primary" : "bg-gray-500"
          } `}
        >
          {tutor.isVerified ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
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

          <h2 className="mx-3 text-lg tracking-wide font-medium text-white">
            {tutor.isVerified ? "Verified" : "Unverified"}
          </h2>
        </div>
      </div>

      <div className="flex flex-col flex-auto justify-between p-4">
        <div className="sm:flex justify-between">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            {tutor.name}
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
        </div>

        <p className="hidden sm:block py-1 text-gray-700 dark:text-gray-400 h-20 overflow-auto">
          {profile[0]?.subSections[0]?.content ||
            tutor.sections[0]?.subSections[0]?.content ||
            tutor.aboutMe}
        </p>

        {/* {Details} */}
        <div className="mt-2 sm:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <h3 className="-mb-2 col-span-full text-primary font-medium underline underline-offset-2">
            Details:
          </h3>
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

            <h3 className="px-2 text-sm font-medium">
              {findHighestQualification(tutor.qualifications)}
            </h3>
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

            <h3 className="px-2 text-sm font-medium">{tutor.city}</h3>
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <h3 className="px-2 text-sm font-medium">
              {tutor.selectedJobs.length || 0} | Students taught
            </h3>
          </div>

          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>

            <h3 className="px-2 text-sm font-medium">
              {tutor.subjectsTaught[0]?.name}{" "}
              {tutor.subjectsTaught[1] && `,${tutor.subjectsTaught[1]?.name}`}
            </h3>
          </div>

          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
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
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            <h3 className="px-2 text-sm font-medium">
              {tutor.subjectsTaught[0]?.classes[0]?.title}{" "}
              {tutor.subjectsTaught[1]?.classes[1] &&
                `,${tutor.subjectsTaught[1]?.classes[1]?.title}`}
            </h3>
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <h3 className="px-2 text-sm font-medium">
              {tutor.shortlistedDemos.length || 0} | Trial lessons
            </h3>
          </div>
        </div>

        {/* {Badges} */}
        <div className="">
          {/* <h3 className="hidden sm:block my-2 col-span-full text-primary font-medium underline underline-offset-2">
            Badges:
          </h3> */}

          <div className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
            {/* <div className="hidden sm:flex space-x-3">
              <div
                className="h-11 w-11 text-primary hover:text-white bg-white hover:bg-primary rounded-full 
                border border-primary hover:border hover:border-primary grid place-content-center
                transition-all duration-300 ease-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div
                className="h-11 w-11 text-primary hover:text-white bg-white hover:bg-primary rounded-full 
                border border-primary hover:border hover:border-primary grid place-content-center
                transition-all duration-300 ease-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div
                className="h-11 w-11 text-primary hover:text-white bg-white hover:bg-primary rounded-full 
                border border-primary hover:border hover:border-primary grid place-content-center
                transition-all duration-300 ease-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div
                className="h-11 w-11 text-primary hover:text-white bg-white hover:bg-primary rounded-full 
            border border-primary hover:border hover:border-primary grid place-content-center
            transition-all duration-300 ease-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
            </div> */}

            <div className="w-full mt-4 space-y-4 md:space-y-0 sm:flex items-center justify-start sm:space-x-4">
              <div className="w-full sm:flex justify-end">
                <Anchor button href={`/profile/${tutor._id}`}>
                  View Profile
                </Anchor>
              </div>
              {/* <Anchor link href={`/profile/${tutor._id}`}>
                Contact
              </Anchor> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard2;
