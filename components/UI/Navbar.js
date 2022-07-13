import Link from "next/link";
import React, { useState } from "react";
import logo from "../../assets/images/lion-logo.png";

const Navbar = () => {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Post a Job", path: "/job-posting" },
    { title: "Tution Jobs", path: "/jobs" },
    { title: "Tutors", path: "/tutors" },
  ];
  return (
    <header className="bg-primary drop-shadow-md shadow shadow-slate-300">
      <nav className="container mx-auto max-w-screen-xl items-center p-5 sm:px-3 sm:py-2 md:flex md:space-x-6">
        <div className="flex justify-between">
          <a href="#">
            <img
              className="object-contain"
              height={50}
              width={140}
              src={"https://lions.edu.pk/front/assets/images/lion-logo.png"}
              alt="Float UI logo"
            />
          </a>

          <button
            className="text-gray-500 outline-none md:hidden"
            onClick={() => setState(!state)}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex-1 items-center justify-between mt-12 md:flex md:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          <li className="order-2 pb-5 md:pb-0 space-x-4">
            <a
              href="javascript:void(0)"
              className="p-1 font-medium mr-4 border-b-2 text-white  border-b-primary text-center transition-all duration-300
                 hover:border-b-2 hover:border-gray-600 hover:text-gray-600 focus:shadow-none block md:inline"
            >
              Sign In
            </a>
            <a
              href="javascript:void(0)"
              className="py-3 px-6 rounded-md shadow-md text-white text-center bg-gray-700 focus:shadow-none block md:inline"
            >
              Register
            </a>
          </li>
          <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-2 md:space-y-0">
            {navigation.map((item, idx) => (
              <Link key={item.title} href={item.path}>
                <a
                  className="font-medium text-base text-white py-1 px-3 rounded border-2 border-primary 
                        hover:border-white transition-all duration-300 active:bg-primary-dark"
                >
                  <li>{item.title}</li>
                </a>
              </Link>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
