"use client";

import React, { useState } from "react";
import {
  Key,
  Smartphone,
  Monitor,
  LogOut,
  Clock,
  MapPin,
  AlertTriangle,
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordStrengthIndicator, TwoFactorSetup } from "@/components/portal";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";

export default function SecurityPage() {
  const { user, sessions, terminateSession, mfaEnabled, setMfaEnabled, setPendingPasswordChange, setPasswordChangePIN } = useAuthStore();

  // Password Change State
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordStep, setPasswordStep] = useState<"request" | "verify" | "change">("request");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationPIN, setVerificationPIN] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 12) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
    if (!/[0-9]/.test(pwd)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return false;
    return true;
  };

  const handleRequestPIN = async () => {
    setIsChangingPassword(true);
    setPasswordError("");

    // Simulate sending PIN email
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock PIN (in production, this would be sent to email)
    const mockPIN = Math.floor(100000 + Math.random() * 900000).toString();
    setPasswordChangePIN(mockPIN);
    setPendingPasswordChange(true);

    // For demo purposes only - in production, PIN would be sent via email
    // eslint-disable-next-line no-console
    console.log("Demo PIN (remove in production):", mockPIN);

    setPasswordStep("verify");
    setIsChangingPassword(false);
  };

  const handleVerifyPIN = async () => {
    setIsChangingPassword(true);
    setPasswordError("");

    const storedPIN = useAuthStore.getState().passwordChangePIN;

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (verificationPIN === storedPIN) {
      setPasswordStep("change");
    } else {
      setPasswordError("Ugyldig PIN. Vennligst prøv igjen.");
    }

    setIsChangingPassword(false);
  };

  const handleChangePassword = async () => {
    setPasswordError("");

    if (!validatePassword(newPassword)) {
      setPasswordError("Passordet oppfyller ikke kravene");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passordene matcher ikke");
      return;
    }

    setIsChangingPassword(true);

    // Simulate password change
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPasswordSuccess(true);
    setPendingPasswordChange(false);
    setPasswordChangePIN(null);

    // Reset form after delay
    setTimeout(() => {
      setShowPasswordChange(false);
      setPasswordStep("request");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVerificationPIN("");
      setPasswordSuccess(false);
    }, 2000);

    setIsChangingPassword(false);
  };

  const handleEnable2FA = async (_code: string): Promise<boolean> => {
    // Simulate 2FA enable
    await new Promise((resolve) => setTimeout(resolve, 500));
    setMfaEnabled(true);
    return true;
  };

  const handleDisable2FA = async (): Promise<boolean> => {
    // Simulate 2FA disable
    await new Promise((resolve) => setTimeout(resolve, 500));
    setMfaEnabled(false);
    return true;
  };

  const handleTerminateSession = async (sessionId: string) => {
    // Simulate session termination
    await new Promise((resolve) => setTimeout(resolve, 300));
    terminateSession(sessionId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("nb-NO", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sikkerhet</h1>
        <p className="text-gray-500 mt-1">
          Administrer sikkerhet og tilgang til kontoen din
        </p>
      </div>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Endre passord</CardTitle>
              <CardDescription>Oppdater passordet ditt regelmessig for bedre sikkerhet</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!showPasswordChange ? (
            <Button onClick={() => setShowPasswordChange(true)}>
              Endre passord
            </Button>
          ) : passwordSuccess ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">Passordet er endret!</span>
            </div>
          ) : (
            <div className="space-y-4 max-w-md">
              {passwordStep === "request" && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Bekreftelse kreves</p>
                        <p className="text-sm text-blue-600 mt-1">
                          For din sikkerhet sender vi en PIN-kode til din e-post ({user?.email}) før du kan endre passordet.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nåværende passord
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
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

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowPasswordChange(false);
                        setCurrentPassword("");
                      }}
                    >
                      Avbryt
                    </Button>
                    <Button
                      onClick={handleRequestPIN}
                      disabled={!currentPassword || isChangingPassword}
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sender...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send PIN til e-post
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}

              {passwordStep === "verify" && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">PIN-kode sendt!</p>
                        <p className="text-sm text-green-600 mt-1">
                          Sjekk e-posten din for PIN-koden. Den er gyldig i 10 minutter.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skriv inn PIN-kode
                    </label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={verificationPIN}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setVerificationPIN(value);
                        setPasswordError("");
                      }}
                      placeholder="000000"
                      className="text-center text-xl tracking-widest font-mono"
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPasswordStep("request");
                        setVerificationPIN("");
                      }}
                    >
                      Tilbake
                    </Button>
                    <Button
                      onClick={handleVerifyPIN}
                      disabled={verificationPIN.length !== 6 || isChangingPassword}
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifiserer...
                        </>
                      ) : (
                        "Bekreft PIN"
                      )}
                    </Button>
                  </div>

                  <button
                    onClick={handleRequestPIN}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Send PIN på nytt
                  </button>
                </>
              )}

              {passwordStep === "change" && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">PIN bekreftet!</p>
                        <p className="text-sm text-green-600 mt-1">
                          Du kan nå opprette et nytt passord.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nytt passord
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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

                  <PasswordStrengthIndicator password={newPassword} />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bekreft nytt passord
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
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">Passordene matcher ikke</p>
                    )}
                  </div>

                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPasswordStep("request");
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setVerificationPIN("");
                      }}
                    >
                      Avbryt
                    </Button>
                    <Button
                      onClick={handleChangePassword}
                      disabled={!validatePassword(newPassword) || newPassword !== confirmPassword || isChangingPassword}
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Lagrer...
                        </>
                      ) : (
                        "Endre passord"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Tofaktorautentisering (2FA)</CardTitle>
              <CardDescription>
                Legg til et ekstra sikkerhetslag med autentiseringsapp
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TwoFactorSetup
            isEnabled={mfaEnabled}
            onEnable={handleEnable2FA}
            onDisable={handleDisable2FA}
          />
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Aktive økter</CardTitle>
              <CardDescription>
                Enheter som er logget inn på kontoen din
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li
                key={session.id}
                className={cn(
                  "flex items-start justify-between p-4 rounded-lg border",
                  session.isCurrent ? "border-green-200 bg-green-50" : "border-gray-200"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    session.isCurrent ? "bg-green-100" : "bg-gray-100"
                  )}>
                    <Monitor className={cn(
                      "w-5 h-5",
                      session.isCurrent ? "text-green-600" : "text-gray-500"
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{session.deviceInfo}</p>
                      {session.isCurrent && (
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                          Denne enheten
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      {session.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {session.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.isCurrent ? "Aktiv nå" : formatDate(session.lastActive)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      IP: {session.ipAddress}
                    </p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTerminateSession(session.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logg ut
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Sikkerhetstips</p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Bruk et unikt passord for Nornex-kontoen din</li>
                <li>• Aktiver tofaktorautentisering for bedre sikkerhet</li>
                <li>• Logg ut fra enheter du ikke bruker</li>
                <li>• Endre passord regelmessig</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
