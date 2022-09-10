import Head from "next/head";
import React, { useState } from "react";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import Sidebar from "../UI/Sidebar";

export default function WebLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  return (
    <div className="relative bg-white ">
      <Head>
        <title>The Lion Tutors</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/lion.png" />
      </Head>
      <Sidebar
        open={open}
        setOpen={setOpen}
        showBackdrop={showBackdrop}
        setShowBackdrop={setShowBackdrop}
      />
      <Navbar open={open} setOpen={setOpen} setShowBackdrop={setShowBackdrop} />

      <div className="z-0">{children}</div>
      <Footer />
    </div>
  );
}
