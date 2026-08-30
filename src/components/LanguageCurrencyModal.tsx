"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons-pro/core-stroke-rounded";

export interface LanguageItem {
  code: string;
  label: string;
  country: string;
}

export interface CurrencyItem {
  code: string;
  label: string;
  symbol: string;
  country: string;
}

interface LanguageCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
  selectedCurrency: string;
  onSelectCurrency: (code: string) => void;
  initialTab?: "language" | "currency";
}

export default function LanguageCurrencyModal({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
  selectedCurrency,
  onSelectCurrency,
  initialTab = "language",
}: LanguageCurrencyModalProps) {
  const [activeTab, setActiveTab] = useState<"language" | "currency">(initialTab);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Main Languages
  const mainLanguages: LanguageItem[] = [
    { code: "ENG", label: "English", country: "gb" },
    { code: "FRA", label: "Français", country: "fr" },
  ];

  // Other Languages
  const otherLanguages: LanguageItem[] = [
    { code: "RUS", label: "Русский", country: "ru" },
    { code: "DE", label: "Deutsch", country: "de" },
    { code: "ES", label: "Español", country: "es" },
    { code: "JPY", label: "日本語", country: "jp" },
    { code: "PT", label: "Português", country: "pt" },
    { code: "ITA", label: "Italiano", country: "it" },
    { code: "PY", label: "Guaraní", country: "py" },
    { code: "ARA", label: "العربية", country: "sa" },
  ];

  // Main Currencies
  const mainCurrencies: CurrencyItem[] = [
    { code: "EUR", label: "Euro", symbol: "€", country: "eu" },
    { code: "USD", label: "US Dollar", symbol: "$", country: "us" },
    { code: "TND", label: "Tunisian Dinar", symbol: "DT", country: "tn" },
  ];

  // Other Currencies
  const otherCurrencies: CurrencyItem[] = [
    { code: "GBP", label: "British Pound", symbol: "£", country: "gb" },
    { code: "CAD", label: "Canadian Dollar", symbol: "CA$", country: "ca" },
    { code: "CHF", label: "Swiss Franc", symbol: "CHF", country: "ch" },
    { code: "AUD", label: "Australian Dollar", symbol: "AU$", country: "au" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", country: "jp" },
    { code: "SAR", label: "Saudi Riyal", symbol: "SR", country: "sa" },
    { code: "AED", label: "UAE Dirham", symbol: "AED", country: "ae" },
  ];

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div key="lang-curr-portal" className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="lang-curr-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Content Card */}
          <motion.div
            key="lang-curr-card"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto"
          >
            {/* Header: Title + Close Button */}
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {activeTab === "language" ? "Choose language" : "Choose currency"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-500 flex items-center justify-center transition-colors cursor-pointer border-none"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* 2 Tabs Header Bar */}
            <div className="flex border-b border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTab("language")}
                className={`flex-1 py-3 text-sm sm:text-base transition-all cursor-pointer border-none bg-transparent text-center font-bold relative ${
                  activeTab === "language"
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600 font-semibold"
                }`}
              >
                Language ({selectedLanguage})
                {activeTab === "language" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900 rounded-full"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("currency")}
                className={`flex-1 py-3 text-sm sm:text-base transition-all cursor-pointer border-none bg-transparent text-center font-bold relative ${
                  activeTab === "currency"
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600 font-semibold"
                }`}
              >
                Currency ({selectedCurrency})
                {activeTab === "currency" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-900 rounded-full"
                  />
                )}
              </button>
            </div>

            {/* TAB 1: LANGUAGE CONTENT */}
            {activeTab === "language" && (
              <div className="space-y-5 pt-1">
                {/* Main Languages */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700">Main languages</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mainLanguages.map((lang) => {
                      const isSelected = selectedLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLanguage(lang.code);
                            onClose();
                          }}
                          className={`h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                              : "border-gray-200/90 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${lang.country}.png`}
                            alt={lang.code}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                          />
                          <span>- {lang.code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Other Languages */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700">Other languages</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {otherLanguages.map((lang) => {
                      const isSelected = selectedLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLanguage(lang.code);
                            onClose();
                          }}
                          className={`h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                              : "border-gray-200/90 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${lang.country}.png`}
                            alt={lang.code}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                          />
                          <span>- {lang.code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CURRENCY CONTENT */}
            {activeTab === "currency" && (
              <div className="space-y-5 pt-1">
                {/* Main Currencies */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700">Main currencies</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mainCurrencies.map((curr) => {
                      const isSelected = selectedCurrency === curr.code;
                      return (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={() => {
                            onSelectCurrency(curr.code);
                            onClose();
                          }}
                          className={`h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                              : "border-gray-200/90 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${curr.country}.png`}
                            alt={curr.code}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                          />
                          <span>- {curr.code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Other Currencies */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700">Other currencies</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {otherCurrencies.map((curr) => {
                      const isSelected = selectedCurrency === curr.code;
                      return (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={() => {
                            onSelectCurrency(curr.code);
                            onClose();
                          }}
                          className={`h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "border-[#4a77ec] border-2 text-gray-900 bg-white shadow-xs"
                              : "border-gray-200/90 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${curr.country}.png`}
                            alt={curr.code}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-gray-100/80"
                          />
                          <span>- {curr.code}</span>
                        </button>
                      );
                    })}
                  </div>
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
