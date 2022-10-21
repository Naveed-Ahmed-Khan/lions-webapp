import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormGroup from "../../../../components/UI/FormGroup";
import Input from "../../../../components/UI/Input";
import Spinner from "../../../../components/UI/loader/Spinner";
import Select from "../../../../components/UI/Select";
import Table from "../../../../components/UI/tables/Table";
import useFetch from "../../../../hooks/useFetch";

export default function Tutors() {
  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API}/get-tutorswithout-pics`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
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

  const featureTutor = async (data) => {
    const FEATURE_API = `${process.env.NEXT_PUBLIC_API}/feature-tutor/${data._id}`;
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

  const verifyTutor = async (data) => {
    const VERIFY_API = `${process.env.NEXT_PUBLIC_API}/verify-tutor/${data._id}`;
    const NOTIFY_API = `${process.env.NEXT_PUBLIC_API}/add-notification`;
    try {
      const res = await axios.get(VERIFY_API);
      const resMsg = await axios.post(NOTIFY_API, {
        tutor_id: data._id,
        type: "Success",
        title: "Profile Verified!",
        msg: "You can now start applying on Jobs. GoodLuck!",
      });
      console.log(res);
      if (res.status === 200 && resMsg.status === 200) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const header = [
    { id: 6, name: "Tutor Id", value: "_id" },
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
      value: "Feature",
      onClick: featureTutor,
    },
    {
      id: 2,
      name: "Action",
      value: "Blacklist",
      onClick: blacklistTutor,
    },
    {
      id: 3,
      name: "Action",
      value: "Verify",
      onClick: verifyTutor,
    },
    {
      id: 4,
      name: "Action",
      value: "Details",
      onClick: viewDetails,
    },
  ];

  const status = [
    {
      id: 1,
      name: "featured",
      value: "isFeatured",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-neutral-500",
    },
    {
      id: 2,
      name: "verified",
      value: "isVerified",
      colorTrue: "bg-emerald-500",
      colorFalse: "bg-neutral-500",
    },
    {
      id: 3,
      name: "blacklisted",
      value: "isBlacklisted",
      colorTrue: "bg-rose-500",
      colorFalse: "bg-emerald-500",
    },
  ];

  useEffect(() => {
    if (search) {
      setTutors(
        tutors.filter(
          (tutor) =>
            tutor._id.includes(search) ||
            tutor.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (filter !== "All" && !search) {
      if (filter === "Featured") {
        setTutors(data.filter((tutor) => tutor.isFeatured === true));
      }
      if (filter === "Verified") {
        setTutors(data.filter((tutor) => tutor.isVerified === true));
      }
      if (filter === "Blacklisted") {
        setTutors(data.filter((tutor) => tutor.isBlacklisted === true));
      }
    }

    if (filter === "All" && !search) {
      setTutors(data);
    }
  }, [search]);

  useEffect(() => {
    if (filter === "All") {
      setTutors(data);
    }
    if (filter === "Featured") {
      setTutors(data.filter((tutor) => tutor.isFeatured === true));
    }
    if (filter === "Verified") {
      setTutors(data.filter((tutor) => tutor.isVerified === true));
    }
    if (filter === "Blacklisted") {
      setTutors(data.filter((tutor) => tutor.isBlacklisted === true));
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
          <>
            <FormGroup horizontal>
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
                label="Tutor Status"
                name="filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="All">All</option>
                <option value="Featured">Featured</option>
                <option value="Verified">Verified</option>
                <option value="Blacklisted">Blacklisted</option>
              </Select>
            </FormGroup>
            <div className="mt-6">
              <Table
                header={header}
                body={tutors}
                actions={actions}
                status={status}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
