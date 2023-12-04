import React from "react";
import Navbar from "./_components/Navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <main className="h-full">{children}</main>;
}

export default MarketingLayout;
