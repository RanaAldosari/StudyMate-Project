import React from "react";
import CategoySection from "./shared/CategoySection";
import { LuCodeXml, LuPalette, LuTrendingUp, LuBriefcase } from "react-icons/lu";

function CategorySections({ className = "" }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <CategoySection name="Programming"  icon={<LuCodeXml />}    tone="indigo"  />
      <CategoySection name="Design"       icon={<LuPalette />}    tone="violet"  />
      <CategoySection name="Data Science" icon={<LuTrendingUp />} tone="emerald" />
      <CategoySection name="Business"     icon={<LuBriefcase />}  tone="orange"  />
    </div>
  );
}

export default CategorySections;
