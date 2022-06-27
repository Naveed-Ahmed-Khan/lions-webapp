/* eslint-disable @next/next/no-img-element */

import Container from "../../components/UI/Container";
import Filter from "../../components/UI/Filter";
import TutorCard2 from "../../components/UI/cards/TutorCard2";

export default function Tutors() {
  return (
    <>
      <Container color={"gray-100"}>
        <section className="lg:flex py-6 dark:bg-gray-800 dark:text-gray-800">
          <div className="px-4 sm:px-10 lg:px-0 mb-8">
            <Filter />
          </div>
          <div className="md:container p-4 mx-auto space-y-16 sm:p-10">
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
            <div className="space-y-8">
              <TutorCard2 />
              <TutorCard2 />
              <TutorCard2 />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
