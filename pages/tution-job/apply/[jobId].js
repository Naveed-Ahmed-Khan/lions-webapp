import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Container from "../../../components/UI/Container";
import TextArea from "../../../components/UI/TextArea";
import Input from "../../../components/UI/Input";
import InputGroup from "../../../components/UI/InputGroup";
import FormGroup from "../../../components/UI/FormGroup";
import Button from "../../../components/UI/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { getCookie, getCookies } from "cookies-next";
import Spinner from "../../../components/UI/loader/Spinner";
import useFetch from "../../../hooks/useFetch";

/* export async function getStaticPaths() {
  const jobs = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-jobs`);

  return {
    paths: jobs.data.map((job) => ({
      params: { jobId: job?._id },
    })),
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { jobId } = params;

  const jobs = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`
  );
  const applications = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`
  );
  return {
    props: {
      job: jobs.data,
      applications: applications?.data,
    },
    revalidate: 30,
  };
} */

export default function JobApplication() {
  const token = getCookie("token");
  const userType = getCookie("user");
  /*   console.log(token);
  console.log(applications);
  console.log(job); */
  const router = useRouter();
  const { jobId } = router.query;
  const { currentUser } = useAuth();

  const JOB_API = `${process.env.NEXT_PUBLIC_API}/get-job/${jobId}`;
  const APP_API = `${process.env.NEXT_PUBLIC_API}/get-jobapplications/${jobId}`;

  const {
    data: job,
    isLoading: jobLoading,
    updateData: updateJob,
  } = useFetch(JOB_API, true);

  const {
    data: applications,
    isLoading: applicationsLoading,
    updateData: updateApplications,
  } = useFetch(APP_API, true);

  const [coverLetter, setCoverLetter] = useState("");
  const [expectedBudget, setExpectedBudget] = useState("");
  const [distance, setDistance] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timestamp = job?._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const uploadedAt = date.toDateString();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    /* console.log({
      job_id: job?._id,
      applicant_id: currentUser?.userId,
      coverLetter: coverLetter,
      quialification: currentUser?.qualification,
      expectedBudget: expectedBudget,
    }); */
    if (!currentUser) {
      setIsLoading(false);
      // router.push("/login");
      setError(
        "Login as a turor to submit a job application. Register as a tutor if you donot have an account to proceed."
      );
      return;
    }

    console.log(currentUser);
    if (currentUser?.isVerified && userType === "tutor") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/add-application`,
          {
            job_id: job?._id,
            applicant_id: currentUser?._id,
            coverLetter: coverLetter,
            quialification: currentUser?.qualification,
            expectedBudget: expectedBudget,
            distance: distance,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        updateJob();
        updateApplications();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(
        "Unverified Tutors are not eligible to apply, pay your verification fee of Rs 1500 to 03328200082 Jazz cash to get verified."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && applications?.length > 0) {
      const apl = applications?.filter(
        (appliction) => appliction.applicant_id._id
      );
      apl ? setHasApplied(true) : setHasApplied(false);
    }
  }, [currentUser, applications]);

  return (
    <Container color={"white"}>
      <div className="p-4 sm:px-8 sm:pt-6 sm:pb-0 flex flex-col bg-white">
        <h2 className=" text-primary text-3xl font-semibold">
          Job Application
        </h2>
      </div>
      <main className="p-6 md:flex gap-6 bg-white ">
        <section className="w-full space-y-8 ">
          {jobLoading ? (
            <Spinner md />
          ) : (
            <>
              <div className="bg-white md:bg-neutral-100 rounded sm:p-8">
                <div className="mb-6">
                  <h2 className="mb-1 text-primary text-2xl font-semibold">
                    {job?.title}
                  </h2>
                  <p className="mb-6 text-sm text-gray-700">
                    Posted on {uploadedAt} by {job?.user_id?.name}
                  </p>
                </div>
                {currentUser?.userType !== "student" ? (
                  hasApplied ? (
                    <div className="bg-white md:bg-neutral-100 rounded sm:p-8">
                      <p className="h-40 flex items-center justify-center text-xl text-gray-700 font-medium">
                        You have already applied for this job!
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={submitHandler}
                      className="bg-white md:bg-neutral-100 rounded"
                    >
                      {/*  <h2 className="mb-6 text-primary text-2xl font-semibold">
                        Application
                      </h2> */}

                      <div className="space-y-4">
                        <TextArea
                          required
                          label={"Cover Letter"}
                          value={coverLetter}
                          onChange={(e) => {
                            setCoverLetter(e.target.value);
                          }}
                        />
                        <div className="grid grid-cols-2 gap-4 -mb-2">
                          <Input
                            required
                            type={"number"}
                            label={"Expected Fee"}
                            value={expectedBudget}
                            onChange={(e) => {
                              setExpectedBudget(e.target.value);
                            }}
                          />
                          <Input
                            required
                            label={"Distance"}
                            type={"text"}
                            value={distance}
                            onChange={(e) => {
                              setDistance(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {error && (
                        <p
                          onClick={() => {
                            setError("");
                          }}
                          className="cursor-pointer mt-4 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg"
                        >
                          {error}
                        </p>
                      )}
                      <div className="mt-8 flex justify-end">
                        <div>
                          <Button disabled={isLoading} type={"submit"}>
                            {isLoading ? (
                              <>
                                <Spinner
                                  sm
                                  text={"text-white"}
                                  stroke={"stroke-white"}
                                />
                              </>
                            ) : (
                              <>Submit Application</>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="mt-8 p-4 border border-gray-300 rounded">
                        <h4 className="mb-2 text-lg text-primary font-medium">
                          Guide:
                        </h4>

                        <p className="whitespace-pre-line text-gray-600">
                          {`1) Mention the following in your Cover Letter:
                              ${"  "} Expertise, Experience, Qualification, achievements, strategy to produce A* and how this area is suitable.
                            2) Mention your expected fee
                            3) Mention Approx distance from your location (using google maps)`}
                        </p>
                      </div>
                    </form>
                  )
                ) : null}
              </div>
            </>
          )}
        </section>
      </main>
    </Container>
  );
}
