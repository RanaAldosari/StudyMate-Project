import React from "react";

function NotFound({ message = "No courses found" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
     <h2>🔍</h2>
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        {message}
      </h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
        Try adjusting your search or filter to find what you’re looking for.
      </p>
    </div>
  );
}
export default NotFound