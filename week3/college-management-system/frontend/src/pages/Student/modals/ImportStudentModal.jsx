import { useState } from "react";
import { FileSpreadsheet, Download, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import api from "../../../utils/api.js";

const ImportStudentModal = ({ token, onClose, onImportSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleDownloadTemplate = async () => {
        try {
            setError("");
            setLoading(true);

            const response = await api.get("/api/student/template", {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob"
            });

            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", "Student_Import_Template.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);

        } catch (err) {
            console.error(err);
            setError("Failed to download template.");
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const response = await api.post(
                "/api/student/import",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResult(response.data);
            setFile(null);
            onImportSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Import failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-xl shadow-2xl z-10 overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                >
                    <X size={20} />
                </button>

                <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                            <FileSpreadsheet size={24} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-100">
                                Student Data Import
                            </h2>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                                Bulk Enrollment Utility
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">

                        {/* Step 1: Template Download */}
                        <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px]">1</span>
                                Data Structure
                            </p>

                            <button
                                onClick={handleDownloadTemplate}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-zinc-800 text-indigo-600 border border-indigo-100 dark:border-indigo-900/50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95"
                            >
                                <Download size={16} />
                                {loading ? "Downloading..." : "Download Template"}
                            </button>
                        </div>

                        {/* Step 2: File Upload */}
                        <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px]">2</span>
                                Resource Upload
                            </p>

                            <label className="block">
                                <span className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-pointer dark:text-zinc-300">
                                    <Upload size={18} />
                                    {file ? "Replace Excel File" : "Select Enrollment File"}
                                </span>

                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (!selectedFile) return;

                                        setFile(selectedFile);
                                        setError("");
                                        setResult(null);

                                        e.target.value = null;
                                    }}
                                    className="hidden"
                                />
                            </label>

                            {file && (
                                <div className="mt-4 flex items-center gap-3 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 rounded-xl px-4 py-3 animate-in slide-in-from-left-2">
                                    <CheckCircle2 size={14} />
                                    <span className="truncate">Ready: {file.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={handleImport}
                                disabled={!file || loading}
                                className={`w-full sm:w-auto px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                                    !file || loading
                                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                                        : "bg-indigo-600 text-white shadow-indigo-500/20 hover:bg-indigo-700"
                                }`}
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : <Upload size={16} />}
                                {loading ? "Importing..." : "Execute Student Import"}
                            </button>
                        </div>

                        {/* Feedback Area */}
                        <div className="space-y-4">
                            {error && (
                                <div className="w-full flex items-start gap-3 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 rounded-xl px-4 py-3 animate-in slide-in-from-top-2">
                                    <AlertCircle size={16} className="shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            {result && (
                                <div className="w-full bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-6 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 grid grid-cols-2 gap-4 animate-in zoom-in-95">
                                    <div className="space-y-1">
                                        <p className="text-zinc-400 uppercase text-[9px] tracking-widest">Processed</p>
                                        <p className="text-lg text-zinc-900 dark:text-white">{result.totalRows}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-emerald-500 uppercase text-[9px] tracking-widest">Successful</p>
                                        <p className="text-lg text-emerald-600">{result.inserted}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-amber-500 uppercase text-[9px] tracking-widest">Duplicates</p>
                                        <p className="text-lg text-amber-600">{result.duplicates}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-rose-50 uppercase text-[9px] tracking-widest">Invalid</p>
                                        <p className="text-lg text-rose-600">{result.invalidRows}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportStudentModal;