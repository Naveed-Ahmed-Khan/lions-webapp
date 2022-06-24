import React from "react";
import Head from "next/head";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-white">
      <Head>
        <title>The Lion Tutors</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/lion.png" />
      </Head>
      <Navbar />
      {children} <Footer />
    </div>
  );
};

export default MainLayout;
