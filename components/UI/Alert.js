import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Alert() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      {currentUser?.userType === "tutor" &&
        currentUser?.profileStatus === "incomplete" && (
          <section className="pt-4">
            <div className="items-center w-full mx-auto px-5 md:px-8 max-w-screen-xl">
              <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex ml-3">
                    <h3 className="text-sm font-medium text-yellow-600">
                      Profile Incomplete
                    </h3>
                    <div className="ml-3 text-sm text-yellow-600">
                      <p>
                        Incomplete profile is not visible to the users. Complete
                        your profile here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
    </>
  );
}