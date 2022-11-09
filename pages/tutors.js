/* eslint-disable @next/next/no-img-element */

import Container from "../components/UI/Container";

import TutorCard2 from "../components/UI/cards/TutorCard2";
import { useStateContext } from "../contexts/StateContext";
import JobFilters from "../components/UI/filters/JobFilters";
import TutorFilters from "../components/UI/filters/TutorFilters";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/loader/Spinner";
import useFetch from "../hooks/useFetch";
import TutorPagination from "../components/UI/pagination/TutorPagination";

export async function getServerSideProps({ query }) {
  console.log(query);

  const tutors = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-paginatedtutors`,
    {
      params: query,
    }
  );
  const areas = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-areas`);
  const subjects = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-subjects`
  );
  const cities = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-allcities`
  );
  const classes = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-tutor-classes`
  );

  return {
    props: {
      tutors: tutors.data.tutors,
      pageData: tutors.data.pageData,
      areas: areas.data,
      cities: cities.data,
      classes: classes.data,
      subjects: subjects.data,
    },
  };
}

export default function Tutors({
  pageData,
  tutors,
  subjects,
  classes,
  areas,
  cities,
}) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState(pageData.currentPage);
  const [queryParams, setQueryParams] = useState(router.query);

  // const PICS_API = `${process.env.NEXT_PUBLIC_API}/get-tutors-pics/?page=${selectedPage}`;
  /* const {
    data: profilePics,
    isLoading: picsLoading,
    updateData: updatePics,
  } = useFetch(PICS_API, false, { ...queryParams, page: selectedPage });
  console.log(profilePics);
  useEffect(() => {
    setTutorPics(profilePics);
  }, [profilePics]); */

  // const [tutorPics, setTutorPics] = useState(profilePics || []);
  const [filteredTutors, setFilteredTutors] = useState(tutors || []);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(classes);

  return (
    <>
      <Container color={"gray-100"}>
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
                allClasses={classes}
                allSubjects={subjects}
                setQueryParams={setQueryParams}
                // updatePics={updatePics}
                setSelectedPage={setSelectedPage}
                allCities={cities}
                allAreas={areas}
                setIsLoading={setIsLoading}
                setFilteredTutors={setFilteredTutors}
                setOpenFilter={setOpenFilter}
              />
            </div>
          )}
          <div className="hidden lg:block px-0 sm:px-10 lg:px-0 lg:pr-6 mb-8">
            <TutorFilters
              allClasses={classes}
              allSubjects={subjects}
              setQueryParams={setQueryParams}
              // updatePics={updatePics}
              setSelectedPage={setSelectedPage}
              allCities={cities}
              allAreas={areas}
              setIsLoading={setIsLoading}
              setFilteredTutors={setFilteredTutors}
            />
          </div>
          <div>
            <div className="w-full lg:h-[calc(100vh-160px)] lg:overflow-auto mx-auto space-y-8 ">
              <div className="space-y-4">
                <h2 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                  Find the best tutor
                </h2>
                {/* <p className="">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p> */}
              </div>
              {isLoading ? (
                <div>
                  <Spinner md />
                </div>
              ) : (
                <div className="space-y-8 lg:pr-3 w-full">
                  {filteredTutors?.length > 0 ? (
                    <>
                      {filteredTutors?.map((tutor) => {
                        /* const tutorPic = tutorPics?.filter(
                          (pic) => pic._id === tutor._id
                        )[0]; */
                        return (
                          <TutorCard2
                            key={tutor._id}
                            tutor={tutor}
                            profilePic={""}
                          />
                        );
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
              )}
            </div>
            <div className="pt-2 text-center">
              <TutorPagination
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                pageData={pageData}
                setFilteredTutors={setFilteredTutors}
              />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
