/* eslint-disable @next/next/no-img-element */
import Button from "../components/UI/Button";
import Card from "../components/UI/cards/TutorCard";
import JobCard from "../components/UI/cards/JobCard";
import FeatureCard from "../components/UI/cards/FeatureCard";
import Container from "../components/UI/Container";
import Carousel from "../components/UI/Carousel";
import { useStateContext } from "../contexts/StateContext";

export default function Home() {
  const { tutors, jobs } = useStateContext();

  const images = [
    {
      src: "https://lions.edu.pk/images/users/21655733138.jpg",
      title: "Cadets",
      details: "Secured Admission in cadet college",
    },
    {
      src: "https://lions.edu.pk/images/users/551655733090.jpeg",
      title: "Hammad Safi",
      details: "Trainer O/A level",
    },
  ];

  return (
    <>
      <Container color={"white"}>
        <section className="grid grid-cols-12 grid-rows-2 gap-4 bg-white p-4 md:px-8">
          <div className="z-0 col-span-12 lg:col-span-9 row-span-2 lg:row-span-1">
            <Carousel />
          </div>
          <div
            className="hidden col-span-12 lg:col-span-3 row-span-1 lg:row-span-2 lg:h-[860px] 
          relative w-full lg:flex lg:flex-col gap-4 overflow-y-auto"
          >
            <h2 className="text-2xl text-primary text-center font-bold">
              News
            </h2>
            {images.map((image) => {
              return (
                <div
                  key={image.src}
                  className="mt-2 mx-4 px-2 py-4 rounded drop-shadow-sm bg-white"
                >
                  <img
                    className="rounded-sm object-cover object-center dark:bg-gray-500"
                    src={image.src}
                    alt=""
                  />
                  <div>
                    <h4 className="text-lg text-gray-700 font-medium">
                      {image.title}
                    </h4>
                    <p className="text-sm text-gray-700">{image.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-span-12 lg:col-span-9 row-span-2 lg:row-span-1 space-y-4 lg:text-center">
            <FeatureCard />
          </div>
        </section>
      </Container>

      <Container color={"gray-100"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="container p-4 mx-auto space-y-16 sm:p-10">
            <div className="space-y-4">
              <h1 className="text-primary text-2xl leading-none font-bold sm:text-4xl">
                Find the best tutor
              </h1>
              <p className="max-w-2xl dark:text-gray-800">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
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
      </Container>

      <Container color={"white"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="container p-4 mx-auto space-y-16 sm:p-10">
            <div className="space-y-4">
              <h1 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Best Tution Jobs
              </h1>
              <p className="max-w-2xl dark:text-gray-800">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
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
                <h1 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                  Post Your Requirements
                </h1>
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
