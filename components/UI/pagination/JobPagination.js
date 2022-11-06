import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function JobPagination({ setFilteredJobs, pageData }) {
  const { limit, totalDocs, totalPages, previousPage, currentPage, nextPage } =
    pageData;
  const router = useRouter();
  console.log(router.query);

  const [selectedPage, setSelectedPage] = useState(currentPage);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [pageData]);

  const getJobs = async (selectedPage) => {
    const tutors = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/get-paginatedjobs`,
      { params: { ...router.query, page: selectedPage } }
    );
    setFilteredJobs(tutors.data.jobs);
    router.push(
      {
        pathname: "/jobs",
        query: { ...router.query, page: selectedPage },
      },
      undefined
    );
  };

  return (
    <div className="px-4 py-2 w-full flex items-center justify-center bg-white rounded-md">
      {/*  <div className="flex items-center py-2 text-gray-700 hover:text-primary cursor-pointer">
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
      </div> */}
      <div className="sm:flex space-x-2 hidden">
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
                getJobs(page);
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
      {/* <div className="flex items-center py-2 text-gray-700 hover:text-primary cursor-pointer">
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
      </div> */}
    </div>
  );
}
