/* eslint-disable @next/next/no-img-element */

import Container from "../components/UI/Container";
import Filter from "../components/UI/Filter";
import TutorCard2 from "../components/UI/cards/TutorCard2";
import { useStateContext } from "../contexts/StateContext";

export default function Tutors() {
  const { tutors } = useStateContext();
  return (
    <>
      <Container color={"gray-100"}>
        <section className="lg:flex p-5">
          <div className=" lg:pr-6 mb-8">
            <Filter />
          </div>
          <div className="w-full lg:h-[89vh] lg:overflow-auto mx-auto space-y-8 ">
            <div className="space-y-4">
              <h1 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Find the best tutor
              </h1>
              <p className="max-w-2xl">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p>
            </div>
            <div className="w-full space-y-8">
              {tutors?.map((tutor) => {
                return <TutorCard2 tutor={tutor} />;
              })}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
