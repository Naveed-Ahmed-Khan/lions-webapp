import React from "react";
import Button from "../Button";
import { useRouter } from "next/router";

const FeatureCard = () => {
  const router = useRouter();
  return (
    <section className="text-gray-600 mt-4">
      <div className="container px-0 sm:px-5  mx-auto">
        <div className="flex flex-col gap-4 text-center w-full mb-6">
          <div className="space-y-4">
            <h1 className="text-primary text-2xl font-bold  sm:text-4xl">
              Learn From Expert Tutors With Us Today
            </h1>
          </div>
          <p className="lg:w-2/3 p-2 lg:p-4 mx-auto text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven&apos;t.
          </p>
          <div className=" items-center justify-center sm:space-x-6 sm:flex">
            <div className="mb-4 sm:mb-0 w-full sm:w-fit">
              <Button
                onClick={() => {
                  router.push("/tutors");
                }}
              >
                <p className=" font-medium"> Find Tutors Now</p>
              </Button>
            </div>
            <div className="mb-4 sm:mb-0 w-full sm:w-fit">
              <Button
                alt
                onClick={() => {
                  router.push("/job-posting");
                }}
              >
                <p className=" font-medium">Post a Job</p>
              </Button>
            </div>
            {/*  <a className="px-7 py-3 w-full bg-gray-700 text-white font-medium text-center rounded-md block sm:w-auto">
              Post a Job
            </a> */}
          </div>
        </div>
        <div className="flex sm:flex-wrap -m-4 text-center overflow-auto">
          <div className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="w-36 sm:w-full border-2 border-gray-200 px-2 py-4 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-primary w-8 h-8 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M8 17l4 4 4-4m-4-5v9"></path>
                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                2.7K
              </h2>
              <p className="">Downloads</p>
            </div>
          </div>
          <div className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="w-36 sm:w-full border-2 border-gray-200 px-2 py-4 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-primary w-8 h-8 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                1.3K
              </h2>
              <p className="">Users</p>
            </div>
          </div>
          <div className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="w-36 sm:w-full border-2 border-gray-200 px-2 py-4 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-primary w-8 h-8 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                74
              </h2>
              <p className="">Files</p>
            </div>
          </div>
          <div className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="w-36 sm:w-full border-2 border-gray-200 px-2 py-4 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-primary w-8 h-8 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                46
              </h2>
              <p className="">Places</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
