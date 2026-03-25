"use client";

import { useEffect, useState } from "react";
import AnalyzerHeader from "@/components/analyzer/AnalyzerHeader";
import FileUploader from "@/components/analyzer/FileUploader";
import ImagePreview from "@/components/analyzer/ImagePreview";
import LoadingIndicator from "@/components/analyzer/LoadingIndicator";
import ResultsList from "@/components/analyzer/ResultsList";
import ThemeSwitcher from "@/components/analyzer/ThemeSwitcher";
import type { Tag, ThemeMode } from "@/types/analyzer";

type AnalysisResponse = {
  error?: string;
  tags?: Tag[];
};

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [rawResponse, setRawResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const isBlackTheme = theme === "black";

  const onFileChange = (selected: File | null) => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selected);
    setTags([]);
    setRawResponse("");
    setError("");
    setPreview(selected ? URL.createObjectURL(selected) : "");
  };

  const onAnalyze = async () => {
    if (!file) {
      setError("Selecciona una imagen antes de analizar.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("Falta configurar NEXT_PUBLIC_API_URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setTags([]);
      setRawResponse("");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = (await res.json().catch(() => null)) as AnalysisResponse | null;

      setRawResponse(JSON.stringify(data ?? {}, null, 2));

      if (!res.ok) {
        throw new Error(data?.error || "Error al analizar la imagen.");
      }

      setTags(Array.isArray(data?.tags) ? data.tags : []);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-white transition-colors duration-300 sm:px-6 ${
        isBlackTheme ? "bg-black" : "bg-neutral-950"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isBlackTheme
            ? "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.09),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.12),_transparent_28%)]"
            : "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.14),_transparent_28%)]"
        }`}
      />

      <section
        className={`relative z-10 grid w-full max-w-6xl gap-6 overflow-hidden rounded-[32px] border p-5 shadow-2xl backdrop-blur xl:grid-cols-[1.05fr_0.95fr] xl:p-8 ${
          isBlackTheme
            ? "border-white/10 bg-white/4"
            : "border-white/12 bg-white/6"
        }`}
      >
        <div className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/6 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <AnalyzerHeader />
            <ThemeSwitcher
              theme={theme}
              onChange={setTheme}
            />
          </div>

          <FileUploader
            fileName={file?.name ?? null}
            loading={loading}
            onChange={onFileChange}
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onAnalyze}
              disabled={loading}
              className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isBlackTheme
                  ? "bg-[#034499] text-white hover:bg-[#0457c7]"
                  : "bg-[#034499] text-white hover:bg-[#0457c7]"
              }`}
            >
              {loading ? "Analizando..." : "Analizar imagen"}
            </button>

            <span className="text-sm text-white/60">
              Solo se permiten archivos JPG, JPEG o PNG.
            </span>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          {loading ? <LoadingIndicator /> : null}
        </div>

        <div className="grid gap-6">
          <ImagePreview
            fileName={file?.name ?? null}
            preview={preview}
            theme={theme}
          />

          <ResultsList
            tags={tags}
            rawResponse={rawResponse}
            loading={loading}
            theme={theme}
          />
        </div>
      </section>
    </main>
  );
}
