import Link from "next/link";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Anchor from "./Anchor";

export default function Alert({ type = "success", title = "title", children }) {
  const { currentUser } = useAuth();
  // console.log(currentUser);

  const finalClass = {
    success: {
      text: `text-emerald-600`,
      border: `border-emerald-600`,
      bg: `bg-emerald-50`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-emerald-600"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      text: `text-yellow-600`,
      border: `border-yellow-600`,
      bg: `bg-yellow-50`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-6 h-6 text-yellow-600`}
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    danger: {
      text: `text-rose-600`,
      border: `border-rose-600`,
      bg: `bg-rose-50`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-rose-600"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  return (
    <section className="">
      <div className="items-center w-full mx-auto max-w-screen-xl">
        <div
          className={`p-2 border-l-4 ${finalClass[type]?.border} ${finalClass[type]?.bg}`}
        >
          <div className="space-y-1">
            <div className="flex justify-between">
              <h3
                className={`text-sm font-semibold tracking-wide ${finalClass[type]?.text}`}
              >
                {title}
              </h3>
              <div className=""></div>
            </div>
            <div className={`text-sm ${finalClass[type]?.text}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
