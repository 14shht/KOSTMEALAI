"use client";

import { Button } from "@/components/ui/Button";
import { BaseModal } from "@/components/modals/BaseModal";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmModal({ open, title = "Konfirmasi", message, confirmLabel = "Hapus", onConfirm, onClose }: ConfirmModalProps) {
  return (
    <BaseModal open={open} title={title} onClose={onClose}>
      <p className="leading-7 text-text-secondary">{message}</p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onClose}>Batal</Button>
        <Button type="button" variant="orange" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </BaseModal>
  );
}
