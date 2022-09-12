/* eslint-disable @next/next/no-img-element */

import Container from "../components/UI/Container";

import TutorCard2 from "../components/UI/cards/TutorCard2";
import { useStateContext } from "../contexts/StateContext";
import JobFilters from "../components/UI/filters/JobFilters";
import TutorFilters from "../components/UI/filters/TutorFilters";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/loader/Spinner";

export async function getStaticProps({ query }) {
  console.log({ query });

  const tutors = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-tutors`, {
    params: query,
  });
  const areas = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-areas`);
  const cities = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-cities`);

  return {
    props: {
      tutors: tutors.data,
      areas: areas.data,
      cities: cities.data,
    },
    revalidate: 30,
  };
}

export default function Tutors({ tutors, areas, cities }) {
  const router = useRouter();
  const [filteredTutors, setFilteredTutors] = useState(tutors || []);
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <>
      <Container color={"gray-100"}>
        {/* <Spinner md /> */}
        <Alert />
        <section className="lg:flex p-5">
          <div
            className="block lg:hidden fixed z-40 top-20 right-2 bg-white p-2 rounded-full shadow-lg"
            onClick={() => {
              if (openFilter) {
                setOpenFilter(false);
              } else {
                setOpenFilter(true);
                window.scrollTo(0, 0);
              }
            }}
          >
            {openFilter ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            )}
          </div>
          {openFilter && (
            <div className="block lg:hidden px-0 sm:px-10 lg:px-0 lg:pr-6 mb-8">
              <TutorFilters
                allCities={cities}
                allAreas={areas}
                setFilteredTutors={setFilteredTutors}
                setOpenFilter={setOpenFilter}
              />
            </div>
          )}
          <div className="hidden lg:block px-0 sm:px-10 lg:px-0 lg:pr-6 mb-8">
            <TutorFilters
              allCities={cities}
              allAreas={areas}
              setFilteredTutors={setFilteredTutors}
            />
          </div>
          <div className="w-full lg:h-[calc(100vh-110px)] lg:overflow-auto mx-auto space-y-8 ">
            <div className="space-y-4">
              <h1 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                Find the best tutor
              </h1>
              <p className="">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p>
            </div>
            <div className="space-y-8 lg:pr-3 w-full">
              {filteredTutors?.length > 0 ? (
                <>
                  {filteredTutors?.map((tutor) => {
                    return <TutorCard2 key={tutor._id} tutor={tutor} />;
                  })}
                </>
              ) : (
                <div className="relative h-[calc(100vh-360px)] w-60">
                  <Image
                    layout={"fill"}
                    className="object-contain"
                    src={"/images/not-found.png"}
                    alt={""}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
