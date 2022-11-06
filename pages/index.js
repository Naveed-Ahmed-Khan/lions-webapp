/* eslint-disable @next/next/no-img-element */
import Button from "../components/UI/Button";
import Card from "../components/UI/cards/TutorCard";
import JobCard from "../components/UI/cards/JobCard";
import FeatureCard from "../components/UI/cards/FeatureCard";
import Container from "../components/UI/Container";
import Carousel from "../components/UI/Carousel";
import { useStateContext } from "../contexts/StateContext";
import axios from "axios";
import Alert from "../components/UI/Alert";
import Image from "next/image";
import Anchor from "../components/UI/Anchor";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export async function getStaticProps() {
  /* const tutors = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-featured-tutors`
  ); */
  const jobs = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-featured-jobs`
  );
  const achievements = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-achievements`
  );

  return {
    props: {
      // tutors: tutors.data,
      jobs: jobs.data,
      achievements: achievements.data,
    },
    revalidate: 30,
  };
}

export default function Home({ tutors, jobs, achievements }) {
  const { currentUser } = useAuth();
  const features = [
    { id: "1", name: "Affordable Fee" },
    { id: "2", name: "Free Consultation" },
    { id: "3", name: "O/A Level Expert Tutors" },
    { id: "4", name: "Quality Education" },
  ];
  return (
    <>
      <Container color={"white"}>
        <section className="min-h-[calc(100vh-65px)] flex flex-col bg-white pt-5 px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="sm:p-4 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-4 text-center w-full sm:mb-6">
                <div className="space-y-4">
                  <h1 className=" text-primary text-3xl lg:text-5xl font-bold">
                    The Educationists
                  </h1>
                </div>
                <p className="sm:px-5 mx-auto text-sm sm:text-base text-gray-600">
                  Educationists is an educational consultancy which provides
                  Cambridge and Oxford experts professionals for one-to-one
                  tuition, online or in person.
                </p>
                <div className="z-0 block lg:hidden">
                  <Carousel achievements={achievements} />
                </div>
                <p className="sm:px-5 mx-auto text-sm sm:text-base text-gray-600">
                  We are with an excellent track record of trust,
                  professionalism and quality of education services provided in
                  all of Pakistan.
                </p>

                <div className="sm:flex items-center justify-center sm:space-x-6">
                  <div className="mb-4 sm:mb-0">
                    <Anchor button href={`/tutors`}>
                      Find Tutors Now
                    </Anchor>
                  </div>
                  <Anchor buttonAlt href={`/job-posting`}>
                    Post a Job
                  </Anchor>
                </div>
              </div>
              {/* <div className="w-full grid grid-cols-2 gap-4">
                {features.map((feat) => {
                  return (
                    <div key={feat.id} className="flex gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7 text-primary"
                      >
                        <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                      </svg>
                      <p className="text-gray-600 text-base text-medium">
                        {feat.name}
                      </p>
                    </div>
                  );
                })}
              </div> */}
              {/* <div className="relative w-full flex gap-4 overflow-auto">
                <h2 className="text-2xl text-primary text-center font-bold">
                  News
                </h2>
                {achievements
                  .filter((image) => image.type === "news")
                  .map((image) => {
                    return (
                      <div
                        key={image._id}
                        className=" mt-2 mx-4 px-2 py-4 drop-shadow-sm bg-white"
                      >
                        <div className="relative h-44 rounded overflow-clip">
                          <Image
                            layout="fill"
                            objectFit="contain"
                            src={image.image}
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 className="text-lg text-gray-700 font-medium">
                            {image.title}
                          </h4>
                          <p className="text-sm text-gray-700">{image.desc}</p>
                        </div>
                      </div>
                    );
                  })}
              </div> */}
            </div>
            <div className="z-0 hidden lg:block">
              <Carousel achievements={achievements} />
            </div>
          </div>
          <div className="w-full flex-1 flex items-center justify-center">
            <FeatureCard />
          </div>
        </section>
      </Container>

      {/* <Container color={"gray-100"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="container p-5 mx-auto space-y-16">
            <div className="space-y-4">
              <h2 className="text-primary text-2xl leading-none font-bold sm:text-4xl">
                Find the best tutor
              </h2>
              <p className=" text-gray-700">
                Our alumni are excelling in multiple fields ,holding key
                positions in different departments and organizations. We also
                have the profiles of Army Officers, board toppers, doctors and
                engineers as our alumni No.1 Home Tutor network.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {tutors?.map((tutor) => {
                return (
                  tutor.isFeatured && <Card key={tutor._id} tutor={tutor} />
                );
              })}
            </div>
          </div>
        </section>
      </Container> */}

      <Container color={"white"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="container p-5 mx-auto space-y-16 ">
            <div className="space-y-4">
              <h2 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Best Tution Jobs
              </h2>
              <p className="text-gray-700">
                Find jobs that best suit you, with respect to your avilability
                and ease of travel or teach at the comfort of your home.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {jobs?.map((job) => {
                return job.isFeatured && <JobCard key={job._id} job={job} />;
              })}
            </div>
          </div>
        </section>
      </Container>

      {/* <Container color={"gray-100"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <section className="text-gray-800 bg-gray-100 body-font relative">
            <div className="container p-4 mx-auto space-y-16 sm:p-10">
              <div className="space-y-4">
                < h2 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                  Post Your Requirements
                </h2>
                <p className="max-w-2xl dark:text-gray-800">
                  At a assumenda quas cum earum ut itaque commodi saepe rem
                  aspernatur quam natus quis nihil quod, hic explicabo doloribus
                  magnam neque, exercitationem eius sunt!
                </p>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-100 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-800"
                      >
                        I am a:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-100 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-100 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-100 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Requirement
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full bg-white bg-opacity-40 rounded border border-gray-700 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary h-32 text-base outline-none text-gray-800 py-1 px-3 resize-none leading-6 transition-colors duration-100 ease-in-out"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-center p-2 w-full ">
                    <Button>Submit</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </Container> */}
    </>
  );
}
