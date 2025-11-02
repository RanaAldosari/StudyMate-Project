import React from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, children }) {
  if (!open) return null;

  const root = document.getElementById("modal-root");
  if (!root) {
    return createPortal(
      <div className="fixed inset-0 z-[100]">
        <Backdrop onClose={onClose} />
        <Sheet onClose={onClose}>{children}</Sheet>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <Backdrop onClose={onClose} />
      <Sheet onClose={onClose}>{children}</Sheet>
    </div>,
    root
  );
}

function Backdrop({ onClose }) {
  return (
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
      aria-hidden
    />
  );
}

function Sheet({ onClose, children }) {
  return (
    <div
      className="
        absolute left-1/2 top-6 -translate-x-1/2
        w-[96%] max-w-[980px]
        rounded-3xl bg-white dark:bg-slate-900
        shadow-[0_30px_80px_-20px_rgba(0,0,0,.35)]
        border border-slate-200/70 dark:border-slate-700/60
        overflow-hidden
      "
      role="dialog"
      aria-modal="true"
    >
 <button
  type="button"
  onClick={(e) => { e.stopPropagation(); onClose?.(); }}
  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white dark:bg-slate-800 dark:text-slate-200"
  aria-label="Close"
>
  ✕
</button>


      <div className="max-h-[78vh] overflow-y-auto">{children}</div>
    </div>
  );
}

export default Modal