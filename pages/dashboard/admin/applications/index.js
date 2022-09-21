import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormGroup from "../../../../components/UI/FormGroup";
import Spinner from "../../../../components/UI/loader/Spinner";
import Select from "../../../../components/UI/Select";
import Table from "../../../../components/UI/tables/Table";
import useFetch from "../../../../hooks/useFetch";

export default function Applications() {
  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API}/get-applications`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);
  const [filter, setFilter] = useState("All");
  const [applications, setApplications] = useState(data);

  const viewTutorDetails = (data) => {
    router.push(
      `/dashboard/admin/applications/applicant/${data.applicant_id._id}`
    );
  };
  const viewJobDetails = (data) => {
    router.push(`/dashboard/admin/applications/job/${data.job_id._id}`);
  };
  const selectApplication = async (data) => {
    const SELECT_API = `${process.env.NEXT_PUBLIC_API}/select-application/${data._id}`;
    try {
      const res = await axios.get(SELECT_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rejectApplication = async (data) => {
    const REJECT_API = `${process.env.NEXT_PUBLIC_API}/reject-application/${data._id}`;
    try {
      const res = await axios.get(REJECT_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const shortlistApplication = async (data) => {
    const SHORTLIST_API = `${process.env.NEXT_PUBLIC_API}/shortlist-application/${data._id}`;
    try {
      const res = await axios.get(SHORTLIST_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const header = [
    { id: 1, name: "Applicant", value: "applicant_id", nestedValue: "name" },
    // { id: 2, name: "City", value: "applicant_id", nestedValue: "city" },
    // { id: 3, name: "Phone", value: "applicant_id", nestedValue: "mobile" },
    { id: 4, name: "WatsApp", value: "applicant_id", nestedValue: "watsapp" },
    { id: 5, name: "Job Title", value: "job_id", nestedValue: "title" },
    { id: 6, name: "Class", value: "job_id", nestedValue: "class" },
    { id: 7, name: "Subjects", value: "job_id", nestedValue: "subjects" },
    // { id: 8, name: "Location", value: "job_id", nestedValue: "location" },
    { id: 9, name: "Budget", value: "expectedBudget" },
  ];

  const actions = [
    {
      id: 1,
      name: "Action",
      value: "Assign",
      onClick: selectApplication,
    },
    {
      id: 2,
      name: "Action",
      value: "Shortlist",
      onClick: shortlistApplication,
    },
    {
      id: 3,
      name: "Action",
      value: "Reject",
      onClick: rejectApplication,
    },
    /* {
      id: 3,
      name: "Details",
      value: "Tutor",
      onClick: viewTutorDetails,
    }, */
    {
      id: 4,
      name: "Details",
      value: "Job",
      onClick: viewJobDetails,
    },
  ];

  const status = [
    {
      id: 1,
      name: "assigned",
      value: "isSelected",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-neutral-500",
    },
    {
      id: 2,
      name: "shortlisted",
      value: "isShortlisted",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-neutral-500",
    },
    {
      id: 3,
      name: "rejected",
      value: "isRejected",
      colorTrue: "bg-rose-500",
      colorFalse: "bg-emerald-500",
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

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h1 className="text-primary-light text-4xl font-medium tracking-wide">
        Applications
      </h1>
      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <>
            <FormGroup>
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
            </FormGroup>
            <Table
              header={header}
              body={applications}
              status={status}
              actions={actions}
            />
          </>
        )}
      </section>
    </div>
  );
}
