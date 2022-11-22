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

/* export async function getStaticPaths() {
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
} */

export async function getServerSideProps({ params }) {
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
  };
}

export default function Profile({ tutor, applications }) {
  const router = useRouter();
  // console.log(applications);
  // console.log(userId);
  /* if (router.isFallback) {
    return (
      <div className=" text-3xl text-primary font-medium">
        Page will be available after 30 seconds!
      </div>
    );
  } */

  return (
    <Container color={"gray-50"}>
      <div className="relative flex flex-col bg-white">
        <header className="relative h-[35vh]">
          <Image
            priority
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
              src={tutor?.profilePic || "/images/profile.webp"}
              alt=""
            />
          </div>
          <div className="mt-4 flex items-end gap-2">
            <h2 className="text-gray-700 text-2xl sm:text-3xl font-medium">
              {tutor?.name}
            </h2>
            {tutor?.isVerified && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 sm:w-8 sm:h-8 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
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
            </div>q
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
                    {application?.feedback?.comment && (
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

      <script type="application/ld+json">
        {{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": `${tutor?.name}`,
          "image": "https://www.educationist.org.pk/",
          "description": "We are providing  the most professional, trusted, reliable and affordable tutors. |Dr. Babar  📞 +923328200082 | No1 Home tutoring network",
          "brand": {
            "@type": "Brand",
            "name": "Educationist"
          },
          "sku": "251122",
          "offers": {
            "@type": "Offer",
            "url": "https://www.educationist.org.pk/",
            "priceCurrency": "PKR",
            "price": "15000",
            "priceValidUntil": "2022-12-16",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "1",
            "reviewCount": "1"
          },
          "review": {
            "@type": "Review",
            "name": "Tutoring",
            "reviewBody": "We are providing  the most professional, trusted, reliable and affordable tutors. |Dr. Babar  📞 +923328200082 | No1 Home tutoring Network",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            },
            "datePublished": "2022-11-16",
            "author": { "@type": "Person", "name": "Admin" },
            "publisher": { "@type": "Organization", "name": "Educationist" }
          }
        }}
      </script>
    </Container>
  );
}
