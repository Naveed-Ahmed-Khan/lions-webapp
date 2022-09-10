import React from "react";
import Spinner from "../../../components/UI/loader/Spinner";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Subjects() {
  const API = `${process.env.NEXT_PUBLIC_API}/get-classes`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  console.log(data);

  const header = [{ id: 1, name: "Name", value: "name" }];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h1 className="text-primary-light text-4xl font-medium tracking-wide">
        Classes
      </h1>
      <section className="mt-8">
        {isLoading ? <Spinner md /> : <Table header={header} body={data} />}
      </section>
    </div>
  );
}
