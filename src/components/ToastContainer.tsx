import React from 'react';
import { Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-purple-200 shadow-xl p-3.5 flex items-start gap-3 animate-in slide-in-from-bottom-3 fade-in duration-200"
        >
          <div className="p-1 bg-purple-100 text-purple-900 rounded-full flex-shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">
              {toast.title}
            </div>
            {toast.subtitle && (
              <div className="text-xs text-zinc-600 truncate mt-0.5">
                {toast.subtitle}
              </div>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-400 hover:text-zinc-800 p-1 -mr-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
