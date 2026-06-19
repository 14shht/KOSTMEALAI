"use client";

import { useMemo } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BaseModal } from "@/components/modals/BaseModal";

type ShareModalProps = {
  open: boolean;
  title?: string;
  text: string;
  onClose: () => void;
  onCopied?: () => void;
};

export function ShareModal({ open, title = "Bagikan", text, onClose, onCopied }: ShareModalProps) {
  const shareText = useMemo(() => text.trim(), [text]);

  const copyText = async () => {
    await navigator.clipboard.writeText(shareText);
    onCopied?.();
  };

  return (
    <BaseModal open={open} title={title} onClose={onClose}>
      <textarea
        readOnly
        value={shareText}
        className="focus-soft min-h-40 w-full rounded-2xl border border-border-soft bg-soft-green p-4 text-sm text-text-primary"
      />
      <Button type="button" className="mt-4 w-full" leftIcon={<Copy className="h-4 w-4" />} onClick={copyText}>
        Salin
      </Button>
    </BaseModal>
  );
}
