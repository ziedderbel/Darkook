"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, ArrowDown01Icon } from "@hugeicons-pro/core-stroke-rounded";

import svgPaths from "../imports/LandingPage/svg-p2y91de9gv";

export type AuthStep =
  | "sign-in-password"
  | "sign-in-otp-email"
  | "sign-in-otp-code"
  | "sign-up"
  | "forgot-password"
  | "create-password";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: AuthStep;
}

// Brand Logo Component matching header
function ModalLogo() {
  return (
    <div className="h-[32px] sm:h-[36px] w-auto aspect-[224/44.57] relative shrink-0 select-none">
      <svg
        className="w-full h-full block"
        fill="none"
        viewBox="0 0 224 44.5742"
      >
        <g id="Group 2087325898">
          <path d={svgPaths.p2bca0c0} fill="#547FEE" id="Union" />
          <g id="Darbook">
            <path d={svgPaths.p3d515900} fill="#0F172A" />
            <path d={svgPaths.p1e1c2e00} fill="#0F172A" />
            <path d={svgPaths.p3dbae00} fill="#0F172A" />
            <path d={svgPaths.p1c8f0b80} fill="#0F172A" />
            <path d={svgPaths.p2f5e4000} fill="#0F172A" />
            <path d={svgPaths.p25a54cf0} fill="#0F172A" />
            <path d={svgPaths.p8920900} fill="#0F172A" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function AuthModal({ isOpen, onClose, initialStep = "sign-in-password" }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>(initialStep);
  const [isClient, setIsClient] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+216");
  const [countryFlag, setCountryFlag] = useState("🇹🇳");
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // OTP State (6 digits)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password reset state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  // Handle OTP digit change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtp(digits);
      otpRefs.current[5]?.focus();
    }
  };

  const countries = [
    { code: "+216", flag: "🇹🇳", name: "Tunisia" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "+34", flag: "🇪🇸", name: "Spain" },
    { code: "+39", flag: "🇮🇹", name: "Italy" },
    { code: "+213", flag: "🇩🇿", name: "Algeria" },
    { code: "+212", flag: "🇲🇦", name: "Morocco" },
  ];

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div key="auth-modal-portal" className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            key="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Card Container */}
          <motion.div
            key="auth-card"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-gray-100/80 overflow-hidden"
          >
            {/* Header: Logo + Close Button */}
            <div className="flex items-center justify-between mb-6">
              <ModalLogo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-500 flex items-center justify-center transition-colors cursor-pointer border-none"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* ─── SCREEN 1: SIGN IN WITH PASSWORD ─────────────────────────────── */}
            {step === "sign-in-password" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Sign in in your account
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Don't you have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setStep("sign-up")}
                      className="text-[#4a77ec] hover:underline font-semibold border-none bg-transparent cursor-pointer p-0"
                    >
                      Create your account
                    </button>
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900 transition-all"
                    />
                    <div className="flex justify-end pt-0.5">
                      <button
                        type="button"
                        onClick={() => setStep("forgot-password")}
                        className="text-xs font-semibold text-[#4a77ec] hover:underline border-none bg-transparent cursor-pointer p-0"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-sm rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#4a77ec]/20 active:scale-[0.99] mt-2"
                  >
                    Continue with email
                  </button>

                  <div className="text-center pt-1">
                    <p className="text-xs font-semibold text-gray-600">
                      Proceed with OTP{" "}
                      <button
                        type="button"
                        onClick={() => setStep("sign-in-otp-email")}
                        className="text-[#4a77ec] hover:underline font-bold border-none bg-transparent cursor-pointer p-0 ml-0.5"
                      >
                        Click here
                      </button>
                    </p>
                  </div>
                </form>

                <div className="pt-2 text-center border-t border-gray-100">
                  <p className="text-[11px] leading-relaxed text-gray-400 font-medium">
                    By signing in or creating an account, you agree to the{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Rules for Online Booking
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* ─── SCREEN 2: CREATE YOUR ACCOUNT (SIGN UP) ────────────────────── */}
            {step === "sign-up" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Create your account
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setStep("sign-in-password")}
                      className="text-[#4a77ec] hover:underline font-semibold border-none bg-transparent cursor-pointer p-0"
                    >
                      Sign in
                    </button>
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="space-y-3.5"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900"
                    />
                  </div>

                  <div className="space-y-1 relative">
                    <label className="text-xs font-semibold text-gray-700">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryOpen(!isCountryOpen)}
                          className="h-[42px] px-2.5 bg-gray-50/80 border border-gray-200 hover:bg-gray-100 rounded-xl flex items-center gap-1.5 text-xs font-bold text-gray-800 cursor-pointer"
                        >
                          <span>{countryFlag}</span>
                          <span>{countryCode}</span>
                          <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-gray-500" />
                        </button>

                        {isCountryOpen && (
                          <div className="absolute top-[calc(100%+4px)] left-0 w-[170px] bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-20 space-y-1 max-h-[180px] overflow-y-auto">
                            {countries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setCountryCode(c.code);
                                  setCountryFlag(c.flag);
                                  setIsCountryOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer border-none"
                              >
                                <span className="flex items-center gap-1.5">
                                  <span>{c.flag}</span>
                                  <span>{c.name}</span>
                                </span>
                                <span className="text-gray-400 font-medium">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="99 999 999"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-sm rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#4a77ec]/20 active:scale-[0.99] mt-3"
                  >
                    Subscribe
                  </button>
                </form>

                <div className="pt-2 text-center border-t border-gray-100">
                  <p className="text-[11px] leading-relaxed text-gray-400 font-medium">
                    By signing in or creating an account, you agree to the{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Rules for Online Booking
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* ─── SCREEN 3: FORGOT PASSWORD ─────────────────────────────────── */}
            {step === "forgot-password" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Forgot password
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setStep("sign-in-password")}
                      className="text-[#4a77ec] hover:underline font-semibold border-none bg-transparent cursor-pointer p-0"
                    >
                      Sign in
                    </button>
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("create-password");
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-sm rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#4a77ec]/20 active:scale-[0.99] mt-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {/* ─── SCREEN 4: CREATE PASSWORD ──────────────────────────────────── */}
            {step === "create-password" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Create password
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Please create your password
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      New password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Confirm password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-sm rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#4a77ec]/20 active:scale-[0.99] mt-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {/* ─── SCREEN 5: SIGN IN WITH OTP (EMAIL INPUT) ────────────────────── */}
            {step === "sign-in-otp-email" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Sign in in your account
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Don't you have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setStep("sign-up")}
                      className="text-[#4a77ec] hover:underline font-semibold border-none bg-transparent cursor-pointer p-0"
                    >
                      Create your account
                    </button>
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("sign-in-otp-code");
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-sm rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#4a77ec]/20 active:scale-[0.99] mt-2"
                  >
                    Send code
                  </button>

                  <div className="text-center pt-1">
                    <p className="text-xs font-semibold text-gray-600">
                      Proceed with password{" "}
                      <button
                        type="button"
                        onClick={() => setStep("sign-in-password")}
                        className="text-[#4a77ec] hover:underline font-bold border-none bg-transparent cursor-pointer p-0 ml-0.5"
                      >
                        Click here
                      </button>
                    </p>
                  </div>
                </form>

                <div className="pt-2 text-center border-t border-gray-100">
                  <p className="text-[11px] leading-relaxed text-gray-400 font-medium">
                    By signing in or creating an account, you agree to the{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Rules for Online Booking
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* ─── SCREEN 6 & 7: SIGN IN WITH OTP (VERIFICATION CODE INPUT) ───── */}
            {step === "sign-in-otp-code" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Sign in in your account
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    Don't you have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setStep("sign-up")}
                      className="text-[#4a77ec] hover:underline font-semibold border-none bg-transparent cursor-pointer p-0"
                    >
                      Create your account
                    </button>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 block">
                      Enter code <span className="text-red-500">*</span>
                    </label>

                    {/* 6-Digit OTP Boxes */}
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpRefs.current[idx] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          onPaste={handleOtpPaste}
                          className={`w-10 h-11 sm:w-12 sm:h-12 border rounded-xl text-center font-bold text-base sm:text-lg transition-all outline-none ${
                            digit
                              ? "border-[#4a77ec] text-[#4a77ec] bg-[#4a77ec]/5 shadow-xs"
                              : "border-gray-200 text-gray-900 bg-white focus:border-[#4a77ec] focus:ring-2 focus:ring-[#4a77ec]/15"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-center pt-2">
                      <p className="text-xs text-gray-500 font-medium">
                        Didn't get the code?{" "}
                        <button
                          type="button"
                          onClick={() => setOtp(["", "", "", "", "", ""])}
                          className="text-[#4a77ec] hover:underline font-semibold border-none bg-transparent cursor-pointer p-0 ml-0.5"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 bg-[#4a77ec] hover:bg-[#3a67dc] text-white font-bold text-sm rounded-xl transition-all cursor-pointer border-none shadow-md shadow-[#4a77ec]/20 active:scale-[0.99]"
                  >
                    Verify & Continue
                  </button>
                </div>

                <div className="pt-2 text-center border-t border-gray-100">
                  <p className="text-[11px] leading-relaxed text-gray-400 font-medium">
                    By signing in or creating an account, you agree to the{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Rules for Online Booking
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#4a77ec] hover:underline no-underline font-semibold">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
