/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Container from "../components/UI/Container";

import Image from "next/image";
import Input from "../components/UI/Input";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import * as yup from "yup";
import { useRouter } from "next/router";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/loader/Spinner";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export default function Login() {
  const router = useRouter();
  const { signin, currentUser, checkAuth, setUser } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(error);
  const loginSchema = yup.object({
    email: yup.string("").email("Enter a valid email"),
    password: yup
      .string("")
      .min(6, "Password should be of minimum 6 characters length"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = await signin(values);
      if (data.error) {
        setError(data.error);
      } else if (data.userType === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/");
      }
      setIsLoading(false);
    },
  });

  return (
    <Container color={"gray-100"}>
      <section className="bg-white relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-6 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="flex overflow-hidden">
            <div className="flex flex-col justify-center flex-1 lg:flex-none px-1 py-1 sm:px-6 lg:px-20 xl:px-24  ">
              <div className="w-full max-w-xl mx-auto lg:w-96 my-8">
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="mt-6 text-4xl font-bold text-gray-700">
                    Sign In
                  </h2>
                  <p className="text-neutral-600">
                    Welcome back! Sign in to continue.
                  </p>
                </div>
                {error && (
                  <p
                    onClick={() => {
                      setError("");
                    }}
                    className="cursor-pointer mt-4 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg"
                  >
                    {error}, please try again.
                  </p>
                )}
                <div className="mt-8">
                  <div className="mt-6">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                      <div>
                        <div className="mt-1">
                          <Input
                            required
                            label="Email address"
                            placeholder="Your Email"
                            name="email"
                            formik={formik}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="mt-1">
                          <Input
                            required
                            type="password"
                            label="Password"
                            placeholder="Your Password"
                            name="password"
                            formik={formik}
                          />
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            placeholder="Your password"
                            className="w-4 h-4 text-primary border-gray-200 rounded focus:ring-primary"
                          />
                          <label
                            htmlFor="remember-me"
                            className="block ml-2 text-sm text-neutral-600"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-medium text-primary hover:text-primary-light"
                          >
                            Forgot your password?
                          </a>
                        </div>
                      </div> */}
                      <div className="pt-6">
                        <Button fullwidth type={"submit"}>
                          {isLoading ? (
                            <div className="flex justify-center">
                              <Spinner
                                stroke={"stroke-white"}
                                text={"text-white"}
                                sm
                              />
                            </div>
                          ) : (
                            <>Sign in</>
                          )}
                        </Button>
                      </div>
                    </form>
                    {/* <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-neutral-600">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-primary transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <div className="flex items-center justify-center">
                          <span className="ml-4"> Log in with Google</span>
                        </div>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
          <Image
            layout="fill"
            className=" object-cover"
            src="/images/class.jpg"
            alt=""
          />
        </div>
      </section>
    </Container>
  );
}
