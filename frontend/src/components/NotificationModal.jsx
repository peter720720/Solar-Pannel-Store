import React from 'react';
import { X, HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function NotificationModal({ isOpen, type, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  const isConfirmType = type === 'confirm';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Blur Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onCancel} />

      {/* Glassmorphism Dialog Card Box */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 max-w-sm w-full rounded-2xl p-6 shadow-2xl relative z-10 transform transition-all animate-fade-in scale-100 flex flex-col items-center text-center">
        
        {/* Top Close Button icon */}
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer">
          <X className="h-4 w-4" />
        </button>

        {/* Dynamic Context Header Icon Header Icon */}
        <div className={`p-4 rounded-full mb-4 ${
          isConfirmType 
            ? 'bg-rose-500/10 text-rose-500' 
            : 'bg-emerald-500/10 text-emerald-500'
        }`}>
          {isConfirmType ? <AlertTriangle className="h-7 w-7" /> : <CheckCircle2 className="h-7 w-7" />}
        </div>

        {/* Information Titles Context text */}
        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
          {title || (isConfirmType ? "Are you sure?" : "Success")}
        </h3>
        
        <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
          {message}
        </p>

        {/* Dialog Dynamic Functional Action Controls Panel */}
        <div className="mt-6 flex items-center gap-3 w-full">
          {isConfirmType ? (
            <>
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 text-xs font-bold bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-lg shadow-rose-600/20 active:scale-95 transition-all cursor-pointer"
              >
                Delete Listing
              </button>
            </>
          ) : (
            <button
              onClick={onConfirm}
              className="w-full py-2.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              Acknowledge
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
