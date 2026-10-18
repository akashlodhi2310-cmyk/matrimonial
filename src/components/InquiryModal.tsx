import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Heart, Info, Sparkles } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { inquiryProfile, closeInquiryModal, sendInquiry } = useApp();
  const [message, setMessage] = useState('');

  if (!inquiryProfile) return null;

  const defaultTemplates = [
    `Namaste ${inquiryProfile.displayName} ji, I went through your profile and felt our values and aspirations align nicely. I would be honored to connect and discuss our thoughts on life and companionship.`,
    `Hello ${inquiryProfile.displayName}, your education in ${inquiryProfile.education} and work in ${inquiryProfile.city} resonate with my background. Looking forward to knowing more about you.`,
    `Warm greetings! Our family found your profile very graceful and respectful. We would be glad to take our discussion forward.`
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendInquiry(inquiryProfile.id, message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
              <img
                src={inquiryProfile.photos[0]}
                alt={inquiryProfile.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-rose-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send Marriage Inquiry</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {inquiryProfile.displayName}
              </h3>
            </div>
          </div>
          <button
            onClick={closeInquiryModal}
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed">
            Expressing your interest sends a formal inquiry to {inquiryProfile.displayName}. Select a respectful template or write your own introduction:
          </div>

          {/* Quick templates */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              Suggested Openers:
            </div>
            <div className="space-y-1.5">
              {defaultTemplates.map((template, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setMessage(template)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-rose-400 bg-slate-50/70 text-xs text-slate-800 transition-colors leading-relaxed hover:bg-white cursor-pointer"
                >
                  "{template.slice(0, 90)}..."
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a polite and thoughtful message about your background and intentions..."
              rows={4}
              required
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>
              Best Sathi prioritizes privacy and etiquette. All inquiries are tracked under your Member Dashboard.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeInquiryModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Inquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
