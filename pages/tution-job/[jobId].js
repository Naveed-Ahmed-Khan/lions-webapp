import axios from "axios";
import { getCookie } from "cookies-next";
import moment from "moment/moment";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import 'react-quill/dist/quill.bubble.css';
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import Input from "../../components/UI/Input";
import Spinner from "../../components/UI/loader/Spinner";
import TextArea from "../../components/UI/TextArea";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { findHighestQualification } from "../../util/findHighestQualification";
import { idToDate } from "../../util/idToDate";
const RichTextDisplay = dynamic(() => import('../../components/UI/RichTextDisplay.js'), { ssr: false })

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

export default function JobDescription() {
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
  const [applyMode, setApplyMode] = useState(false);

  let uploadedAt = "";
  let endAt = "";
  if (job?._id) {
    const date = idToDate(job._id).toDateString()
    uploadedAt = moment(date).format('DD/MM/YYYY');
    endAt = moment(date).add(1, 'M').format('DD/MM/YYYY');
    // console.log(uploadedAt)
    // console.log(endAt)
  }

  console.log(isLoading);
  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    /* console.log({
      job_id: job?._id,
      applicant_id: currentUser?.userId,
      coverLetter: coverLetter,
      quialification: currentUser?.qualification,
      expectedBudget: expectedBudget,
    }); */

    if (currentUser && userType === "tutor") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/add-application`,
          {
            job_id: job?._id,
            applicant_id: currentUser?._id,
            coverLetter: coverLetter,
            quialification: findHighestQualification(
              currentUser?.qualifications
            ),
            expectedBudget: expectedBudget,
            distance: distance,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 201) {
          updateJob();
          updateApplications();
          setApplyMode(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentUser && applications?.length > 0) {
      const apl = applications?.filter(
        (app) => app.applicant_id._id === currentUser?._id
      );
      console.log(apl, "applied job applicant")
      apl.length > 0 ? setHasApplied(true) : setHasApplied(false);
    }
  }, [currentUser, applications]);

  function addJobJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": "${job?.title}",
        "description": "${job?.description}",
        "hiringOrganization" : {
          "@type": "Organization",
          "name": "Educationist",
          "sameAs": "https://www.educationist.org.pk/",
          "logo": "https://www.educationist.org.pk/logo"
        },
        "industry": "Education",
        "employmentType": "PART_TIME",
        "workHours": "04pm-09pm,evening",
        "datePosted": "${uploadedAt}",
        "validThrough": "${endAt}",
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "",
            "addressLocality": "${job?.city}",
            "postalCode": "",
            "addressCountry": "PK"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "PKR",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": ${job?.budget},
            "maxValue": ${job?.budget},
            "unitText": "MONTH"
          }
        },
        "responsibilities": "to produce A+ results",
        "skills": "produced self confidence",
        "qualifications": "${job?.qualification}",
        "educationRequirements": "${job?.qualification}",
        "experienceRequirements": "${job?.experience}"
      }
  `,
    };
  }

  const desc = `${String(job?.description)}`
  console.log(desc)

  return (
    <Container color={"white"}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJobJsonLd()}
          key="job-jsonld"
        />
      </Head>
      <div className="p-4 sm:p-8 flex flex-col bg-white">
        <h2 className=" text-primary text-3xl font-semibold">
          Job Description
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
                  <h2 className="text-primary text-2xl font-semibold">
                    Job details
                  </h2>
                  <p className="text-sm text-gray-700">
                    Posted on {uploadedAt} by {job?.user_id?.name}
                  </p>
                </div>
                {job?.description && <RichTextDisplay value={job.description} />}
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Class | {job?.class}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Subject | {job?.subjects}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Budget | Rs. {job?.budget}</span>
                  </li>
                </ul>
              </div>

              <div className="p- sm:p-8 flex flex-col bg-white md:bg-neutral-100">
                <h2 className="mb-8 text-primary text-2xl font-semibold">
                  Tutor Requirements
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Experience | {job?.experience} Year</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Qualification | {job?.qualification}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Location | {job?.city}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Gender Preferance | {job?.gender}</span>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span>Duration | {job?.duration}</span>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!applyMode ? (
            <div>
              <div className="my-5 flex w-full sm:w-fit">
                <Button
                  fullwidth
                  type={"button"}
                  onClick={() => {
                    if (!currentUser) {
                      setIsLoading(false);
                      setError(
                        "Signin to apply. Register as a tutor if you don't have an account."
                      );
                      return;
                    } else {
                      setApplyMode(true);
                    }
                  }}
                >
                  Apply Now
                </Button>
              </div>
              {error && (
                <p
                  onClick={() => {
                    setError("");
                  }}
                  className="cursor-pointer mt-4 text-center font-archivo text-red-500 px-3 sm:px-6 py-3 border border-red-500 rounded-lg"
                >
                  {error}
                </p>
              )}
            </div>
          ) : (
            <>
              {currentUser?.userType !== "student" ? (
                hasApplied ? (
                  <div className=" bg-white md:bg-neutral-100 rounded sm:p-8">
                    <p className="h-40 flex items-center justify-center text-xl text-gray-700 font-medium">
                      You have already applied for this job!
                    </p>
                  </div>
                ) : (
                  <form
                    // onSubmit={submitHandler}
                    className="bg-white md:bg-neutral-100 rounded sm:p-8"
                  >
                    <h2 className="mb-8 text-primary text-2xl font-semibold">
                      Application
                    </h2>
                    <h4 className="text-primary text-lg font-medium">Guide:</h4>
                    <p className="whitespace-pre-line -mt-4 mb-8 text-gray-600">
                      {`
                1) Mention the following in your Cover Letter:
                  Expertise, Experience, Qualification, achievements, strategy to produce A* and how this area is suitable.
                2) Mention your expected fee
                3) Mention Approx distance from your location (using google maps)`}
                    </p>
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
                    <div className="space-y-4 sm:space-y-0 mt-8 sm:flex justify-end gap-4">
                      <div className="w-full sm:w-fit">
                        <Button
                          fullwidth
                          disabled={isLoading}
                          type={"button"}
                          onClick={submitHandler}
                        >
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
                      <div className="w-full sm:w-fit">
                        <Button
                          fullwidth
                          type={"button"}
                          onClick={() => setApplyMode(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                )
              ) : null}
            </>
          )}

          {applicationsLoading ? (
            <Spinner sm />
          ) : (
            <div className="mt-20 md:mt-0 bg-white md:bg-neutral-100 rounded md:p-8">
              <div className="mb-8 md:flex items-center">
                <h2 className="text-primary text-2xl font-semibold">
                  Applicants
                </h2>
                <div className="flex mt-2 item-center">
                  <p className="ml-1 -mt-0.5 text-gray-600">
                    {applications?.length > 0 && `(${applications?.length})`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {applications?.length > 0 ? (
                  applications?.map((application) => {
                    const applicant = application.applicant_id;
                    return (
                      <div
                        key={application._id}
                        className=" flex flex-col gap-2 md:bg-white bg-neutral-100 rounded py-4 px-4 md:px-8"
                      >
                        <div className="flex items-center gap-3">
                          <h3 className="text-gray-800 md:text-gray-700 text-lg font-semibold">
                            {applicant.name}
                          </h3>
                          {applicant?.isVerified ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-7 h-7 text-primary"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-rose-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        <p className="text-sm sm:text-base text-gray-700 md:text-gray-600">
                          {application.coverLetter}
                        </p>
                        <div className="text-gray-700 my-2 grid grid-cols-2 gap-2">
                          <p className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                            <span>
                              Qualification |{" "}
                              {findHighestQualification(
                                applicant.qualifications
                              )}
                            </span>
                          </p>

                          <p className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                            <span>Approx Distance | {application.distance}</span>
                          </p>

                          <p className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                              />
                            </svg>
                            <span>Budget | {application.expectedBudget}</span>
                          </p>

                        </div>
                        <div>
                          <Button
                            type={"button"}
                            onClick={() => {
                              router.push({
                                pathname: "/profile/[userId]",
                                query: { userId: applicant.profileId },
                              });
                            }}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="h-40 flex items-center justify-center text-xl text-gray-700 font-medium">
                    No Applicants!
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

    </Container>
  );
}
