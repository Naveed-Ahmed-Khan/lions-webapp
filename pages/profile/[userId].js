/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Collapse from "../../components/UI/Collapse";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";
import Button from "../../components/UI/Button";
import {
  Collapsable,
  Gallery,
  Simple,
} from "../../components/EditProfile/EditSections";
import Rating from "../../components/UI/Rating";
import { idToDate } from "../../utility/idToDate";

export async function getStaticPaths() {
  const users = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-tutors`);

  return {
    paths: users.data.map((user) => ({
      params: { userId: user._id },
    })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { userId } = params;

  const tutor = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-user/${userId}`
  );
  const application = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-myapplications/${userId}`
  );

  return {
    props: {
      tutor: tutor.data,
      applications: application.data,
    },
    revalidate: 30,
  };
}

export default function Profile({ tutor, applications }) {
  console.log(applications);
  // console.log(userId);
  return (
    <Container color={"gray-50"}>
      <div className="relative flex flex-col bg-white">
        <header className="relative h-[35vh]">
          <Image
            layout="fill"
            objectFit="cover"
            src={tutor.bannerImage}
            alt=""
          />
        </header>

        <div className="pl-0 md:w-full md:max-w-[360px] -mt-20  flex flex-col items-center justify-center ">
          <div className="relative h-40 w-40 rounded-full overflow-clip">
            <Image
              layout="fill"
              objectFit="cover"
              src={tutor.profilePic}
              alt=""
            />
          </div>

          <h2 className="mt-4 text-gray-800 text-2xl font-bold">
            {tutor.name}
          </h2>
        </div>
      </div>
      {/* Mobile Collapse */}
      <div className="block md:hidden pt-8 bg-white md:bg-neutral-100 rounded px-5 sm:p-8">
        <h3 className=" text-primary text-2xl font-medium">My Profile</h3>
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
              <h3 className=" text-gray-700 text-2xl font-medium">
                My Profile
              </h3>
              <Collapse label="About me">{tutor.aboutMe}</Collapse>
              <Collapse label="Achievements">{tutor.achievements}</Collapse>
            </div>
          </div>

          {tutor.sections.map((section) => {
            return (
              <div
                key={section._id}
                className="p-8 flex flex-col gap-6 md:gap-8 bg-gray-100"
              >
                {section.type === "Simple" && <Simple section={section} />}
                {section.type === "Gallery" && <Gallery section={section} />}
                {section.type === "Collapsable" && (
                  <Collapsable section={section} />
                )}
              </div>
            );
          })}

          <section className="mt-20 md:mt-0 bg-white md:bg-neutral-100 rounded md:p-8">
            <div className="mb-8 md:flex items-center justify-between">
              <h2 className="text-primary-dark text-xl font-semibold">
                Feedbacks
              </h2>
            </div>
            <div className="space-y-6">
              {applications.map((application) => {
                const {
                  feedback: { rating, comment },
                  job_id: {
                    user_id: { name, profilePic },
                  },
                } = application;

                return (
                  <div key={application._id}>
                    {comment && (
                      <div className="flex flex-col gap-8">
                        <div className=" flex flex-col gap-4 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8">
                          <div className="flex gap-4 items-center">
                            <Image
                              height={50}
                              width={50}
                              objectFit={"cover"}
                              className="rounded-full"
                              src={profilePic}
                              alt={""}
                            />
                            <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                              {name}
                            </h3>
                          </div>
                          <Rating isEditable={false} rating={rating} />
                          <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                            {comment}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </main>
    </Container>
  );
}
