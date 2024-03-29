import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const DashNavbar = ({ open, setOpen, setShowBackdrop }) => {
  const { currentUser, logout, checkAuth } = useAuth();
  const router = useRouter();
  // console.log(currentUser);
  // const [state, setState] = useState(false);
  // console.log(open);
  const navigation = [
    { title: "Home", path: "/" },
    // { title: "Logout", path: "/" },
    /* { title: "Post a Job", path: "/job-posting" },
    { title: "Tution Jobs", path: "/jobs" },
    { title: "Tutors", path: "/tutors" }, */
  ];
  return (
    <header className="sticky z-30 bg-white border-b border-b-gray-300">
      <nav className="p-5 ">
        <ul className={` `}>
          <li className="flex justify-between items-center space-x-2">
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
                  className="h-6 w-6 text-gray-800"
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
