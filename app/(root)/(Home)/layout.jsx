import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />

        <section className="px-4 mt-20">{children}</section>
      </div>
    </main>
  );
};

export default RootLayout;
