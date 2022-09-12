import React from "react";
import Button from "../Button";
import { useRouter } from "next/router";
import Anchor from "../Anchor";

const FeatureCard = () => {
  const router = useRouter();

  const features = [
    {
      id: "1",
      title: "24/7 Book a Demo Class",
      details:
        "We are available for 24/7 for the demo class booking. Please contact us if you have any enquiry.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
          />
        </svg>
      ),
    },
    {
      id: "2",
      title: "Tutors",
      details:
        "Our tutors are available everyday a week, view your timetable to make an appointment.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      id: "3",
      title: "Opening hours",
      details: "Visit us at our medical for a free consulting at office hours.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full text-gray-600 mt-4">
      <div className="grid sm:grid-cols-3 justify-items-center gap-8 text-center overflow-auto">
        {features.map((feat) => {
          return (
            <div
              key={feat.id}
              className="max-w-xs border-2 border-gray-200 px-2 py-4 rounded-lg"
            >
              <div className="flex justify-center items-center">
                <div className="text-primary w-8 h-8 mb-3">{feat.icon}</div>
              </div>

              <h2 className="title-font font-medium text-xl text-gray-700">
                {feat.title}
              </h2>
              <p className="mt-2">{feat.details}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureCard;
