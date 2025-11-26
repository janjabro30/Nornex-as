"use client";

import React from "react";
import { CustomerTypeModal } from "@/components/modals";

export default function WebshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CustomerTypeModal />
    </>
  );
}
