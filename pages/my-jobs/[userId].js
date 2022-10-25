/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Collapse from "../../components/UI/Collapse";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";
import JobCard2 from "../../components/UI/cards/JobCard2";

/* export async function getServerSideProps(context) {
  const { userId } = context.params;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-myjobs/${userId}`
  );
  // console.log(response);

  return {
    props: {
      myJobs: response.data,
    },
  };
} */

export async function getStaticPaths() {
  const students = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-students`
  );

  return {
    paths: students.data.map((user) => ({
      params: { userId: user._id },
    })),
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { userId } = params;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-myjobs/${userId}`
  );
  // console.log(response);

  return {
    props: {
      myJobs: response.data,
    },
    revalidate: 30,
  };
}

export default function MyJobs({ myJobs }) {
  console.log(myJobs);
  // console.log(userId);
  return (
    <Container color={"white"}>
      <section className="relative lg:flex p-5">
        <div className="w-full lg:h-[calc(100vh-110px)] lg:overflow-auto mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
              My jobs
            </h1>
            <p className="">
              All of the jobs posted by you are displayed here.
            </p>
          </div>
          <div className="space-y-8 lg:pr-3 w-full flex flex-col items-center justify-center">
            {myJobs?.map((job) => {
              return <JobCard2 key={job._id} job={job} />;
            })}
          </div>
        </div>
      </section>
    </Container>
  );
}
