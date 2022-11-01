import React from "react";
import Spinner from "../../../components/UI/loader/Spinner";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Achievements() {
  const API = `${process.env.NEXT_PUBLIC_API}/get-achievements`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);

  const header = [
    { id: 1, name: "Image", value: "image", image: true },
    { id: 2, name: "Title", value: "title" },
    { id: 3, name: "Description", value: "desc" },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h2 className="text-primary-light text-4xl font-medium tracking-wide">
        Achievements
      </h2>
      <section className="mt-8">
        {isLoading ? <Spinner md /> : <Table header={header} body={data} />}
      </section>
    </div>
  );
}
