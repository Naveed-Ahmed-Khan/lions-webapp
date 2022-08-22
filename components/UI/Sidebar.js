import Link from "next/link";
import Image from "next/image";
import BackdropModal from "./BackdropModal";
import { useRouter } from "next/router";
import Backdrop from "./Backdrop";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ open, setOpen, setShowBackdrop, showBackdrop }) => {
  const { currentUser, logout } = useAuth();

  // console.log(currentUser);
  // const location = useLocation();
  /*const { logout } = useAuth(); */
  const router = useRouter();

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed flex flex-col z-[200] w-full max-w-fit 
        bg-gradient-to-br from-green-700 via-green-600 to-green-700
        ${
          open === true
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

            {currentUser && (
              <div className="my-2 flex flex-col items-center gap-4">
                <Image
                  width={70}
                  height={70}
                  layout="fixed"
                  className="rounded-full object-cover"
                  src={currentUser.profilePic}
                  alt="Profile"
                />
                <p className=" text-white">{currentUser.name}</p>
              </div>
            )}

            <div className="mt-4">
              <p className="p-3 text-gray-200 text-xs tracking-widest border-b border-b-gray-300">
                MENU
              </p>
              <ul className="space-y-1">
                <li>
                  <Link href={"/"}>
                    <a
                      onClick={() => {
                        setShowBackdrop(false);
                        setOpen(false);
                      }}
                    >
                      <div
                        className={`px-3 py-[14px] ${
                          router.pathname === "/"
                            ? "text-secondary-300 bg-primary-100"
                            : "text-white"
                        } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                      >
                        <p className="text-lg text-white font-medium">Home</p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/job-posting"}>
                    <a
                      onClick={() => {
                        setShowBackdrop(false);
                        setOpen(false);
                      }}
                    >
                      <div
                        className={`px-3 py-[14px] ${
                          router.pathname === "/job-posting"
                            ? "text-secondary-300 bg-primary-100"
                            : "text-white"
                        } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                      >
                        <p className="text-lg text-white font-medium">
                          Post a Job
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/jobs"}>
                    <a
                      onClick={() => {
                        setShowBackdrop(false);
                        setOpen(false);
                      }}
                    >
                      <div
                        className={`px-3 py-[14px] ${
                          router.pathname === "/jobs"
                            ? "text-secondary-300 bg-primary-100"
                            : "text-white"
                        } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                      >
                        <p className="text-lg text-white font-medium">
                          Tution Jobs
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/tutors"}>
                    <a
                      onClick={() => {
                        setShowBackdrop(false);
                        setOpen(false);
                      }}
                    >
                      <div
                        className={`px-3 py-[14px] ${
                          router.pathname === "/tutors"
                            ? "text-secondary-300 bg-primary-100"
                            : "text-white"
                        } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                      >
                        <p className="text-lg text-white font-medium">Tutors</p>
                      </div>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="p-3 text-gray-200 text-xs tracking-widest border-b border-b-gray-300">
                ACCOUNT
              </p>
              <ul className="space-y-1">
                {currentUser ? (
                  <li>
                    <Link href={"/"}>
                      <a
                        onClick={() => {
                          setShowBackdrop(false);
                          setOpen(false);
                          logout();
                        }}
                      >
                        <div
                          className={`px-3 py-[14px] ${
                            router.pathname === "/register"
                              ? "text-secondary-300 bg-primary-100"
                              : "text-white"
                          } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                        >
                          <p className="text-lg text-white font-medium">
                            Logout
                          </p>
                        </div>
                      </a>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href={"/login"}>
                        <a
                          onClick={() => {
                            setShowBackdrop(false);
                            setOpen(false);
                          }}
                        >
                          <div
                            className={`px-3 py-[14px] ${
                              router.pathname === "/login"
                                ? "text-secondary-300 bg-primary-100"
                                : "text-white"
                            } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                          >
                            <p className="text-lg text-white font-medium">
                              SignIn
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/register"}>
                        <a
                          onClick={() => {
                            setShowBackdrop(false);
                            setOpen(false);
                          }}
                        >
                          <div
                            className={`px-3 py-[14px] ${
                              router.pathname === "/register"
                                ? "text-secondary-300 bg-primary-100"
                                : "text-white"
                            } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                          >
                            <p className="text-lg text-white font-medium">
                              Register
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </>
                )}
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
      {/* <div className="hidden md:block md:z-40 fixed mx-auto bg-primary border-r border-r-primary-100">
        <div className="hidden sm:flex sm:flex-col sm:gap-12 sm:text-3xl sm:min-h-full sm:max-w-72">
          <div className="w-full max-w-[280px]">
            <nav className="w-[17rem] p-5 h-screen justify-between flex flex-col">
              <div className="mt-4 mb-10">
                <Link className="flex items-center justify-center" href={"/"}>
                  <a>
                    <svg
                      width="33"
                      height="35"
                      viewBox="0 0 33 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.4472 34.694H28.6652C27.4312 34.694 26.1961 34.694 24.9651 34.694C24.8891 34.6995 24.813 34.6863 24.7433 34.6557C24.6736 34.625 24.6123 34.5777 24.5651 34.518C21.7911 31.2746 19.0128 28.035 16.2301 24.799C15.8131 24.313 15.4091 23.814 14.9771 23.341C14.8231 23.173 14.8491 23.076 14.9771 22.927C15.8551 21.9137 16.7294 20.897 17.6001 19.877C19.3134 17.877 21.0257 15.877 22.7371 13.877C23.3464 13.1656 23.9554 12.454 24.5641 11.742C24.6061 11.6822 24.662 11.6335 24.7269 11.6001C24.7919 11.5667 24.8641 11.5495 24.9372 11.5501C27.3765 11.5561 29.8158 11.5561 32.2551 11.5501C32.3021 11.5501 32.3491 11.5571 32.4551 11.5661C32.1691 11.9051 31.9152 12.211 31.6552 12.513C29.7165 14.7716 27.7772 17.0303 25.8372 19.289C24.7912 20.508 23.7511 21.733 22.6961 22.944C22.5251 23.144 22.6471 23.244 22.7511 23.363C23.6104 24.367 24.4708 25.3693 25.3322 26.37C27.1542 28.4953 28.9755 30.6214 30.7962 32.7481C31.3222 33.3861 31.8612 34.014 32.4472 34.694Z"
                        fill="white"
                      />
                      <path
                        d="M0 0.00192497H0.350952C2.69095 0.00192497 5.03128 0.00192497 7.37195 0.00192497C7.46836 -0.00585506 7.56529 0.0100233 7.65417 0.0481896C7.74306 0.0863559 7.82121 0.145649 7.88196 0.220919C9.56929 2.20159 11.261 4.17893 12.957 6.15293C14.4237 7.86626 15.8953 9.57763 17.3719 11.287C17.5469 11.487 17.572 11.6019 17.384 11.8199C15.5407 13.9533 13.705 16.0926 11.877 18.2379C10.5623 19.7712 9.24765 21.3045 7.93298 22.8379C7.86184 22.9293 7.76953 23.0022 7.66394 23.0499C7.55835 23.0976 7.4427 23.1189 7.32703 23.1119C5.00603 23.1019 2.68599 23.1059 0.36499 23.1059H0.0129395C0.147223 22.8559 0.321642 22.6296 0.529053 22.4359C3.21839 19.2892 5.91137 16.1452 8.60803 13.0039C8.98003 12.5699 9.34998 12.134 9.72998 11.704C9.82498 11.597 9.84201 11.5299 9.73901 11.4109C8.32968 9.77553 6.92366 8.13759 5.521 6.49692C3.815 4.50625 2.10939 2.51461 0.404053 0.521945C0.243879 0.370026 0.107612 0.19468 0 0.00192497Z"
                        fill="white"
                      />
                    </svg>
                    <div className="ml-3">
                      <h2 className="text-base tracking-tighter">TransferX</h2>
                      <p className="text-white text-xs text-opacity-60">
                        Build for you
                      </p>
                    </div>
                  </a>
                </Link>
                <div className="mt-6 w-full flex items-center px-3 py-4 bg-primary-100 rounded-xl">
                  <div>
                    <p className="text-sm font-medium">Carlos Perderson</p>
                    <p className="text-xs text-white text-opacity-60">Admin</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="mb-3 text-white text-xs text-opacity-60 tracking-widest">
                    MENU
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <Link href={"/quiz"}>
                        <a>
                          <div
                            className={`px-3 py-[14px] ${
                              router.pathname === "/quiz"
                                ? "text-secondary-300 bg-primary-100"
                                : "text-white"
                            } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                          >
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 18 17"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16.5427 3.28248L11.0124 0.570776C9.795 -0.177634 8.2798 -0.190914 7.05021 0.53604L1.45763 3.28248C1.43664 3.2933 1.41488 3.30487 1.39463 3.31721C0.0674424 4.09826 -0.393304 5.83877 0.36556 7.20475C0.622791 7.66782 1.00117 8.04724 1.45763 8.29987L3.00035 9.05635V12.8387C3.00126 14.53 4.07051 16.0242 5.63953 16.5268C6.73142 16.8519 7.8636 17.0111 9.00021 16.9992C10.1366 17.0123 11.2688 16.8545 12.3609 16.5307C13.9299 16.0281 14.9991 14.5338 15.0001 12.8425V9.05479L16.5 8.31684V14.6835C16.5 15.1098 16.8358 15.4554 17.25 15.4554C17.6642 15.4554 18 15.1098 18 14.6835V5.42064C18.005 4.51422 17.3096 3.67687 16.5427 3.28248ZM13.5001 12.8425C13.5004 13.8542 12.8627 14.749 11.9251 15.0525C10.9743 15.3321 9.98899 15.4678 9.00017 15.4554C8.01136 15.4678 7.02606 15.3321 6.07525 15.0525C5.13762 14.749 4.4999 13.8542 4.50029 12.8425V9.79198L6.98798 11.0116C7.6018 11.3868 8.30283 11.5839 9.01669 11.582C9.69618 11.587 10.3642 11.4018 10.9494 11.0463L13.5001 9.79195V12.8425ZM15.9 6.90657L10.2437 9.68543C9.45498 10.1581 8.47741 10.1447 7.70122 9.65069L2.1671 6.9413C1.55022 6.59894 1.31982 5.80671 1.65246 5.17185C1.76495 4.95714 1.93363 4.77915 2.13936 4.65801L7.76045 1.8946C8.54937 1.42299 9.52641 1.43635 10.3029 1.92934L15.8332 4.64104C16.24 4.87348 16.4944 5.31242 16.5 5.79119C16.5007 6.24471 16.2738 6.66646 15.9 6.90657Z" />
                            </svg>

                            <p className="text-sm font-medium">Quiz</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href={"/users"}>
                        <a>
                          <div
                            className={`px-3 py-[14px] ${
                              router.pathname === "/users"
                                ? "text-secondary-300 bg-primary-100"
                                : "text-white"
                            } rounded flex items-center gap-3 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-300`}
                          >
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 13 17"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.375 8.5C7.21557 8.5 8.03726 8.25074 8.73617 7.78375C9.43508 7.31675 9.97982 6.65299 10.3015 5.87641C10.6232 5.09982 10.7073 4.24529 10.5433 3.42087C10.3794 2.59645 9.97458 1.83917 9.3802 1.2448C8.78583 0.650425 8.02855 0.245652 7.20413 0.0816645C6.37971 -0.0823227 5.52518 0.00184146 4.7486 0.323514C3.97201 0.645186 3.30825 1.18992 2.84125 1.88883C2.37426 2.58774 2.125 3.40943 2.125 4.25C2.125 5.37717 2.57277 6.45818 3.3698 7.25521C4.16683 8.05224 5.24783 8.5 6.375 8.5ZM6.375 1.417C6.93531 1.417 7.48305 1.58315 7.94893 1.89445C8.41481 2.20574 8.77793 2.6482 8.99235 3.16586C9.20677 3.68352 9.26288 4.25314 9.15356 4.80269C9.04425 5.35224 8.77444 5.85703 8.37823 6.25324C7.98203 6.64944 7.47724 6.91925 6.92769 7.02857C6.37814 7.13788 5.80852 7.08178 5.29086 6.86735C4.7732 6.65293 4.33074 6.28982 4.01945 5.82393C3.70815 5.35805 3.542 4.81032 3.542 4.25C3.542 3.49864 3.84048 2.77806 4.37177 2.24677C4.90306 1.71548 5.62364 1.417 6.375 1.417Z" />
                              <path d="M6.375 9.91675C4.68481 9.9186 3.06438 10.5908 1.86924 11.786C0.674098 12.9811 0.00185284 14.6016 0 16.2917C0 16.4797 0.0746452 16.6599 0.207515 16.7927C0.340384 16.9256 0.520594 17.0002 0.7085 17.0002C0.896406 17.0002 1.07662 16.9256 1.20949 16.7927C1.34235 16.6599 1.417 16.4797 1.417 16.2917C1.417 15.6406 1.54526 14.9958 1.79444 14.3942C2.04363 13.7926 2.40887 13.246 2.86931 12.7856C3.32975 12.3251 3.87637 11.9599 4.47796 11.7107C5.07956 11.4615 5.72434 11.3332 6.3755 11.3332C7.02666 11.3332 7.67144 11.4615 8.27304 11.7107C8.87463 11.9599 9.42125 12.3251 9.88169 12.7856C10.3421 13.246 10.7074 13.7926 10.9566 14.3942C11.2057 14.9958 11.334 15.6406 11.334 16.2917C11.334 16.4797 11.4086 16.6599 11.5415 16.7927C11.6744 16.9256 11.8546 17.0002 12.0425 17.0002C12.2304 17.0002 12.4106 16.9256 12.5435 16.7927C12.6764 16.6599 12.751 16.4797 12.751 16.2917C12.7491 14.6014 12.0768 12.9808 10.8814 11.7856C9.68605 10.5905 8.06536 9.91834 6.375 9.91675Z" />
                            </svg>
                            <p className="text-sm font-medium">Users</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
