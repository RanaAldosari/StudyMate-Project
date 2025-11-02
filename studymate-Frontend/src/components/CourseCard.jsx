import React, { useMemo, useState, useEffect } from "react";

function getInitials(fullName = "—") {
  const [first = "", second = ""] = String(fullName).trim().split(/\s+/, 2);
  const letters = (first[0] || "").concat(second[0] || "").toUpperCase();
  return letters || "•";
}

function getAvatarTone(fullName = "") {
  const toneClasses = [
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300",
    "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
  ];
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return toneClasses[Math.abs(hash) % toneClasses.length];
}

function getLevelBadgeClasses(levelRaw = "") {
  const level = String(levelRaw).toLowerCase();
  if (level.includes("beginner")) {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300";
  }
  if (level.includes("intermediate")) {
    return "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300";
  }
  return "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300"; 
}

function CourseCard({
  course,
  quantity = 0,
  onIncrease,         
  onDecrease,      
  onOpenDetails,     
  onOpen,           
}) {
  const ratingValue = useMemo(() => Number(course?.rating ?? 0).toFixed(1), [course]);
  const priceValue  = useMemo(() => Number(course?.price  ?? 0).toFixed(2), [course]);
const DEFAULT_INSTRUCTOR_IMG = "/Teacher2.png";

  const isControlledCounter = typeof onIncrease === "function" && typeof onDecrease === "function";
  const [localQuantity, setLocalQuantity] = useState(quantity);
  useEffect(() => setLocalQuantity(quantity), [quantity]);

  const displayedQuantity = isControlledCounter ? quantity : localQuantity;
  const isDecreaseDisabled = displayedQuantity <= 0;

  function handleIncrease(event) {
    event.stopPropagation();
    if (isControlledCounter) onIncrease?.(course.id);
    else setLocalQuantity((prev) => prev + 1);
  }

  function handleDecrease(event) {
    event.stopPropagation();
    if (isDecreaseDisabled) return;
    if (isControlledCounter) onDecrease?.(course.id);
    else setLocalQuantity((prev) => Math.max(0, prev - 1));
  }

  const openHandler = onOpenDetails || onOpen;

  return (
    <div
      onClick={() => openHandler?.(course.id)}
      className="
        group relative cursor-pointer overflow-hidden rounded-3xl
        border border-gray-200 dark:border-slate-700/60
        bg-white/90 dark:bg-slate-900/80
        transition-all duration-300 ease-out hover:shadow-[0_12px_20px_-4px_rgba(0,0,0,0.10)]
        transform hover:scale-[1.02]
      "
    >
 
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
        />
       {course.category && (
  <span
    className="
      absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium
      text-[#fcfcfc]
      bg-[#d3d3d8] 
      dark:bg-[rgba(15,23,42,0.75)]
      border border-white/20 shadow-sm select-none
    "
  >
    {course.category}
  </span>
)}

      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-medium leading-snug">{course.title}</h3>

        <p className="mb-3 text-[15px] leading-6 text-[#6b7280] dark:text-slate-300">
          {course.description}
        </p>

        <div className="mb-3 flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-300">
  
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="h-4 w-4" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{course.durationHours} hours</span>
          </div>

          <span className={`rounded-full px-2.5 py-1 ${getLevelBadgeClasses(course.level)}`}>
            {course.level}
          </span>

          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 className="h-5 w-5" aria-hidden="true">
              <path
                fill="#FACC15"
                d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.8l-5.8 3.1 1.1-6.4-4.7-4.6 6.5-.9L12 2.5z"
              />
            </svg>
            <span className="text-[15px] font-medium text-[#111827] dark:text-white">
              {ratingValue}
            </span>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2.5">
  <img
    src={DEFAULT_INSTRUCTOR_IMG}
    alt={course.instructor || "Instructor"}
    className="h-6 w-6 rounded-full object-cover ring-2 ring-white/80 dark:ring-slate-900/70"
    onClick={(e) => e.stopPropagation()}
  />
  <span className="text-[13px] text-slate-600 dark:text-slate-300">
    {course.instructor || "—"}
  </span>
</div>


        <div className="tabular-nums text-base font-medium text-[#3b82f6] dark:text-slate-100">
          ${priceValue}
        </div>
      </div>

      <div className="mx-5 border-t border-slate-200/70 px-5 py-3 dark:border-slate-700/60">
        <div className="mx-auto flex w-full items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={isDecreaseDisabled}
            onClick={handleDecrease}
            className={`grid h-9 w-9 place-items-center rounded-full border transition
              ${
                isDecreaseDisabled
                  ? "cursor-not-allowed border-slate-200 text-slate-300 dark:border-slate-800 dark:text-slate-600"
                  : "border-slate-300/70 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
              }`}
          >
            <span className="text-lg leading-none">−</span>
          </button>

          <span className="min-w-[1.5rem] text-center tabular-nums">
            {displayedQuantity}
          </span>

          <button
            type="button"
            aria-label="Increase quantity"
            onClick={handleIncrease}
            className="
              grid h-9 w-9 place-items-center rounded-full border
              border-slate-300/70 hover:bg-slate-50
              dark:border-slate-600 dark:hover:bg-slate-800 transition
            "
          >
            <span className="text-lg leading-none">＋</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;