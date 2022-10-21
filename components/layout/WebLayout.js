import Head from "next/head";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "../UI/Alert";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import Sidebar from "../UI/Sidebar";

export default function WebLayout({ children }) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  return (
    <div className="relative bg-white ">
      <Head>
        <title>Educationists</title>
        <meta
          name="description"
          content="Striving to provide quality education"
        />
        <link rel="icon" href="/e.png" />
      </Head>
      <Sidebar
        open={open}
        setOpen={setOpen}
        showBackdrop={showBackdrop}
        setShowBackdrop={setShowBackdrop}
      />
      <Navbar open={open} setOpen={setOpen} setShowBackdrop={setShowBackdrop} />

      {currentUser?.profileStatus && !currentUser?.isVerified && (
        <div className="px-5 xl:px-0">
          <p
            // onClick={() => {
            //   setError("");
            // }}
            className="max-w-screen-xl mx-auto cursor-pointer mt-2 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg"
          >
            An unverified tutor cannot apply on Jobs. Pay your verification fee
            of Rs 1500 to 03328200082 Jazz cash to get verified.
          </p>
        </div>
      )}

      <div className="z-0">{children}</div>
      <Footer />
    </div>
  );
}
