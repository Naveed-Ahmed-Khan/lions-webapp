/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Collapse from "../../components/UI/Collapse";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";
import JobCard2 from "../../components/UI/cards/JobCard2";

export async function getStaticPaths() {
  const users = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-tutorswithout-pics`
  );

  return {
    paths: users.data.map((user) => ({
      params: { userId: user._id },
    })),
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { userId } = params;

  const applications = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-myapplications/${userId}`
  );

  return {
    props: {
      myJobs: applications.data,
    },
    revalidate: 30,
  };
}

export default function MyJobs({ myJobs }) {
  // console.log(myJobs);
  // console.log(userId);
  return (
    <Container color={"white"}>
      <section className="relative lg:flex p-5">
        <div className="w-full lg:overflow-auto mx-auto">
          <div className="sm:px-8 space-y-4">
            <h2 className="text-primary text-2xl font-bold leading-none sm:text-4xl">
              My jobs
            </h2>
            <p className="">
              All of the jobs posted by you are displayed here.
            </p>
          </div>
          <div className="space-y-8 sm:p-8 w-full flex flex-col items-center justify-center">
            {myJobs?.map((job) => {
              const myJob = job.job_id;
              return (
                <JobCard2
                  key={myJob._id}
                  job={myJob}
                  isSelected={job.isSelected}
                  isShortlisted={job.isShortlisted}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Container>
  );
}
