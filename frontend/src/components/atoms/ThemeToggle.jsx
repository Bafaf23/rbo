"use client";

import Button from "./Button";
/* import { useTheme } from "@/context/ThemeProvider"; */
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

/**
 * Toggle para alternar entre modo claro y oscuro.
 *
 * @returns {JSX.Element}
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-200/70 p-1 shadow-inner backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/80">
      <Button
        icon={faMoon}
        onClick={toggleTheme}
        aria-label="Cambiar a modo oscuro"
        classNameBtn="p-1 rounded-full transition-all focus:outline-none"
        classNameIcon={`h-5 w-5 transition-all duration-200 ${
          !isLight
            ? "rounded-full bg-orange-500/20 p-1.5 text-orange-400 border border-orange-500/30"
            : "text-slate-400 hover:text-slate-600 dark:text-zinc-500"
        }`}
      />
      <Button
        icon={faSun}
        onClick={toggleTheme}
        aria-label="Cambiar a modo claro"
        classNameBtn="p-1 rounded-full transition-all focus:outline-none"
        classNameIcon={`h-5 w-5 transition-all duration-200 ${
          isLight
            ? "rounded-full bg-white p-1.5 text-amber-500 shadow-xs border border-slate-200/80"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      />
    </div>
  );
}
