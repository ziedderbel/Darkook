"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-[#3B68EC] flex items-center justify-center mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold mb-2">Une erreur inattendue est survenue</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6 text-center">
          Veuillez rafraîchir la page pour continuer.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 bg-[#3B68EC] text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer border-none"
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
