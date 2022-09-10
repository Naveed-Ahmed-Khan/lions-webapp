import React from "react";
import Spinner from "../../../components/UI/loader/Spinner";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Tutors() {
  const API = `${process.env.NEXT_PUBLIC_API}/get-tutors`;
  const { data: tutors, isLoading, isError, updateData } = useFetch(API, true);
  console.log(tutors);

  const header = [
    { id: 1, name: "Name", value: "name" },
    { id: 2, name: "E-mail", value: "email" },
    { id: 3, name: "Phone", value: "mobile" },
    { id: 4, name: "WatsApp", value: "watsapp" },
    { id: 5, name: "City", value: "city" },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h1 className="text-primary-light text-4xl font-medium tracking-wide">
        Tutors
      </h1>
      <section className="mt-8">
        {isLoading ? <Spinner md /> : <Table header={header} body={tutors} />}
      </section>
    </div>
  );
}
