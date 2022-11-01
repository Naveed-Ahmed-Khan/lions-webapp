import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormGroup from "../../../../components/UI/FormGroup";
import Input from "../../../../components/UI/Input";
import Spinner from "../../../../components/UI/loader/Spinner";
import Select from "../../../../components/UI/Select";
import Table from "../../../../components/UI/tables/Table";
import useFetch from "../../../../hooks/useFetch";

export default function Payments() {
  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API}/get-applications`;
  const GET_API = `${process.env.NEXT_PUBLIC_API}/get-payments`;
  const { data, isLoading } = useFetch(API, true);
  const {
    data: payments,
    isLoading: payLoading,
    isError,
    updateData: updatePay,
  } = useFetch(GET_API, true);
  console.log(payments);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState(data);

  const viewTutorDetails = (data) => {
    router.push(
      `/dashboard/admin/applications/applicant/${data.applicant_id._id}`
    );
  };

  const viewJobDetails = (data) => {
    router.push(`/dashboard/admin/applications/job/${data.job_id._id}`);
  };

  const updatePayment = async (data) => {
    console.log(data);
    const UPDATE_API = `${process.env.NEXT_PUBLIC_API}/update-payment/${data._id}`;
    try {
      let res;
      if (data.isPaid) {
        res = await axios.patch(UPDATE_API, {
          isPaid: false,
        });
      } else {
        res = await axios.patch(UPDATE_API, {
          isPaid: true,
        });
      }

      console.log(res);
      if (res.status === 200) {
        updatePay();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const header = [
    {
      id: 1,
      name: "JobID",
      value: "app_id",
      nestedValue: "job_id",
      deepNested: "_id",
    },
    {
      id: 2,
      name: "Applicant",
      value: "app_id",
      nestedValue: "applicant_id",
      deepNested: "_id",
    },
    {
      id: 3,
      name: "Applicant",
      value: "app_id",
      nestedValue: "applicant_id",
      deepNested: "name",
    },
    { id: 4, name: "Amount", value: "earned" },
    { id: 5, name: "Charges", value: "charges" },
    // { id: 2, name: "Amount", value: "earned" },
    // { id: 5, name: "Job Title", value: "job_id", nestedValue: "title" },
    // { id: 2, name: "City", value: "applicant_id", nestedValue: "city" },
    // { id: 3, name: "Phone", value: "applicant_id", nestedValue: "mobile" },
    // { id: 4, name: "WatsApp", value: "applicant_id", nestedValue: "watsapp" },
    /* { id: 6, name: "Class", value: "job_id", nestedValue: "class" },
    { id: 7, name: "Subjects", value: "job_id", nestedValue: "subjects" }, */
    // { id: 8, name: "Location", value: "job_id", nestedValue: "location" },
    // { id: 9, name: "Budget", value: "expectedBudget" },
  ];

  const actions = [
    {
      id: 1,
      name: "Action",
      value: "Pay",
      onClick: updatePayment,
    },
  ];

  const status = [
    {
      id: 1,
      name: "paid",
      value: "isPaid",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-rose-500",
    },
  ];

  useEffect(() => {
    if (filter === "Assigned") {
      setApplications(data.filter((app) => app.isSelected === true));
    }
    if (filter === "Shortlisted") {
      setApplications(data.filter((app) => app.isShortlisted === true));
    }
    if (filter === "Rejected") {
      setApplications(data.filter((app) => app.isRejected === true));
    }
    if (filter === "All") {
      setApplications(data);
    }
  }, [filter, data]);

  useEffect(() => {
    const { jobid } = router.query;
    if (router.query) {
      setSearch(jobid);
      setApplications(data?.filter((app) => app.job_id._id === jobid));
    }
  }, []);

  useEffect(() => {
    if (search) {
      setApplications(
        applications.filter(
          (app) =>
            app.job_id._id.includes(search) ||
            app.applicant_id.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (filter !== "All" && !search) {
      if (filter === "Assigned") {
        setApplications(data.filter((app) => app.isSelected === true));
      }
      if (filter === "Shortlisted") {
        setApplications(data.filter((app) => app.isShortlisted === true));
      }
      if (filter === "Rejected") {
        setApplications(data.filter((app) => app.isRejected === true));
      }
    }

    if (filter === "All" && !search) {
      setApplications(data);
    }
  }, [search]);

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h2 className="text-primary-light text-4xl font-medium tracking-wide">
        Applications
      </h2>
      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <>
            {/* <FormGroup horizontal>
              <div className="relative">
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
                  className="group absolute py-[.95rem]  px-1 sm:px-2 right-0 top-7 sm:top-8 bg-white"
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
              <Select
                label="Application Status"
                name="filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="All">All</option>
                <option value="Assigned">Assigned</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </FormGroup> */}
            <div className="mt-6">
              <Table
                header={header}
                body={payments}
                status={status}
                actions={actions}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
