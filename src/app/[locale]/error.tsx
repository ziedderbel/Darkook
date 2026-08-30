"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error && error.message && error.message !== "[object Event]") {
      console.error("App Error Boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-blue-50 text-[#3B68EC] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        !
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2 font-['Bricolage_Grotesk',sans-serif]">
        Une erreur temporaire est survenue
      </h2>
      <p className="text-sm text-slate-500 max-w-md mb-6">
        Veuillez réessayer ou retourner à la page d'accueil.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 bg-[#3B68EC] hover:bg-[#254EDB] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all border-none"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all no-underline"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
