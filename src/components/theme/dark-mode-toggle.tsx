"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun01Icon } from "@hugeicons-pro/core-stroke-rounded";

export function DarkModeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        className ||
        "h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer border border-transparent dark:border-slate-700 shadow-sm text-[#556080] dark:text-amber-400 hover:text-[#547fee] dark:hover:text-amber-300 shrink-0"
      }
    >
      <HugeiconsIcon icon={isDark ? Sun01Icon : Moon02Icon} size={18} />
    </button>
  );
}

export default DarkModeToggle;
