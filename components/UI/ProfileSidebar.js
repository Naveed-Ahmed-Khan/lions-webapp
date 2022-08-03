/* eslint-disable @next/next/no-img-element */
import React from "react";
import Button from "./Button";
/* import profileImg from "../../Assets/Images/profile.png";
import pin from "../../Assets/Icons/pin.svg";
import female from "../../Assets/Icons/female.svg";
import search from "../../Assets/Icons/search.svg";
import arrow from "../../Assets/Icons/arrow.svg";
import Button from "./Button"; */

const ProfileSidebar = () => {
  return (
    <div className=" flex flex-col gap-8">
      {/* <section className="flex flex-col items-center">
        <img
          src="images/teacher-illustration.jpg"
          alt=""
          className="h-40 object-contain rounded-full"
        />
        <h2 className="mt-4 text-black text-xl font-semibold">
          Chandri Anggara
        </h2>
      </section> */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-black opacity-80 text-base font-medium">
            <span className="font-bold">Subjects:</span> English, Physics
          </p>
          <p className="text-black opacity-80 text-base font-medium">
            <span className="font-bold">Institute:</span> Lions Public
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-black text-base font-medium">
              Rawalpindi, Pakistan
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <p className="text-black text-base font-medium">Gender: Female</p>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <p className="text-black text-base font-medium">
              Highest Qualification: BSCS
            </p>
          </div>
        </div>
        <section>
          <div className="flex flex-col gap-6">
            <h3 className="text-black text-xl font-semibold">Qualification</h3>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-dark"
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
              <p className="text-black text-base">
                Matric - Siddeeq Public School | 2011
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-dark"
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
              <p className="text-black text-base ">
                Intermediate - Punjab College | 2014
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-dark"
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
              <p className="text-black text-base ">
                Graduation - Comsats University | 2019
              </p>
            </div>
          </div>
        </section>
      </section>
      <section>
        <div className="flex flex-col gap-6">
          <h3 className="text-black text-xl font-semibold">Other Details</h3>
          <p className="text-black opacity-80 text-base font-medium">
            <span className="font-bold">Mode:</span> Online
          </p>
          <p className="text-black opacity-80 text-base font-medium">
            <span className="font-bold">Experience (Years):</span> One
          </p>
        </div>
      </section>
      <section>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Button>
              <div className="text-base">
                <div className="flex gap-2">
                  <p>8</p>
                  <p className="text-left">Students Taught</p>
                </div>
              </div>
            </Button>
            <Button fullWidth>
              <p className="text-base">4 Trial Lessons</p>
            </Button>
          </div>
          <div className="flex-auto">
            <Button fullWidth>
              <p className="text-base"> Apply Now</p>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSidebar;
