import React, { useEffect } from "react";

export default function LogOutModal({ isOpen, onClose, onConfirm }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={onClose} // clicking backdrop closes
    >
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl transform transition-all scale-100 animate-fade-in"
        onClick={(e) => e.stopPropagation()} // prevent clicks inside modal from closing
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Log out
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Are you sure you want to log out? You will need to sign in again to access your account.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700 dark:text-slate-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </header>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:opacity-95"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
            className="rounded-md px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
