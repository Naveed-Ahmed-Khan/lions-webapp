/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Dropdown from "./Dropdown";

const Navbar = ({ open, setOpen, setShowBackdrop }) => {
  const { currentUser, logout } = useAuth();
  // console.log(currentUser);
  // const [state, setState] = useState(false);
  console.log(open);
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Post a Job", path: "/job-posting" },
    { title: "Tution Jobs", path: "/jobs" },
    { title: "Tutors", path: "/tutors" },
  ];
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-br from-green-700 via-green-600 to-green-700 drop-shadow-md">
      <nav className="container mx-auto max-w-screen-xl items-center px-3 py-3 sm:px-3 sm:py-2 md:flex md:space-x-6">
        <div className="flex justify-between">
          <Link href="/">
            <a>
              <img
                className="object-contain h-10 sm:h-12"
                src={"https://lions.edu.pk/front/assets/images/lion-logo.png"}
                alt="Float UI logo"
              />
            </a>
          </Link>
          <button
            className="text-white outline-none md:hidden"
            onClick={() => {
              setOpen(true);
              setShowBackdrop(true);
            }}
          >
            {!open && (
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
          className={`flex-1 hidden md:flex items-center justify-between mt-12 md:mt-0`}
        >
          <li className="flex-1 justify-center items-center space-y-5 md:flex md:space-x-2 md:space-y-0">
            {navigation.map((item) => (
              <Link key={item.title} href={item.path}>
                <a
                  className="font-medium text-base text-white py-1 px-3 rounded border-2 border-transparent 
                        hover:border-white transition-all duration-300 active:bg-primary-dark"
                >
                  <p>{item.title}</p>
                </a>
              </Link>
            ))}
          </li>
          {currentUser ? (
            <li className="flex items-center gap-2">
              <Dropdown
                options={
                  currentUser.userType === "tutor"
                    ? [
                        { title: "My Profile", href: "/profile" },
                        { title: "Logout", href: "/" },
                      ]
                    : [
                        // { title: "My Profile", href: "/profile" },
                        { title: "Logout", href: "/" },
                      ]
                }
              >
                <Image
                  width={45}
                  height={45}
                  layout="fixed"
                  className="rounded-full object-cover"
                  src={currentUser.profilePic}
                  alt="Profile"
                />
              </Dropdown>
              <p>
                <span className="font-medium text-white">
                  {currentUser?.name}
                </span>
              </p>
              {/* <Link href={"/"}>
                <a
                  className="p-1 font-medium mr-4 border-b-2 text-white border-b-transparent text-center transition-all duration-300
                hover:border-b-2 hover:border-gray-600 hover:text-gray-600 focus:shadow-none block md:inline"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </Link> */}
            </li>
          ) : (
            <li className="pb-5 md:pb-0 space-x-4">
              <Link href={"/login"}>
                <a
                  className="p-1 font-medium mr-4 border-b-2 text-white border-b-transparent text-center transition-all duration-300
                hover:border-b-2 hover:border-gray-600 hover:text-gray-600 focus:shadow-none block md:inline"
                >
                  Sign In
                </a>
              </Link>

              <Link href={"/register"}>
                <a className="py-3 px-6 rounded-md shadow-md text-white text-center bg-gray-700 focus:shadow-none block md:inline">
                  Register
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
