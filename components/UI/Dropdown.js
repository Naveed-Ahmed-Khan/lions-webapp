import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

export default function Dropdown({ children, options }) {
  const router = useRouter();
  // const { selectedUserInfo } = useStateContext();
  // console.log(selectedItem);
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div className="relative">
        {/* <!-- Dropdown toggle button --> */}
        <div>{children}</div>

        {/* <!-- Dropdown menu --> */}
        {open && (
          <div
            className="absolute space-y-3 right-0 top-12 p-3 bg-gray-50 text-gray-700
            border border-primary-200 rounded-md shadow-lg drop-shadow-2xl w-44"
          >
            {options.map((option) => {
              return (
                <button
                  key={option.title}
                  className="group w-full flex items-center py-2 hover:bg-gray-200 "
                  onClick={() => {
                    if (option.title === "Profile") {
                      router.push({
                        pathname: "/profile/[userId]",
                        query: { userId: currentUser.userID },
                      });
                    } else {
                    }
                    setOpen(false);
                  }}
                >
                  <div className="mx-2 h-8 w-1 group-hover:bg-primary" />
                  <p className="font-semibold text-gray-600 ">{option.title}</p>
                  {/* <p className="text-sm text-gray-500">
                          {option.message}
                    </p> */}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
