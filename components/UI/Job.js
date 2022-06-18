import React from "react";

const Job = () => {
  return (
    <div className="relative flex flex-col p-8 shadow-lg bg-white rounded-2xl">
      <div className="relative flex-1">
        <div className="bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-700">Startup</h3>
          <p className="flex items-baseline mt-4 text-gray-700">
            <span className="text-5xl font-extrabold tracking-tight">$32</span>
            <span className="ml-1 text-xl font-semibold">/month</span>
          </p>
          <p className="mt-6 text-gray-700 text-solitud">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            praesentium velit, deserunt placeat nostrum et officiis ducimus
            repellat consectetur modi!
          </p>
        </div>

        <ul role="list" className="pt-6 mt-6 space-y-6 border-t">
          <span className="text-lg font-semibold text-gray-700">
            What&apos;s included?
          </span>
          <li className="flex">
            <div className="inline-flex items-center w-6 h-6 bg-white rounded-xl">
              <svg
                className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Up to 10 credit cards</span>
          </li>
          <li className="flex">
            <div className="inline-flex items-center w-6 h-6 bg-white rounded-xl">
              <svg
                className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Up to 10,000 credits</span>
          </li>
          <li className="flex">
            <div className="inline-flex items-center w-6 h-6 bg-white rounded-xl">
              <svg
                className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Less tacky wallet </span>
          </li>
          <li className="flex">
            <div className="inline-flex items-center w-6 h-6 bg-white rounded-xl">
              <svg
                className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Profile and portafolio</span>
          </li>
          <li className="flex">
            <div className="inline-flex items-center w-6 h-6 bg-white rounded-xl">
              <svg
                className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Job;
