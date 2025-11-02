import React, { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

function ThemeToggleButton() {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  const defaultTheme = savedTheme || (prefersDarkMode ? "dark" : "light");

  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 text-slate-700 dark:text-slate-200 transition-colors"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
    </button>
  );
}

export default ThemeToggleButton;
