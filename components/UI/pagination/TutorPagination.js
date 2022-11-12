import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function TutorPagination({
  selectedPage,
  setSelectedPage,
  setFilteredTutors,
  pageData,
}) {
  const { limit, totalDocs, totalPages, previousPage, currentPage, nextPage } =
    pageData;
  const router = useRouter();
  console.log(router.query);
  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  const getTutors = async (selectedPage) => {
    const tutors = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/get-paginatedtutors`,
      { params: { ...router.query, page: selectedPage } }
    );
    // console.log(tutors.data.tutors);
    setFilteredTutors(tutors.data.tutors);
    router.push(
      {
        pathname: "/tutors",
        query: { ...router.query, page: selectedPage },
      },
      undefined
    );
  };

  return (
    <div className="px-2 md:px-4 py-2 w-full flex items-center justify-between md:justify-center bg-white rounded-md">
      <button
        className="flex md:hidden items-center py-2 px-2 md:px-0 text-gray-700 hover:text-primary bg-primary bg-opacity-20 rounded-md
        disabled:opacity-70 disabled:hover:text-gray-700 disabled:bg-opacity-0"
        disabled={previousPage ? false : true}
        onClick={() => {
          previousPage && setSelectedPage(previousPage);
          previousPage && getTutors(previousPage);
        }}
      >
        <svg
          width={14}
          height={8}
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.1665 4H12.8332"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.1665 4L4.49984 7.33333"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.1665 4.00002L4.49984 0.666687"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
      </button>
      <div className="md:flex space-x-2 hidden">
        {[...Array(totalPages)].map((btn, idx) => {
          const page = idx + 1;
          return (
            <button
              key={idx}
              className={`p-2 min-w-[1.9rem] text-sm font-medium text-gray-700  leading-none 
            bg-primary hover:bg-opacity-20 hover:text-primary rounded-full outline
            ${
              selectedPage === page
                ? "bg-opacity-20 outline-green-600"
                : "bg-opacity-0 outline-white"
            }`}
              onClick={() => {
                setSelectedPage(page);
                getTutors(page);
                /*  updatePics(
                  `${process.env.NEXT_PUBLIC_API}/get-tutors-pics/?page=${page}`
                ); */
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="block md:hidden">
        <p className="text-gray-600 text-sm">{`Page ${currentPage} of ${totalPages}`}</p>
      </div>
      <button
        className="flex md:hidden items-center py-2 px-2 md:px-0 text-gray-700 hover:text-primary bg-primary bg-opacity-20 rounded-md
        disabled:opacity-70 disabled:hover:text-gray-700 disabled:bg-opacity-0"
        disabled={nextPage ? false : true}
        onClick={() => {
          nextPage && setSelectedPage(nextPage);
          nextPage && getTutors(nextPage);
        }}
      >
        <p className="text-sm font-medium leading-none mr-3">Next</p>
        <svg
          width={14}
          height={8}
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.1665 4H12.8332"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 7.33333L12.8333 4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 0.666687L12.8333 4.00002"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
