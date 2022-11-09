import Head from "next/head";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import Alert from "../UI/Alert";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import Sidebar from "../UI/Sidebar";

export default function WebLayout({ children }) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const CLASSES_API = `${process.env.NEXT_PUBLIC_API}/get-tutor-classes`;

  const {
    data: classes,
    isLoading: classesLoading,
    updateData,
  } = useFetch(CLASSES_API, false);

  return (
    <div className="relative bg-white ">
      <Head>
        <title>The Educationists</title>
        <meta
          name="description"
          content="Striving to provide quality education"
        />
        <meta httpEquiv="content-type" content="en-us" />
        <meta name="author" content="Naveed Ahmed Khan" />
        <meta
          name="google-site-verification"
          content="m2crJftQGoia9eW_5Een5RcngdFgCbNGLbcqYrHnuJw"
        />
        <meta name="yandex-verification" content="7ee341b0f1c20b0a" />
        <meta name="msvalidate.01" content="AD8D54215A8500E21F93B4B0EF1D39CA" />
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
          <p className="max-w-screen-xl mx-auto cursor-pointer mt-2 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg">
            {`An unverified tutor cannot apply on Jobs. Pay your verification fee
            of Rs 1500 to 03328200082 Jazz cash to get verified.`}
          </p>
        </div>
      )}

      <div className="z-0">{children}</div>
      <Footer classes={classes} />
    </div>
  );
}
