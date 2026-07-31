'use client';

import { useState, useCallback } from 'react';

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

let count = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, ...props }: Omit<Toast, 'id'>) => {
    const id = String(++count);
    setToasts((prev) => [...prev, { id, title, description, ...props }]);
    return { id, dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)) };
  }, []);

  const dismiss = useCallback((id?: string) => {
    setToasts((prev) => (id ? prev.filter((t) => t.id !== id) : []));
  }, []);

  return { toasts, toast, dismiss };
}
