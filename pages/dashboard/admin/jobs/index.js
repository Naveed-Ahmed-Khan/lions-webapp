import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Anchor from "../../../../components/UI/Anchor";
import Input from "../../../../components/UI/Input";
import Spinner from "../../../../components/UI/loader/Spinner";
import Table from "../../../../components/UI/tables/Table";
import useFetch from "../../../../hooks/useFetch";

export default function Jobs() {
  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API}/get-jobs`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);
  const [jobs, setJobs] = useState(data)
  const [search, setSearch] = useState("")

  const viewJobDetails = (data) => {
    router.push(`/dashboard/admin/jobs/${data._id}`);
  };

  const viewApplicants = (data) => {
    router.push({
      pathname: `/dashboard/admin/applications`,
      query: {
        jobid: data._id,
      },
    });
  };

  const changeStatus = async (data) => {
    const STATUS_API = `${process.env.NEXT_PUBLIC_API}/change-jobstatus/${data._id}`;
    try {
      const res = await axios.get(STATUS_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const featureJob = async (data) => {
    const FEATURE_API = `${process.env.NEXT_PUBLIC_API}/feature-job/${data._id}`;
    try {
      const res = await axios.get(FEATURE_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const header = [
    { id: 9, name: "Title", value: "title" },
    { id: 1, name: "Class", value: "class" },
    { id: 2, name: "Subjects", value: "subjects" },
    { id: 4, name: "Budget", value: "budget" },
    { id: 5, name: "Name", value: "user_id", nestedValue: "name" },
    // { id: 6, name: "Address", value: "user_id", nestedValue: "address" },
    // { id: 7, name: "Phone", value: "user_id", nestedValue: "mobile" },
    // { id: 8, name: "WatsApp", value: "user_id", nestedValue: "watsapp" },
    // { id: 3, name: "City", value: "user_id", nestedValue: "city" },
  ];

  const actions = [
    {
      id: 1,
      name: "Action",
      value: "Status",
      onClick: changeStatus,
    },
    {
      id: 2,
      name: "Action",
      value: "Feature",
      onClick: featureJob,
    },
    {
      id: 3,
      name: "Details",
      value: "Job",
      onClick: viewJobDetails,
    },
    {
      id: 4,
      name: "View",
      value: "Applicants",
      onClick: viewApplicants,
    },
  ];

  const status = [
    {
      id: 1,
      name: "open",
      value: "isOpen",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-rose-500",
    },
    {
      id: 2,
      name: "featured",
      value: "isFeatured",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-neutral-500",
    },
  ];

  useEffect(() => {
    if (search) {
      setJobs(
        jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(search.toLowerCase())
          // ||
          // String(job.class).includes(search)
        )
      );
    } else {
      setJobs(data)
    }
  }, [search, data]);

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-primary-light text-4xl font-medium tracking-wide">
          Jobs
        </h2>
        <Anchor button href={"/dashboard/admin/jobs/add-job"}>
          Add Job
        </Anchor>
      </div>
      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <>
            <div className="mb-6 w-1/2 relative">
              <Input
                required
                label="Search"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="group absolute py-[.90rem]  px-1 sm:px-2 right-0 top-7 sm:top-8 bg-white"
                onClick={() => {
                  setSearch("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 opacity-60 group-hover:opacity-100 text-red-500 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Table
              header={header}
              body={data}
              actions={actions}
              status={status}
            />
          </>
        )}
      </section>
    </div>
  );
}
