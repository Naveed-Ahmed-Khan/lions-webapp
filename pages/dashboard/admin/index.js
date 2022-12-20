import React from "react";

export default function Dashboard() {
  const headers = [];
  const data = [];
  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h2 className="text-primary-light text-4xl font-medium tracking-wide">
        Welcome
      </h2>
      <section className="mt-8">
        {/* <Table headers={headers} data={data} /> */}
      </section>
    </div>
  );
}
