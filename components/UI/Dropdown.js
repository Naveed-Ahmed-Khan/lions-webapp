import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Anchor from "./Anchor";

export default function Dropdown({ children, options }) {
  const router = useRouter();
  // const { selectedUserInfo } = useStateContext();
  // console.log(selectedItem);
  const { checkAuth, currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);

  console.log(router.pathname);
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
             rounded-md shadow-lg drop-shadow-2xl w-44"
          >
            {options.map((option) => {
              return (
                <div
                  key={option.title}
                  className="group p-2 hover:bg-gray-200 border-l-4 border-primary"
                >
                  {/*   <button
                    key={option.title}
                    className="group w-full flex items-center py-2 hover:bg-gray-200 "
                    onClick={() => {
                      if (option.title === "Logout") {
                        router.push("/");
                        logout();
                      } else {
                        router.push({
                          pathname: `${option.href}/[userId]`,
                          query: { userId: currentUser?.userId },
                        });
                      }
                      if (option.title === "My Profile") {
                    } else if (option.title === "My Jobs") {
                      router.push({
                        pathname: "/my-jobs/[userId]",
                        query: { userId: currentUser?.userId },
                      });
                    } else {
                    }
                      setOpen(false);
                    }}
                  >
                    <div className="mx-2 h-8 w-1 bg-primary" />
                    <p className="font-semibold text-gray-600 ">
                      {option.title}
                    </p>
                   
                  </button> */}
                  {option.title === "Admin Panel" ? (
                    <Anchor href={`${option.href}`}>
                      <span className="text-center">{option.title}</span>
                    </Anchor>
                  ) : (
                    <Anchor href={`${option.href}/${currentUser?._id}`}>
                      <span className="text-center">{option.title}</span>
                    </Anchor>
                  )}
                </div>
              );
            })}
            <div className="group p-2 hover:bg-gray-200 border-l-4 border-primary">
              <Anchor onClick={() => logout()} href={`/`}>
                <span className="text-center">logout</span>
              </Anchor>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
