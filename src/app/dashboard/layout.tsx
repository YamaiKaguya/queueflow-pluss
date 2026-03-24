"use client"

import type { ReactNode } from "react";

import Header from "@/src/components/header/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}