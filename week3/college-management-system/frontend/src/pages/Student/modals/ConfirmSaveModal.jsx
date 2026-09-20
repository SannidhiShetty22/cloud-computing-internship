import { Save } from "lucide-react";

const ConfirmSaveModal = ({
                              show,
                              title = "Confirm Save",
                              message = "Are you sure you want to save these changes? This will synchronize the data with the central server.",
                              confirmText = "Save Changes",
                              onCancel,
                              onConfirm,
                              loading = false
                          }) => {

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center z-[100] px-4 transition-all"
            onClick={() => {
                // Prevent closing the modal if a save operation is in progress
                if (!loading) onCancel?.();
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
                <div className="p-8">
                    {/* Header Icon & Title */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                            <Save size={32} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-100">
                            {title}
                        </h3>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <button
                            onClick={onCancel}
                            disabled={loading}
                            className="flex-1 px-6 py-3.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-6 py-3.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Processing</span>
                                </div>
                            ) : (
                                confirmText
                            )}
                        </button>
                    </div>
                </div>

                {/* Visual indicator bar for loading state at the bottom */}
                {loading && (
                    <div className="h-1 w-full bg-indigo-500/10 overflow-hidden">
                        <div className="h-full bg-indigo-600 animate-progress-loading" />
                    </div>
                )}
            </div>

            {/* Custom Animation Style */}
            <style>{`
                @keyframes progress-loading {
                    0% { width: 0; transform: translateX(-100%); }
                    50% { width: 30%; }
                    100% { width: 100%; transform: translateX(100%); }
                }
                .animate-progress-loading {
                    animation: progress-loading 1.5s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default ConfirmSaveModal;