import Head from "next/head";
import React, { useState } from "react";
import DashNavbar from "../dashboard/DashNavbar";
import DashSidebar from "../dashboard/DashSidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  return (
    <div>
      <Head>
        <title>Educationists</title>
        <meta
          name="description"
          content="Striving to provide quality education"
        />
        <meta
          name="google-site-verification"
          content="m2crJftQGoia9eW_5Een5RcngdFgCbNGLbcqYrHnuJw"
        />
        <meta name="verify-v1" content="7ee341b0f1c20b0a" />
        <meta name="msvalidate.01" content="AD8D54215A8500E21F93B4B0EF1D39CA" />
        <link rel="icon" href="/e.png" />
        {/* <body className="hidden">Verification: 7ee341b0f1c20b0a</body> */}
      </Head>
      <div className="md:flex">
        <DashSidebar
          open={open}
          setOpen={setOpen}
          showBackdrop={showBackdrop}
          setShowBackdrop={setShowBackdrop}
        />
        <div className="flex-1 md:ml-[273px]">
          <DashNavbar
            open={open}
            setOpen={setOpen}
            setShowBackdrop={setShowBackdrop}
          />

          <div className="min-h-[calc(100vh-80px)] bg-gray-100 p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
