import { ReactNode } from "react";
import { CloseIcon } from "./icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, children, maxWidth = "max-w-md" }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidth} bg-bg-card border border-bg-hover rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-elevated text-gray-400 hover:text-white hover:bg-bg-hover transition-colors"
          aria-label="بستن"
        >
          <CloseIcon size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
