import React from "react";
import { Link, NavLink } from "react-router"; 
import { LuGraduationCap } from "react-icons/lu";
import ThemeBG from "./ThemeBG";

function getNavTabClass({ isActive }) {
  const base =
    "relative px-4 py-2 text-sm transition-colors";
  const colors = isActive
    ? "text-blue-600 dark:text-blue-400"
    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200";
  const underline = isActive
    ? 'after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:h-[2px] after:w-10 after:bg-blue-600 dark:after:bg-blue-400'
    : "";
  return [base, colors, underline].join(" ");
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#141c2a]">
      <div className="mx-auto flex h-14 items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#3B82F6]">
            <LuGraduationCap className="h-5 w-5 text-white dark:text-black" />
          </span>
          <span className="text-base font-semibold text-slate-900 dark:text-white">
            StudyMate
          </span>
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-2">
          <NavLink to="/" className={getNavTabClass} end>
            Home
          </NavLink>
          <NavLink to="/assistant" className={getNavTabClass}>
            AI Assistant
          </NavLink>
        </nav>

        <div className="shrink-0">
          <ThemeBG />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
