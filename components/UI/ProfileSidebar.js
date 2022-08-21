/* eslint-disable @next/next/no-img-element */
import React from "react";
import Button from "./Button";
/* import profileImg from "../../Assets/Images/profile.png";
import pin from "../../Assets/Icons/pin.svg";
import female from "../../Assets/Icons/female.svg";
import search from "../../Assets/Icons/search.svg";
import arrow from "../../Assets/Icons/arrow.svg";
import Button from "./Button"; */

const ProfileSidebar = ({ tutor }) => {
  return (
    <div className=" flex flex-col gap-8 mt-4">
      <section className="flex flex-col gap-5">
        <h3 className="text-2xl text-gray-700 font-medium mb-1">Summary</h3>

        <div className="flex items-center gap-2">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="font-archivo text-gray-700 text-base font-medium">
            {tutor.city}, Pakistan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div>
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <p className="font-archivo text-gray-700 text-base font-medium">
            Gender: {tutor.gender}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
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
          <p className="font-archivo text-gray-700 text-base font-medium">
            Qualification: {tutor.qualifications[2].degree}
          </p>
        </div>

        <div className="flex items-center gap-2">
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="font-archivo text-gray-700 text-base font-medium">
            Works At: {tutor.experience[0].institute}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
          <p className="font-archivo text-gray-700 text-base font-medium">
            Students Taught: 5
          </p>
        </div>
        <div className="flex items-center gap-2">
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
              d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <p className="font-archivo text-gray-700 text-base font-medium">
            Trial Lessons: 11
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div className="space-y-6 ">
          <h3 className="text-2xl text-gray-700 font-medium mb-1">
            Subjects Taught
          </h3>
          {tutor.subjectsTaught.length > 0 ? (
            tutor.subjectsTaught.map((subject) => {
              return (
                <div
                  key={subject._id}
                  className="w-full p-6 border border-gray-300 rounded-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg text-primary font-medium">
                      {subject.name}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {subject.classes.map((item) => {
                      return (
                        <div key={item._id}>
                          <p className="text-gray-600 font-medium">
                            {item.title}
                          </p>
                          <p className="text-gray-600">@ Rs.{item.rate}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <>No Subjects</>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div className="space-y-6 ">
          <h3 className="text-2xl text-gray-700 font-medium mb-1">Places</h3>
          {tutor.locations.length > 0 ? (
            tutor.locations.map((location) => {
              return (
                <div
                  key={location._id}
                  className="w-full p-6 border border-gray-300 rounded-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg text-primary font-medium">
                      {location.city}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {location.places.map((place, index) => {
                      return (
                        <p key={index} className="text-gray-700">
                          {place}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <>No Locations</>
          )}
        </div>
      </section>

      <Button>
        <p className="text-lg"> Apply Now</p>
      </Button>
    </div>
  );
};

export default ProfileSidebar;
