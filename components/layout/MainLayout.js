import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import WebLayout from "./WebLayout";

const MainLayout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      {router.pathname.includes("dashboard") ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <WebLayout>{children}</WebLayout>
      )}
    </div>
  );
};

export default MainLayout;
