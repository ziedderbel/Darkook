"use client";

import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon02Icon } from "@hugeicons-pro/core-stroke-rounded";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-accent transition-colors focus:outline-none relative flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      <HugeiconsIcon icon={Sun01Icon} className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" size={20} />
      <HugeiconsIcon icon={Moon02Icon} className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground/80" size={20} />
    </button>
  );
}
