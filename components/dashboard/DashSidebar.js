import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Backdrop from "../UI/Backdrop";

const DashSidebar = ({ open, setOpen, setShowBackdrop, showBackdrop }) => {
  const { currentUser, logout } = useAuth();

  console.log(currentUser);
  const user = currentUser?.admin;
  // console.log(currentUser);
  // const location = useLocation();
  /*const { logout } = useAuth(); */
  const router = useRouter();

  const navigation = [
    { name: "Home", path: "/dashboard/admin/" },
    { name: "Jobs", path: "/dashboard/admin/jobs" },
    { name: "Applications", path: "/dashboard/admin/applications" },
    { name: "Pending", path: "/dashboard/admin/pending" },
    { name: "Payments", path: "/dashboard/admin/payments" },
    { name: "Tutors", path: "/dashboard/admin/tutors" },
    { name: "Students", path: "/dashboard/admin/students" },
    { name: "Achievements", path: "/dashboard/admin/achievements" },
    { name: "Areas", path: "/dashboard/admin/areas" },
    { name: "Subjects", path: "/dashboard/admin/subjects" },
    { name: "Tutor Classes", path: "/dashboard/admin/tutor-classes" },
    { name: "Student Classes", path: "/dashboard/admin/student-classes" },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed flex flex-col z-[200] w-full max-w-fit bg-white
        ${open === true
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
          } transition ease-out duration-300`}
      >
        <nav className="bg-primary-200 px-5 w-[260px] h-screen justify-between">
          <div className="mt-6 mb-10 flex flex-col">
            <button
              className="self-end"
              onClick={() => {
                setShowBackdrop(false);
                setOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            </button>

            {/* {currentUser && (
              <div className="my-2 flex flex-col items-center gap-4">
                <Image
                  width={70}
                  height={70}
                  layout="fixed"
                  className="rounded-full object-cover"
                  src={currentUser?.admin?.profilePic}
                  alt="Profile"
                />
                <p className=" text-white">{currentUser?.admin?.name}</p>
              </div>
            )} */}

            <div className="mt-4">
              <p className="p-3 text-gray-200 text-xs tracking-widest border-b border-b-gray-300">
                MENU
              </p>
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const { name, path } = item;
                  return (
                    <li key={name}>
                      <Link href={path}>
                        <a
                          onClick={() => {
                            setShowBackdrop(false);
                            setOpen(false);
                            name === "Logout" && logout();
                          }}
                        >
                          <div
                            className={`px-3 py-[14px] ${router.pathname === path
                              ? "text-white bg-primary-light"
                              : "text-gray-700"
                              } rounded flex items-center gap-3 hover:text-white hover:bg-primary-light transition-all duration-150`}
                          >
                            <p className="text-base">{name}</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Backdrop
        showBackdrop={showBackdrop}
        onClick={() => {
          setOpen(false);
          setShowBackdrop(false);
        }}
      />
      {/* Mobile Sidebar */}

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:z-40 fixed top-0 bg-white border-r border-r-gray-300">
        <div className="hidden sm:flex sm:flex-col sm:gap-12 sm:text-3xl sm:min-h-full sm:max-w-72">
          <div className="w-full max-w-[280px]">
            <nav className="w-[17rem] p-5 h-screen overflow-auto justify-between flex flex-col">
              <div className="mt-6 mb-10 flex flex-col">
                {currentUser && (
                  <div className="my-2 flex flex-col items-center gap-4">
                    <Image
                      width={70}
                      height={70}
                      layout="fixed"
                      className="rounded-full object-cover"
                      src={currentUser?.profilePic}
                      alt="Profile"
                    />
                    <p className=" text-gray-700">{currentUser?.name}</p>
                  </div>
                )}

                <div className="mt-4">
                  <p className="mb-4 p-3 text-gray-800 text-xs tracking-widest border-b border-b-gray-300">
                    MENU
                  </p>
                  <ul className="space-y-1">
                    {navigation.map((item) => {
                      const { name, path } = item;
                      return (
                        <li key={name}>
                          <Link href={path}>
                            <a
                              onClick={() => {
                                setShowBackdrop(false);
                                setOpen(false);
                                name === "Logout" && logout();
                              }}
                            >
                              <div
                                className={`px-3 py-[14px] ${router.pathname === path
                                  ? "text-white bg-primary-light"
                                  : "text-gray-700"
                                  } rounded flex items-center gap-3 hover:text-white hover:bg-primary-light transition-all duration-150`}
                              >
                                <p className="text-base">{name}</p>
                              </div>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashSidebar;
