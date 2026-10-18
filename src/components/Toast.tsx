import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#282522] text-[#FBF7F1] border border-[#C5A36A]/40 shadow-xl rounded-lg px-4 py-3 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#C5A36A] shrink-0 mt-0.5" />
        <div className="text-sm font-medium leading-snug">
          {toastMessage}
        </div>
      </div>
    </div>
  );
};
