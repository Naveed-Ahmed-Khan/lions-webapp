/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "../UI/Dropdown";
import { useAuth } from "../../contexts/AuthContext";

const DashNavbar = ({ open, setOpen, setShowBackdrop }) => {
  const { currentUser, logout, checkAuth } = useAuth();
  const router = useRouter();
  // console.log(currentUser);
  // const [state, setState] = useState(false);
  // console.log(open);
  const navigation = [
    { title: "Home", path: "/" },
    /* { title: "Post a Job", path: "/job-posting" },
    { title: "Tution Jobs", path: "/jobs" },
    { title: "Tutors", path: "/tutors" }, */
  ];
  return (
    <header className="sticky z-30 bg-white border-b border-b-gray-300">
      <nav className="p-5 ">
        <ul className={` `}>
          <li className="flex justify-end items-center space-x-2">
            {navigation.map((item) => (
              <Link key={item.title} href={item.path}>
                <a
                  className="font-medium text-base text-gray-700 py-1 px-3 rounded border-2 border-transparent 
                        hover:border-white transition-all duration-300 active:bg-primary-dark"
                >
                  <p>{item.title}</p>
                </a>
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashNavbar;
