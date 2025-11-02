import React, { useState } from "react";

function getInitials(name = "—") {
  const [first = "", second = ""] = String(name).trim().split(/\s+/, 2);
  const letters = (first[0] || "").concat(second[0] || "").toUpperCase();
  return letters || "•";
}

function getLevelToneClass(levelRaw = "") {
  const levelText = String(levelRaw).toLowerCase();
  if (levelText.includes("beginner")) return "bg-emerald-100 text-emerald-800";
  if (levelText.includes("intermediate")) return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800"; 
}

function RatingStar({ filled }) {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <path
        d="M10 1.8l2.47 5.01 5.53.8-4 3.9.95 5.5L10 14.9l-4.95 2.1.95-5.5-4-3.9 5.53-.8L10 1.8z"
        className={filled ? "fill-[#FACC15]" : "fill-slate-300 dark:fill-slate-600"}
      />
    </svg>
  );
}

function CourseDetailCard({ detail, onClose = () => {} }) {
  const [avatarErr, setAvatarErr] = useState(false);
  const ratingNumber = Number(detail?.rating ?? 0);
  const ratingText = ratingNumber.toFixed(1);
  const priceNumber = Number(detail?.price ?? 0);
  const priceText = priceNumber.toFixed(2);

  const DEFAULT_INSTRUCTOR_IMG = "/Teacher2.png";

  const [interest, setInterest] = useState(0);
  const handleDecreaseInterest = () => setInterest((n) => Math.max(0, n - 1));
  const handleIncreaseInterest = () => setInterest((n) => n + 1);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900">
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white dark:bg-slate-800/90 dark:text-slate-200"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <img src={detail.image} alt={detail.title} className="h-full w-full object-cover" loading="eager" />

{detail.category && (
    <span
      className="
        absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium
        text-white bg-[rgb(250,247,247,0.77)]
        dark:bg-[rgba(15,23,42,0.75)]
        border border-white/20 shadow-sm select-none
      "
    >
      {detail.category}
    </span>
  )}

      </div>

      <div className="px-8 py-6">

        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-medium leading-snug text-slate-900 dark:text-slate-100">
            {detail.title}
          </h2>

          <div className="shrink-0 pt-1 text-blue-600">${priceText}</div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
  <img
    src={DEFAULT_INSTRUCTOR_IMG}
    alt={detail.instructor || "Instructor"}
    className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/instructors/default.png";
    }}
  />

  <div className="mr-3 text-sm">
    <div className="font-medium text-slate-900 dark:text-slate-100">
      {detail.instructor || "—"}
    </div>
    <div className="text-slate-500 dark:text-slate-400">Instructor</div>
  </div>
</div>

        <div className="flex mt-4">
          <div className="ml-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingStar key={index} filled={index < 4} />
            ))}
            <span className="ml-2 text-[15px] font-medium text-slate-700 dark:text-slate-200">
              {ratingText}
            </span>
          </div>

          <div className="ml-4 flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{Number(detail.students ?? 0).toLocaleString()} enrolled</span>
          </div>
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Course Description
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
          {detail.description}
        </p>

        <div className="mt-6 rounded-2xl p-5 dark:border-slate-700 dark:bg-slate-800/40">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
              label="Duration"
              value={`${detail.durationHours} hours`}
            />

            <InfoCard
              icon={<img src="/DifficultyImg.png" className="w-[35px]" />}
              label="Difficulty"
              value={
                <span className={`rounded-full px-2.5 py-1 text-sm ${getLevelToneClass(detail.level)}`}>
                  {detail.level}
                </span>
              }
            />

            <InfoCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[18px] w-[18px] text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              label="Students"
              value={Number(detail.students ?? 0).toLocaleString()}
            />

            <InfoCard
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect x="3" y="6" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              }
              label="Last Updated"
              value={new Date(detail.updatedAt).toLocaleDateString()}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 dark:border-slate-700">
 
<div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-800/40">
            <span className="text-sm text-slate-600 dark:text-slate-300">Interest Level:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecreaseInterest}
                disabled={interest === 0}
                className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                  interest === 0
                    ? "cursor-not-allowed border-slate-200 text-slate-300 dark:border-slate-800 dark:text-slate-600"
                    : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                }`}
              >
                −
              </button>
              <span className="w-4 text-center tabular-nums">{interest}</span>
              <button
                onClick={handleIncreaseInterest}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-300 transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                ＋
              </button>
            </div>
          </div>

          <button
            className="ml-auto w-full rounded-2xl bg-[#3b82f6] px-6 py-3 text-white shadow-sm hover:bg-[#316fce] active:scale-[.99] md:w-[540px]"
            onClick={() => {}}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-4 dark:border-slate-700/60 dark:bg-slate-800">
      <div className="mt-[2px] text-slate-600 dark:text-slate-300">{icon}</div>
      <div>
        <div className="text-[13.5px] font-small tracking-[.02em] text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="mt-1 text-[15px] font-small text-slate-900 dark:text-slate-100">
          {value}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailCard;
