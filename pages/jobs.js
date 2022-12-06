import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Alert from "../components/UI/Alert";
import JobCard2 from "../components/UI/cards/JobCard2";
import Container from "../components/UI/Container";
import JobFilters from "../components/UI/filters/JobFilters";
import JobPagination from "../components/UI/pagination/JobPagination";

export async function getServerSideProps({ query }) {
  console.log(query);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-paginatedjobs`,
    {
      params: query,
    }
  );
  const areas = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-areas`);
  const cities = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-allcities`
  );
  const classes = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-student-classes`
  );
  const tutorclasses = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-student-classes`
  );

  return {
    props: {
      jobs: response.data.jobs,
      pageData: response.data.pageData,
      applications: response.data.applications,
      areas: areas.data,
      cities: cities.data,
      classes: classes.data,
    },
  };
}

export default function Jobs({ pageData, jobs, applications, areas, classes, cities }) {
  const router = useRouter()
  const [filteredJobs, setFilteredJobs] = useState(jobs || []);
  const [openFilter, setOpenFilter] = useState(false);
  console.log(filteredJobs);
  const getJobs = async (event) => {
    const tutors = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/get-paginatedjobs`,
      { params: { ...router.query, page: event.selected } }
    );
    setFilteredJobs(tutors.data.jobs);
    router.push(
      {
        pathname: "/jobs",
        query: { ...router.query, page: event.selected },
      },
      undefined
    );
  };

  return (
    <>
      <Container color={"gray-100"}>
        <section className="relative lg:flex p-5">
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
              <JobFilters
                applications={applications}
                allAreas={areas}
                allCities={cities}
                setFilteredJobs={setFilteredJobs}
                setOpenFilter={setOpenFilter}
              />
            </div>
          )}
          <div className="hidden lg:block px-0 sm:px-10 lg:px-0 lg:pr-6 mb-8">
            <JobFilters
              applications={applications}
              allAreas={areas}
              allCities={cities}
              setFilteredJobs={setFilteredJobs}
            />
          </div>
          <div className="flex flex-col h-fit">
            <div className="w-full lg:h-[calc(100vh-160px)] lg:overflow-auto mx-auto space-y-8">
              <div className="space-y-4">
                <h2 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
                  Best Jobs for You
                </h2>
                {/* <p className="">
                At a assumenda quas cum earum ut itaque commodi saepe rem
                aspernatur quam natus quis nihil quod, hic explicabo doloribus
                magnam neque, exercitationem eius sunt!
              </p> */}
              </div>
              <div className="space-y-8 lg:pr-3 w-full flex flex-col items-center justify-center">
                {filteredJobs?.length > 0 ? (
                  <>
                    {filteredJobs?.map((job) => {
                      return <JobCard2 applications={applications} key={job._id} job={job} />;
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
            <div className="pt-2 text-center">
              <ReactPaginate
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                breakLabel="..."
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageData?.totalPages}
                onPageChange={getJobs}
                containerClassName={"px-2 md:px-4 py-2 w-full flex gap-4 items-center justify-between md:justify-center bg-white rounded-md text-gray-700"}
                pageLinkClassName={" px-3 border-b-2 border-b-transparent hover:border-primary"}
                previousLinkClassName={"whitespace-nowrap border-b-2 border-b-transparent hover:border-primary"}
                nextLinkClassName={"whitespace-nowrap border-b-2 border-b-transparent hover:border-primary"}
                disabledLinkClassName={"opacity-70 border-b-2 border-b-transparent"}
                activeClassName={"border-b-2 border-primary"}
              />
              {/* <JobPagination
                pageData={pageData}
                setFilteredJobs={setFilteredJobs}
              /> */}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}