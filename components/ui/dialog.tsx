"use client";

import { Modal } from "./modal";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {description && (
        <p className="mb-4 text-sm text-slate-500">{description}</p>
      )}

      {children}
    </Modal>
  );
}
