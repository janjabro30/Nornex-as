"use client";

import React, { useState, useEffect } from "react";
import { Shield, Copy, Check, RefreshCw, Smartphone, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TwoFactorSetupProps {
  onEnable: (code: string) => Promise<boolean>;
  onDisable: () => Promise<boolean>;
  isEnabled: boolean;
  className?: string;
}

export function TwoFactorSetup({
  onEnable,
  onDisable,
  isEnabled,
  className,
}: TwoFactorSetupProps) {
  const [step, setStep] = useState<"initial" | "setup" | "verify" | "backup">("initial");
  const [secret, setSecret] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate a mock secret and QR code URL for demo
  useEffect(() => {
    if (step === "setup") {
      // Generate mock secret (in production, this would come from the server)
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let mockSecret = "";
      for (let i = 0; i < 32; i++) {
        mockSecret += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setSecret(mockSecret);
      
      // Generate QR code URL using Google Charts API
      const otpAuthUrl = `otpauth://totp/Nornex%20AS?secret=${mockSecret}&issuer=Nornex`;
      setQrCodeUrl(`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(otpAuthUrl)}`);
    }
  }, [step]);

  const generateBackupCodes = () => {
    const codes: string[] = [];
    for (let i = 0; i < 8; i++) {
      const code = `${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase();
      codes.push(code);
    }
    return codes;
  };

  const handleStartSetup = () => {
    setStep("setup");
    setError("");
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      setError("Koden må være 6 siffer");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // For demo, accept any 6-digit code
      const success = await onEnable(verificationCode);
      
      if (success) {
        // Generate backup codes
        const codes = generateBackupCodes();
        setBackupCodes(codes);
        setStep("backup");
      } else {
        setError("Ugyldig kode. Vennligst prøv igjen.");
      }
    } catch {
      setError("Noe gikk galt. Vennligst prøv igjen.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable = async () => {
    setIsLoading(true);
    try {
      await onDisable();
      setStep("initial");
      setSecret("");
      setQrCodeUrl("");
      setVerificationCode("");
      setBackupCodes([]);
    } catch {
      setError("Kunne ikke deaktivere 2FA. Vennligst prøv igjen.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // Fallback for older browsers
      console.log("Kunne ikke kopiere til utklippstavle");
    }
  };

  const copyAllCodes = async () => {
    await copyToClipboard(backupCodes.join("\n"));
  };

  if (isEnabled && step === "initial") {
    return (
      <div className={cn("bg-green-50 border border-green-200 rounded-lg p-6", className)}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-800 mb-1">
              Tofaktorautentisering er aktivert
            </h3>
            <p className="text-sm text-green-700 mb-4">
              Kontoen din er beskyttet med tofaktorautentisering. Du må oppgi en kode fra autentiseringsappen din hver gang du logger inn.
            </p>
            <Button
              variant="outline"
              onClick={handleDisable}
              disabled={isLoading}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              {isLoading ? "Deaktiverer..." : "Deaktiver 2FA"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border border-gray-200 rounded-lg p-6", className)}>
      {step === "initial" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Tofaktorautentisering
          </h3>
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
            Legg til et ekstra sikkerhetslag på kontoen din ved å aktivere tofaktorautentisering (2FA).
          </p>
          <Button onClick={handleStartSetup}>
            <Key className="w-4 h-4 mr-2" />
            Aktiver 2FA
          </Button>
        </div>
      )}

      {step === "setup" && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Konfigurer autentiseringsapp
            </h3>
            <p className="text-sm text-gray-600">
              Skann QR-koden med autentiseringsappen din (Google Authenticator, Authy, osv.)
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              {qrCodeUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={qrCodeUrl} 
                  alt="QR-kode for 2FA" 
                  className="w-48 h-48"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 animate-pulse rounded" />
              )}
            </div>

            <div className="w-full max-w-xs">
              <p className="text-xs text-gray-500 text-center mb-2">
                Eller skriv inn koden manuelt:
              </p>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
                <code className="text-xs font-mono flex-1 text-center break-all">
                  {secret}
                </code>
                <button
                  onClick={() => copyToClipboard(secret)}
                  className="p-1 hover:bg-gray-200 rounded"
                  aria-label="Kopier kode"
                >
                  {copiedCode === secret ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setStep("initial")}>
              Avbryt
            </Button>
            <Button onClick={() => setStep("verify")}>
              <Smartphone className="w-4 h-4 mr-2" />
              Jeg har skannet koden
            </Button>
          </div>
        </div>
      )}

      {step === "verify" && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Bekreft oppsettet
            </h3>
            <p className="text-sm text-gray-600">
              Skriv inn den 6-sifrede koden fra autentiseringsappen din for å fullføre oppsettet.
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setVerificationCode(value);
                setError("");
              }}
              className="text-center text-2xl tracking-widest font-mono"
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setStep("setup")}>
              Tilbake
            </Button>
            <Button
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || isLoading}
            >
              {isLoading ? "Verifiserer..." : "Bekreft"}
            </Button>
          </div>
        </div>
      )}

      {step === "backup" && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              2FA er nå aktivert!
            </h3>
            <p className="text-sm text-gray-600">
              Lagre disse backupkodene på et trygt sted. Du kan bruke dem til å logge inn hvis du mister tilgang til autentiseringsappen.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Backupkoder</span>
              <button
                onClick={copyAllCodes}
                className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
              >
                {copiedCode === backupCodes.join("\n") ? (
                  <>
                    <Check className="w-3 h-3" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Kopier alle
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded px-3 py-2 font-mono text-sm text-center"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Viktig:</strong> Hver kode kan kun brukes én gang. Lagre dem på et trygt sted, og generer nye koder hvis du bruker dem opp.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                const codes = generateBackupCodes();
                setBackupCodes(codes);
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generer nye koder
            </Button>
            <Button onClick={() => setStep("initial")}>
              Ferdig
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
