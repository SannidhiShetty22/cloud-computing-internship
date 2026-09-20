import { useState } from "react";
import {
    FileSpreadsheet,
    Download,
    Upload,
    X,
    CheckCircle2,
} from "lucide-react";
import api from "../../utils/api.js";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";

const ImportStudentModal = ({
                                token,
                                onClose,
                                onImportSuccess,
                            }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleDownloadTemplate = async () => {
        try {
            setError("");

            setLoading(true);

            const response = await api.get(
                "/api/student/template",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                }
            );

            const blobUrl = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = blobUrl;
            link.setAttribute(
                "download",
                "Student_Import_Template.xlsx"
            );

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error(error);
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
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResult(response.data);
            setFile(null);
            onImportSuccess?.();
        } catch (error) {
            setError(
                error.response?.data?.message || "Import failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setError("");
        setResult(null);

        event.target.value = "";
    };

    const handleClose = () => {
        if (!loading) {
            onClose?.();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300 dark:border-zinc-800 dark:bg-zinc-900">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    disabled={loading}
                    aria-label="Close import modal"
                    className="absolute right-6 top-6 p-2 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                    <X size={20} />
                </Button>

                <div className="p-8 sm:p-10">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-500/10">
                            <FileSpreadsheet size={24} />
                        </div>

                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-100">
                                Student Data Import
                            </h2>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Bulk Enrollment Utility
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800/60 dark:bg-zinc-950/50">
                            <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-800">
                                    1
                                </span>
                                Data Structure
                            </p>

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleDownloadTemplate}
                                disabled={loading}
                                className="w-full text-[10px] uppercase tracking-widest sm:w-auto"
                            >
                                {loading ? (
                                    <>
                                        <Spinner size="sm" />
                                        Downloading...
                                    </>
                                ) : (
                                    <>
                                        <Download size={16} />
                                        Download Template
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800/60 dark:bg-zinc-950/50">
                            <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-800">
                                    2
                                </span>
                                Resource Upload
                            </p>

                            <label className="block">
                                <span
                                    className={`
                                        flex w-full items-center justify-center gap-3
                                        rounded-xl border-2 border-dashed
                                        border-zinc-200 bg-white px-6 py-4
                                        text-[10px] font-black uppercase tracking-widest
                                        transition-all
                                        dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300
                                        ${
                                        loading
                                            ? "cursor-not-allowed opacity-50"
                                            : "cursor-pointer hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500"
                                    }
                                    `}
                                >
                                    <Upload size={18} />

                                    {file
                                        ? "Replace Excel File"
                                        : "Select Enrollment File"}
                                </span>

                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    disabled={loading}
                                    className="hidden"
                                />
                            </label>

                            {file && (
                                <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-[11px] font-bold text-blue-600 animate-in slide-in-from-left-2 dark:border-blue-500/20 dark:bg-blue-500/5 dark:text-blue-400">
                                    <CheckCircle2
                                        size={14}
                                        className="shrink-0"
                                    />

                                    <span className="truncate">
                                        Ready: {file.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-end gap-3 pt-4 sm:flex-row">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleImport}
                                disabled={!file || loading}
                                className="w-full text-[10px] uppercase tracking-[0.2em] sm:w-auto"
                            >
                                {loading ? (
                                    <>
                                        <Spinner size="sm" />
                                        Importing...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} />
                                        Execute Student Import
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {error && (
                                <Alert variant="error">
                                    {error}
                                </Alert>
                            )}

                            {result && (
                                <div className="grid w-full grid-cols-2 gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-[11px] font-bold text-zinc-700 animate-in zoom-in-95 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-zinc-300">
                                    <div className="space-y-1">
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-400">
                                            Processed
                                        </p>

                                        <p className="text-lg text-zinc-900 dark:text-white">
                                            {result.totalRows}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] uppercase tracking-widest text-emerald-500">
                                            Successful
                                        </p>

                                        <p className="text-lg text-emerald-600">
                                            {result.inserted}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] uppercase tracking-widest text-amber-500">
                                            Duplicates
                                        </p>

                                        <p className="text-lg text-amber-600">
                                            {result.duplicates}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] uppercase tracking-widest text-red-500">
                                            Invalid
                                        </p>

                                        <p className="text-lg text-red-600">
                                            {result.invalidRows}
                                        </p>
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