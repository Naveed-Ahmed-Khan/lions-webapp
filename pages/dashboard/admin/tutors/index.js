import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormGroup from "../../../../components/UI/FormGroup";
import Spinner from "../../../../components/UI/loader/Spinner";
import Select from "../../../../components/UI/Select";
import Table from "../../../../components/UI/tables/Table";
import useFetch from "../../../../hooks/useFetch";

export default function Tutors() {
  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API}/get-tutors`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);
  const [filter, setFilter] = useState("All");
  const [tutors, setTutors] = useState(data);
  // console.log(tutors);

  const viewDetails = (data) => {
    router.push(`/dashboard/admin/tutors/${data._id}`);
  };

  const blacklistTutor = async (data) => {
    const BLACKLIST_API = `${process.env.NEXT_PUBLIC_API}/blacklist-tutor/${data._id}`;
    try {
      const res = await axios.get(BLACKLIST_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyTutor = async (data) => {
    const VERIFY_API = `${process.env.NEXT_PUBLIC_API}/verify-tutor/${data._id}`;
    try {
      const res = await axios.get(VERIFY_API);
      console.log(res);
      if (res.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const header = [
    { id: 1, name: "Name", value: "name" },
    { id: 2, name: "E-mail", value: "email" },
    { id: 3, name: "Phone", value: "mobile" },
    { id: 4, name: "WatsApp", value: "watsapp" },
    { id: 5, name: "City", value: "city" },
  ];

  const actions = [
    {
      id: 1,
      name: "Action",
      value: "Blacklist",
      onClick: blacklistTutor,
    },
    {
      id: 2,
      name: "Action",
      value: "Verify",
      onClick: verifyTutor,
    },
    {
      id: 3,
      name: "Action",
      value: "Details",
      onClick: viewDetails,
    },
  ];

  const status = [
    {
      id: 1,
      name: "verified",
      value: "isVerified",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-neutral-500",
    },
    {
      id: 2,
      name: "blacklisted",
      value: "isBlacklisted",
      colorTrue: "bg-rose-500",
      colorFalse: "bg-emerald-500",
    },
  ];

  useEffect(() => {
    if (filter === "Verified") {
      setTutors(data.filter((tutor) => tutor.isVerified === true));
    }
    if (filter === "Blacklisted") {
      setTutors(data.filter((tutor) => tutor.isBlacklisted === true));
    }
    if (filter === "All") {
      setTutors(data);
    }
  }, [filter, data]);

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h1 className="text-primary-light text-4xl font-medium tracking-wide">
        Tutors
      </h1>
      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <div>
            <FormGroup>
              <Select
                label="Tutor Status"
                name="filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="All">All</option>
                <option value="Verified">Verified</option>
                <option value="Blacklisted">Blacklisted</option>
              </Select>
            </FormGroup>
            <Table
              header={header}
              body={tutors}
              actions={actions}
              status={status}
            />
          </div>
        )}
      </section>
    </div>
  );
}
