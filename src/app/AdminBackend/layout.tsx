import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Nornex AS",
  description: "Administrasjonspanel for Nornex AS",
  robots: "noindex, nofollow",
};

export default function AdminBackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
