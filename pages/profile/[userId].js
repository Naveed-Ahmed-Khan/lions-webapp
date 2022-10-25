import axios from "axios";
import React from "react";
import Image from "next/image";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";
import {
  Collapsable,
  Gallery,
  Simple,
} from "../../components/EditProfile/EditSections";
import Rating from "../../components/UI/Rating";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const users = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-tutorswithout-pics`
  );

  return {
    paths: users.data.map((user) => ({
      params: { userId: user._id },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { userId } = params;

  const tutor = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-tutor/${userId}`
  );
  const application = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-myapplications/${userId}`
  );

  return {
    props: {
      tutor: tutor?.data,
      applications: application.data,
    },
    revalidate: 30,
  };
}

export default function Profile({ tutor, applications }) {
  const router = useRouter();
  // console.log(applications);
  // console.log(userId);
  if (router.isFallback) {
    <div className=" text-3xl text-primary font-medium">
      Page will be available after 30 seconds!
    </div>;
  }

  return (
    <Container color={"gray-50"}>
      <div className="relative flex flex-col bg-white">
        <header className="relative h-[35vh]">
          <Image
            layout="fill"
            objectFit="cover"
            src={tutor?.bannerImage || "/images/flag.png"}
            alt=""
          />
        </header>

        <div className="pl-0 md:w-full md:max-w-[360px] -mt-20  flex flex-col items-center justify-center ">
          <div className="relative h-40 w-40 rounded-full overflow-clip">
            <Image
              layout="fill"
              objectFit="cover"
              src={tutor?.profilePic}
              alt=""
            />
          </div>

          <h2 className="mt-4 text-gray-700 text-2xl sm:text-3xl font-medium">
            {tutor?.name}
          </h2>
        </div>
      </div>

      {/* Mobile Collapse */}

      {/* <div className="block md:hidden pt-8 bg-white md:bg-neutral-100 rounded px-5 sm:p-8">
        <h3 className="mb-6 text-xl sm:text-2xl text-primary font-medium">
          My Profile
        </h3>
        <div className="flex flex-col gap-6 md:gap-8">
          <Collapse label="About me">{tutor?.aboutMe}</Collapse>
          <Collapse label="Achievements">{tutor?.achievements}</Collapse>
        </div>
      </div> */}

      <main className="p-6 md:flex gap-6 bg-white ">
        <div className="w-full md:w-[420px]">
          <ProfileSidebar tutor={tutor} />
          {/* <div className="hidden sm:block my-6">
            <Button fullwidth>Apply Now</Button>
          </div> */}
        </div>

        <section className="w-full flex flex-col gap-10">
          {/* Desktop Collapse */}
          {/* <div className="hidden md:block bg-white md:bg-neutral-100 rounded sm:p-6">
            <div className="hidden md:flex flex-col gap-6 md:gap-8">
              <h3 className="text-xl sm:text-2xl text-primary font-medium">
                My Profile
              </h3>
              <div className="flex flex-col gap-6 md:gap-8">
                <Collapse label="About me">{tutor?.aboutMe}</Collapse>
                <Collapse label="Achievements">{tutor?.achievements}</Collapse>
              </div>
            </div>
          </div> */}
          <div className="mt-6 sm:mt-0 flex flex-col gap-6 md:gap-8">
            {tutor?.sections?.map((section) => {
              return (
                <div key={section._id}>
                  {section.type === "Simple" && <Simple section={section} />}
                  {section.type === "Gallery" && <Gallery section={section} />}
                  {section.type === "Collapsable" && (
                    <Collapsable section={section} />
                  )}
                </div>
              );
            })}
          </div>
          {/*  <div className="block sm:hidden">
            <Button fullwidth>Apply Now</Button>
          </div> */}

          <section className="bg-white md:bg-neutral-100 rounded md:p-8">
            <div className="mb-8 md:flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl text-primary font-medium">
                Feedbacks
              </h2>
            </div>
            <div className="space-y-6">
              {applications?.map((application) => {
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
