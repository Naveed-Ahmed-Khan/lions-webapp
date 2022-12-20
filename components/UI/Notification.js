import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import Alert from "./Alert";
import Spinner from "./loader/Spinner";

export default function Notification({ children }) {
  const { checkAuth, currentUser, logout } = useAuth();
  const API = `${process.env.NEXT_PUBLIC_API}/get-tutor-notifications/${currentUser?._id}`;

  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [length, setLength] = useState(0);

  const demoMsg = {
    type: "success",
    title: "Shortlisted For Demo",
    msg: `You have been selected for a demo`,
  };
  const selectedMsg = {
    type: "success",
    title: "Selected For Job",
    msg: `You have been selected for the job.`,
  };

  const deleteNotification = async (id) => {
    const API = `${process.env.NEXT_PUBLIC_API}/delete-notification/${id}`;
    try {
      await axios.delete(API, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      updateData();
    } catch (error) {
      console.log(error);
    }
  };

  const readAllNotification = async () => {
    const API = `${process.env.NEXT_PUBLIC_API}/read-allnotifications/${currentUser?._id}`;
    try {
      console.log("updating msgs");
      await axios.get(API, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      updateData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkLength = () => {
      console.log("checking length");

      data && setLength(data.filter((item) => !item.isRead).length);
    };
    checkLength();
  });

  return (
    <div
    // onClick={() => {
    //   setOpen(!open);
    // }}
    >
      <div className="relative">
        {/* <!-- Dropdown toggle button --> */}
        <div
          className="flex items-center"
          onClick={() => {
            readAllNotification();
            setOpen(!open);
          }}
        >
          {children}
          {length > 0 && (
            <div className="absolute -top-1 right-2 px-1 text-xs text-white font-semibold rounded-full bg-red-600">
              <div className="font-archivo">{length}</div>
            </div>
          )}
        </div>

        {/* <!-- Dropdown menu --> */}
        {open && (
          <div
            className="absolute space-y-3 right-0 top-8 sm:right-0 sm:top-12 p-3 bg-gray-50 text-gray-700
             rounded-md shadow-lg drop-shadow-2xl min-w-[240px] sm:min-w-[320px]"
          >
            {isLoading && !data ? (
              <Spinner sm />
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    {data.map((item) => {
                      let link = "";
                      if (item.msg.includes("incomplete profile")) {
                        link = `/edit-profile/${item.tutor_id}`;
                      } else if (item.msg.includes("unverified tutor")) {
                        link = `/my-application/${item.job_id}`;
                      } else {
                        link = "";
                      }

                      return (
                        <div key={item._id} className="relative">
                          <Alert type={item.type} title={item.title}>
                            {item.msg} For more details{" "}
                            {link && (
                              <Link href={link}>
                                <a
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                  className="underline"
                                >
                                  click here
                                </a>
                              </Link>
                            )}
                            .
                          </Alert>
                          <button
                            className="absolute top-1 right-1"
                            onClick={() => deleteNotification(item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5 opacity-60 hover:opacity-100"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p className=" text-gray-700 font-medium text-center">
                    No Notifications
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
