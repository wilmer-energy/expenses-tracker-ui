import { ReactNode, useEffect } from "react";
const CloseIcon = () => <span className="text-xl leading-none">&times;</span>;

interface DrawerProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: "sm" | "md" | "lg";
}

const widths = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

export default function Drawer({
  open,
  title,
  children,
  onClose,
  width = "md",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", listener);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", listener);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full ${widths[width]}
        bg-white shadow-2xl dark:bg-gray-900
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
