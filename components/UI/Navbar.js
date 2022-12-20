
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Notification from "./Notification";

const Navbar = ({ open, setOpen, setShowBackdrop }) => {
  const { currentUser, logout, checkAuth } = useAuth();
  const router = useRouter();
  const user = getCookie("user");
  // console.log(currentUser);
  // const [state, setState] = useState(false);
  // console.log(open);
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Post a Job", path: "/job-posting" },
    { title: "Tution Jobs", path: "/jobs" },
    { title: "Tutors", path: "/tutors" },
  ];
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-br from-green-700 via-green-600 to-green-700 drop-shadow-md">
      <nav className="hidden md:flex mx-auto max-w-screen-xl items-center px-3 py-3 sm:px-3 sm:py-2 md:space-x-6">
        <Link href="/">
          <a className="flex items-center gap-3">
            <div className="bg-white rounded-full h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center">
              <img
                className="object-contain h-12 sm:h-14"
                src={"/e.png"}
                alt="Float UI logo"
              />
            </div>
            <h2 className="text-white text-2xl font-semibold">Educationists</h2>
          </a>
        </Link>
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
          {/* {console.log(currentUser?.notifications)} */}

          {currentUser && user !== "admin" && (
            <Notification notifications={currentUser?.notifications}>
              <button className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Notification>
          )}

          {currentUser ? (
            <li className="flex items-center gap-2">
              <Dropdown
                options={
                  user === "tutor"
                    ? [
                      { title: "My Profile", href: "/profile" },
                      { title: "Edit Profile", href: "/edit-profile" },
                      { title: "Jobs Applied", href: "/applied-jobs" },
                    ]
                    : user === "admin"
                      ? [{ title: "Admin Panel", href: "/dashboard/admin" }]
                      : [{ title: "My Jobs", href: "/my-jobs" }]
                }
              >
                <div className="flex items-center">
                  {currentUser.profilePic ? (
                    <Image
                      width={44}
                      height={44}
                      layout="fixed"
                      className="rounded-full object-cover"
                      src={currentUser?.profilePic}
                      alt="Profile"
                    />
                  ) : (
                    <Image
                      width={44}
                      height={44}
                      layout="fixed"
                      className="rounded-full object-cover object-bottom"
                      src={"/images/profile.webp"}
                      alt="Profile"
                    />
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-white text-sm font-medium">
                    {currentUser?.name.split(" ")[0]}
                  </p>
                </div>
              </Dropdown>
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

      {/* Mobile Navbar */}
      <nav className="flex md:hidden justify-between px-3 py-3">
        <div className="flex items-center gap-2">
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
                className="h-7 w-7"
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
        {currentUser && user !== "admin" ? (
          <div className="flex items-center gap-3">
            <Notification notifications={currentUser?.notifications}>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Notification>
            <div className="flex items-center gap-2">
              <Dropdown
                options={
                  user === "tutor"
                    ? [
                      { title: "My Profile", href: "/profile" },
                      { title: "Edit Profile", href: "/edit-profile" },
                      { title: "Jobs Applied", href: "/applied-jobs" },
                    ]
                    : user === "admin"
                      ? [{ title: "Admin Panel", href: "/dashboard/admin" }]
                      : [{ title: "My Jobs", href: "/my-jobs" }]
                }
              >
                <div className="flex items-center">
                  {currentUser.profilePic ? (
                    <Image
                      width={40}
                      height={40}
                      layout="fixed"
                      className="rounded-full object-cover"
                      src={currentUser?.profilePic}
                      alt="Profile"
                    />
                  ) : (
                    <Image
                      width={44}
                      height={44}
                      layout="fixed"
                      className="rounded-full object-cover object-bottom"
                      src={"/images/profile.webp"}
                      alt="Profile"
                    />
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-white text-sm font-medium">
                    {currentUser?.name.split(" ")[0]}
                  </p>
                </div>
              </Dropdown>
            </div>
          </div>
        ) : (
          <Link href="/">
            <a>
              <h2 className="text-white text-xl font-semibold">
                Educationists
              </h2>
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
