/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Collapse from "../../components/UI/Collapse";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";

export async function getServerSideProps(context) {
  const { userId } = context.params;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-user/${userId}`
  );
  // console.log(response);

  return {
    props: {
      tutor: response.data,
    },
  };
}

export default function Profile({ tutor }) {
  console.log(tutor);
  // console.log(userId);
  return (
    <Container color={"white"}>
      <div className="flex flex-col">
        <header
          className="h-[25vh] bg-no-repeat bg-cover bg-white"
          style={{
            backgroundImage: "/images/flag.jpg",
          }}
        >
          <img
            className="h-full w-full object-cover"
            src="/images/flag.png"
            alt=""
          />
        </header>
        <div className="pl-0 md:w-full md:max-w-[360px] -mt-20  flex flex-col items-center justify-center ">
          <div className="relative h-40 w-40">
            <Image
              layout="fill"
              className="object-cover object-center rounded-full"
              src={tutor.profilePic}
              alt={""}
            />
          </div>

          <h2 className="mt-4 text-gray-800 text-2xl font-bold">
            {tutor.name}
          </h2>
        </div>
      </div>
      {/* Mobile Collapse */}
      <div className="block md:hidden pt-8 bg-white md:bg-neutral-100 rounded px-5 sm:p-8">
        <h2 className=" mb-8 text-primary text-xl font-semibold">My Profile</h2>
        <div className="flex flex-col gap-6 md:gap-8">
          <Collapse label="About me">{tutor.aboutMe}</Collapse>
          <Collapse label="Achievements">{tutor.achievements}</Collapse>
        </div>
      </div>
      <main className="p-6 md:flex gap-6 bg-white ">
        <div className="w-full md:w-[420px]">
          <ProfileSidebar tutor={tutor} />
        </div>
        <section className="-mt-8 md:-mt-[8.5rem] w-full flex flex-col gap-10 ">
          <div className="hidden md:block mt-8 bg-white md:bg-neutral-100 rounded sm:p-8">
            <h2 className=" mb-8 text-primary text-xl font-semibold">
              My Profile
            </h2>

            {/* Desktop Collapse */}
            <div className="hidden md:flex flex-col gap-6 md:gap-8">
              <Collapse label="About me">{tutor.aboutMe}</Collapse>
              <Collapse label="Achievements">{tutor.achievements}</Collapse>
            </div>
          </div>

          <div className="mt-20 md:mt-0 bg-white md:bg-neutral-100 rounded md:p-8">
            <div className="mb-8 md:flex items-center justify-between">
              <h2 className="text-primary-dark text-xl font-semibold">
                Feedbacks
              </h2>
              <div className="flex mt-2 item-center">
                <svg
                  className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>

                <svg
                  className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>

                <svg
                  className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>

                <svg
                  className="w-5 h-5 text-gray-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>

                <svg
                  className="w-5 h-5 text-gray-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <p className="ml-1 -mt-0.5 text-gray-600">(25)</p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className=" flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8">
                <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                  Awais
                </h3>
                <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Tempore aut numquam voluptatem eveniet velit doloribus
                  quisquam autem rem cupiditate possimus!
                  {/* <span className="text-primary text-end text-sm cursor-pointer">
                    Read More
                  </span> */}
                </p>
              </div>
              <div className=" flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-3 px-4 md:px-8">
                <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                  Awais
                </h3>
                <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Tempore aut numquam voluptatem eveniet velit doloribus
                  quisquam autem rem cupiditate possimus!
                  {/* <span className="text-primary text-end text-sm cursor-pointer">
                    Read More
                  </span> */}
                </p>
              </div>
              <div className=" flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-3 px-4 md:px-8">
                <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                  Awais
                </h3>
                <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Tempore aut numquam voluptatem eveniet velit doloribus
                  quisquam autem rem cupiditate possimus!
                  {/* <span className="text-primary text-end text-sm cursor-pointer">
                    Read More
                  </span> */}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
