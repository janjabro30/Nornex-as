"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-portal";
  
  const { login, isLoading, user } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vennligst fyll ut alle feltene");
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      // After login, redirect based on account type
      // The useAuthStore updates user state, so we can check it
      const updatedUser = useAuthStore.getState().user;
      if (updatedUser?.accountType === "company") {
        router.push("/company-portal");
      } else {
        router.push(redirect);
      }
    } else {
      setError("Ugyldig e-post eller passord");
    }
  };

  // Demo login buttons
  const handleDemoLogin = async (type: "private" | "company") => {
    const email = type === "company" ? "kontakt@bedrift.no" : "privat@eksempel.no";
    await login(email, "demo123");
    
    if (type === "company") {
      router.push("/company-portal");
    } else {
      router.push("/my-portal");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Nornex<span className="text-green-600">AS</span>
          </span>
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Logg inn</CardTitle>
            <p className="text-gray-500 mt-1">
              Logg inn for å få tilgang til din portal
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-post
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.no"
                    className="pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Passord
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                    Glemt passord?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logger inn..." : "Logg inn"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Eller prøv demo</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("private")}
                  className="text-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Privatkunde
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("company")}
                  className="text-sm"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Bedriftskunde
                </Button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Har du ikke en konto?{" "}
              <Link href="/auth/register" className="text-green-600 hover:text-green-700 font-medium">
                Registrer deg
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-500">
          Ved å logge inn godtar du våre{" "}
          <Link href="/vilkar" className="text-green-600 hover:underline">
            vilkår
          </Link>{" "}
          og{" "}
          <Link href="/personvern" className="text-green-600 hover:underline">
            personvernerklæring
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laster...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
