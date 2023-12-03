import React from "react";
import Navbar from "./_components/Navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <main className="h-full pt-24">{children}</main>
    </div>
  );
}

export default MarketingLayout;
