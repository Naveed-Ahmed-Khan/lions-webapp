import React from "react";
import JobCard2 from "../../components/UI/cards/JobCard2";
import Container from "../../components/UI/Container";
import Filter from "../../components/UI/Filter";

export default function index() {
  return (
    <>
      <Container color={"gray-100"}>
        <section className="lg:flex p-6 ">
          <div className="px-0 sm:px-10 lg:px-0 lg:pr-6 mb-8">
            <Filter />
          </div>
          <div className="w-full lg:h-[89vh] lg:overflow-auto p-0 mx-auto space-y-8 sm:p-10 lg:p-0">
            <div className="space-y-4">
              <h1 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Best Jobs for You
              </h1>
              <p className="max-w-2xl">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p>
            </div>
            <div className="space-y-8 w-full">
              <JobCard2 />
              <JobCard2 />
              <JobCard2 />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
