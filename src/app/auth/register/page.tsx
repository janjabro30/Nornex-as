"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Phone,
  MapPin,
  Search,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordStrengthIndicator } from "@/components/portal";
import { useAuthStore } from "@/store";
import type { AccountType } from "@/types/portal";

interface CompanyLookupResult {
  orgNumber: string;
  companyName: string;
  organizationType: string;
  industry: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as AccountType) || "private";

  const { register, isLoading } = useAuthStore();

  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>(initialType);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // Private customer fields
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  // Company fields
  const [orgNumber, setOrgNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPostalCode, setCompanyPostalCode] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupSuccess, setLookupSuccess] = useState(false);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 12) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
    if (!/[0-9]/.test(pwd)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return false;
    return true;
  };

  const validateOrgNumber = (num: string) => /^\d{9}$/.test(num.replace(/\s/g, ""));

  const handleBronnysundLookup = async () => {
    if (!validateOrgNumber(orgNumber)) {
      setError("Organisasjonsnummer må være 9 siffer");
      return;
    }

    setIsLookingUp(true);
    setError("");
    setLookupSuccess(false);

    try {
      const response = await fetch(`/api/company-lookup/${orgNumber.replace(/\s/g, "")}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Kunne ikke hente bedriftsinformasjon");
      }

      const data: CompanyLookupResult = await response.json();
      
      setCompanyName(data.companyName);
      setIndustry(data.industry);
      setCompanyAddress(data.address.street);
      setCompanyPostalCode(data.address.postalCode);
      setCompanyCity(data.address.city);
      setVatNumber(`NO${orgNumber.replace(/\s/g, "")}MVA`);
      setLookupSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke hente bedriftsinformasjon");
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleNextStep = () => {
    setError("");

    if (step === 1) {
      if (accountType === "private") {
        if (!firstName || !lastName || !email || !phone) {
          setError("Vennligst fyll ut alle påkrevde felt");
          return;
        }
      } else {
        if (!orgNumber || !companyName || !firstName || !lastName || !email || !phone) {
          setError("Vennligst fyll ut alle påkrevde felt");
          return;
        }
        if (!validateOrgNumber(orgNumber)) {
          setError("Organisasjonsnummer må være 9 siffer");
          return;
        }
      }
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError("Passordet oppfyller ikke kravene");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passordene matcher ikke");
      return;
    }

    const success = await register({
      email,
      password,
      firstName,
      lastName,
      phone,
      accountType,
      ...(accountType === "company" && {
        companyName,
        orgNumber: orgNumber.replace(/\s/g, ""),
        vatNumber,
        industry,
      }),
    });

    if (success) {
      router.push(accountType === "company" ? "/company-portal" : "/my-portal");
    } else {
      setError("Noe gikk galt. Vennligst prøv igjen.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
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
            <CardTitle className="text-2xl">Opprett konto</CardTitle>
            <p className="text-gray-500 mt-1">
              {step === 1 ? "Fyll ut informasjonen din" : "Opprett passord"}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Account Type Selector */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setAccountType("private")}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    accountType === "private"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <User className={`w-6 h-6 ${accountType === "private" ? "text-green-600" : "text-gray-400"}`} />
                  <span className={`mt-2 font-medium ${accountType === "private" ? "text-green-700" : "text-gray-700"}`}>
                    Privatkunde
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("company")}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    accountType === "company"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Building2 className={`w-6 h-6 ${accountType === "company" ? "text-green-600" : "text-gray-400"}`} />
                  <span className={`mt-2 font-medium ${accountType === "company" ? "text-green-700" : "text-gray-700"}`}>
                    Bedriftskunde
                  </span>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  {/* Company Fields */}
                  {accountType === "company" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organisasjonsnummer *
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              value={orgNumber}
                              onChange={(e) => {
                                setOrgNumber(e.target.value);
                                setLookupSuccess(false);
                              }}
                              placeholder="123 456 789"
                              className="pl-10"
                              maxLength={11}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleBronnysundLookup}
                            disabled={isLookingUp || orgNumber.replace(/\s/g, "").length !== 9}
                            className="min-w-[44px]"
                          >
                            {isLookingUp ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : lookupSuccess ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Search className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Klikk søk for å hente bedriftsinformasjon fra Brønnøysundregistrene
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bedriftsnavn *
                        </label>
                        <Input
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Bedrift AS"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bransje
                          </label>
                          <Input
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="IT-tjenester"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            MVA-nummer
                          </label>
                          <Input
                            value={vatNumber}
                            onChange={(e) => setVatNumber(e.target.value)}
                            placeholder="NO123456789MVA"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bedriftsadresse
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            placeholder="Gateadresse"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Input
                            value={companyPostalCode}
                            onChange={(e) => setCompanyPostalCode(e.target.value)}
                            placeholder="Postnr."
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={companyCity}
                            onChange={(e) => setCompanyCity(e.target.value)}
                            placeholder="Sted"
                          />
                        </div>
                      </div>

                      <hr className="my-4" />
                      <p className="text-sm font-medium text-gray-700">Kontaktperson</p>
                    </>
                  )}

                  {/* Common Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fornavn *
                      </label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ola"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Etternavn *
                      </label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Nordmann"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-post *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@epost.no"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+47 123 45 678"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Private Customer Address */}
                  {accountType === "private" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Gateadresse"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Input
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Postnr."
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Sted"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passord *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minst 12 tegn"
                        className="pl-10 pr-10"
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

                  <PasswordStrengthIndicator password={password} />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bekreft passord *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Skriv passordet på nytt"
                        className="pl-10"
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">Passordene matcher ikke</p>
                    )}
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex gap-3">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tilbake
                  </Button>
                )}
                
                {step === 1 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1"
                  >
                    Neste
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Oppretter konto..." : "Opprett konto"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Har du allerede en konto?{" "}
              <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">
                Logg inn
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-500">
          Ved å opprette konto godtar du våre{" "}
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

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laster...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
