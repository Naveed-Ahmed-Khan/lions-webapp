/* eslint-disable @next/next/no-img-element */
import Button from "../components/UI/Button";
import Card from "../components/UI/cards/TutorCard";
import JobCard from "../components/UI/cards/JobCard";
import FeatureCard from "../components/UI/cards/FeatureCard";
import Container from "../components/UI/Container";
import Carousel from "../components/UI/Carousel";

export default function Home() {
  return (
    <>
      <Container color={"white"}>
        <section className="grid grid-cols-12 grid-rows-2 gap-4 bg-white p-4 md:px-8">
          <div className="col-span-12 sm:col-span-9 row-span-2 sm:row-span-1">
            <Carousel />
          </div>
          <div className="hidden h-[790px] sm:col-span-3 sm:row-span-2 relative w-full sm:flex flex-col gap-4 mt-4 overflow-y-scroll">
            <img
              className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500"
              src="https://source.unsplash.com/random/241x361/?1"
              alt="Image 1"
            />
            <img
              className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500"
              src="https://source.unsplash.com/random/241x361/?2"
              alt="Image 2"
            />
            <img
              className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500"
              src="https://source.unsplash.com/random/241x361/?3"
              alt="Image 3"
            />
            <img
              className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500"
              src="https://source.unsplash.com/random/241x361/?4"
              alt="Image 4"
            />
            <img
              className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500"
              src="https://source.unsplash.com/random/241x361/?3"
              alt="Image 3"
            />
            <img
              className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500"
              src="https://source.unsplash.com/random/241x361/?3"
              alt="Image 3"
            />
          </div>
          <div className="col-span-12 sm:col-span-9 row-span-2 sm:row-span-1 space-y-4 sm:text-center lg:text-left">
            <FeatureCard />
          </div>
        </section>
        <section className="bg-white mx-auto p-4 items-center lg:flex md:px-8"></section>
      </Container>

      <Container color={"gray-100"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="container p-4 mx-auto space-y-16 sm:p-10">
            <div className="space-y-4">
              <h3 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Find the best tutor
              </h3>
              <p className="max-w-2xl dark:text-gray-800">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </section>
      </Container>

      <Container color={"white"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="container p-4 mx-auto space-y-16 sm:p-10">
            <div className="space-y-4">
              <h3 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Best Tution Jobs
              </h3>
              <p className="max-w-2xl dark:text-gray-800">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <JobCard />
              <JobCard />
              <JobCard />
            </div>
          </div>
        </section>
      </Container>

      <Container color={"gray-100"}>
        <section className=" py-6 dark:bg-gray-800 dark:text-gray-800">
          <section className="text-gray-800 bg-gray-100 body-font relative">
            <div className="container p-4 mx-auto space-y-16 sm:p-10">
              <div className="space-y-4">
                <h3 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                  Post Your Requirements
                </h3>
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
      </Container>
    </>
  );
}
