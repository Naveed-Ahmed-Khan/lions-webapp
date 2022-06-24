/* eslint-disable @next/next/no-img-element */
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Carousel from "../../components/UI/Carousel";
import Container from "../../components/UI/Container";
import FeatureCard from "../../components/UI/FeatureCard";
import JobCard from "../../components/UI/JobCard";

export default function Tutors() {
  return (
    <>
      <Container color={"white"}>
        <section className="grid grid-cols-12 grid-rows-2 gap-4 bg-white p-4 md:px-8">
          <div className="col-span-9 row-span-1">
            <Carousel />
          </div>
          <div className="h-[790px] col-span-3 row-span-2 relative w-full flex flex-col gap-4 mt-4 overflow-y-scroll">
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
          <div className="col-span-9 row-span-1 space-y-4 sm:text-center lg:text-left">
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
    </>
  );
}
