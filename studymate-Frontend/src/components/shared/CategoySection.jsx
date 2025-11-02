import React from "react";

function CategorySection(
  { name, icon, tone = "blue", className = "" }) {
  const SectionsStyles = {
    blue: {
      background: "bg-[#eff6ff]",
      iconColor: "text-[#3574fc]",
      textColor: "text-[#7aa4fd]",
      darkBackground: "dark:bg-blue-400/10",
      darkTextColor: "dark:text-blue-300",
      darkIconColor: "dark:text-blue-400",
    },
    violet: {
      background: "bg-[#faf5ff]",
      iconColor: "text-[#a937fb]",
      textColor: "text-[#b654fb]",
      darkBackground: "dark:bg-violet-400/10",
      darkTextColor: "dark:text-violet-300",
      darkIconColor: "dark:text-violet-400",
    },
    green: {
      background: "bg-[#f0fdf4]",
      iconColor: "text-[#30b862]",
      textColor: "text-[#48c075]",
      darkBackground: "dark:bg-emerald-400/10",
      darkTextColor: "dark:text-emerald-300",
      darkIconColor: "dark:text-emerald-400",
    },
    orange: {
      background: "bg-[#fff7ed]",
      iconColor: "text-[#f54a00]",
      textColor: "text-[#f87e47]",
      darkBackground: "dark:bg-orange-400/10",
      darkTextColor: "dark:text-orange-300",
      darkIconColor: "dark:text-orange-400",
    },
  };

  SectionsStyles.indigo = SectionsStyles.blue;
  SectionsStyles.emerald = SectionsStyles.green;

  const selectedToneStyles = SectionsStyles[tone] ?? SectionsStyles.blue;

  const renderIconElement = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === "function") return React.createElement(icon);
    return String(icon);
  };

  return (
    <div
      className={[
        "h-28 w-full rounded-2xl px-6 py-4 flex flex-col items-start justify-center gap-2",
        selectedToneStyles.background,
        selectedToneStyles.darkBackground,
        className,
      ].join(" ")}
    >
  
      <div
        className={[
          "text-3xl leading-none",
          selectedToneStyles.iconColor,
          selectedToneStyles.darkIconColor,
        ].join(" ")}
      >
        {renderIconElement()}
      </div>

      <div
        className={[
          "text-base font-medium tracking-tight",
          selectedToneStyles.textColor,
          selectedToneStyles.darkTextColor,
        ].join(" ")}
      >
        {name}
      </div>
    </div>
  );
}

export default CategorySection;
