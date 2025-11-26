"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { CompanySidebar } from "@/components/portal";

export default function CompanyPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/company-portal");
      return;
    }

    // Redirect private users to private portal
    if (user?.accountType === "private") {
      router.push("/my-portal");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.accountType === "private") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laster...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CompanySidebar />
      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 py-8 lg:py-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
