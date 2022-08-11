import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

export default function AccessDenied() {
  const router = useRouter();
  return (
    <div className="fixed z-20 h-screen w-screen bg-black bg-opacity-60">
      <div className="z-50 h-screen flex items-center justify-center -mt-[10vh]">
        <div className="flex flex-col gap-4 max-w-lg bg-white rounded-lg px-10 py-8">
          <h3 className="text-xl text-red-500">Access denied !</h3>
          <p className="text-gray-600">
            Sign in as Parent/Student to post a job. Don&apos;t have an account?
            Register as a Parent/Student.
          </p>
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Signin
            </Button>
            <Button
              onClick={() => {
                router.push("/register");
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
