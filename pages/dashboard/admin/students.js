import React from "react";
import Spinner from "../../../components/UI/loader/Spinner";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Students() {
  const API = `${process.env.NEXT_PUBLIC_API}/get-students`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);

  const header = [
    { id: 1, name: "Name", value: "name" },
    { id: 2, name: "E-mail", value: "email" },
    { id: 3, name: "City", value: "city" },
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

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h2 className="text-primary-light text-4xl font-medium tracking-wide">
        Students
      </h2>
      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <Table header={header} body={data} status={status} />
        )}
      </section>
    </div>
  );
}
