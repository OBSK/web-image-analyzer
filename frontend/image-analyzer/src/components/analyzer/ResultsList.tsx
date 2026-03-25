"use client";

import { useState } from "react";
import type { Tag, ThemeMode } from "@/types/analyzer";

type ResultsListProps = {
  tags: Tag[];
  rawResponse: string;
  loading: boolean;
  theme: ThemeMode;
};

export default function ResultsList({
  tags,
  rawResponse,
  loading,
  theme,
}: ResultsListProps) {
  const isBlackTheme = theme === "black";
  const [showJson, setShowJson] = useState(false);

  return (
    <section
      className={`rounded-[28px] border p-5 sm:p-6 ${
        isBlackTheme
          ? "border-white/10 bg-white/4"
          : "border-white/12 bg-white/7"
      }`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">Resultados</h2>
          <p className="text-sm text-white/55">
            Cambia entre la vista visual y el JSON de la respuesta.
          </p>
        </div>

        <label className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-medium text-white/75">
          <span>Vista visual</span>
          <span className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={showJson}
              onChange={() => setShowJson((current) => !current)}
              className="peer sr-only"
            />
            <span className="h-6 w-11 rounded-full bg-white/15 transition peer-checked:bg-cyan-300/70" />
            <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
          </span>
          <span>JSON</span>
        </label>
      </div>

      {loading ? (
        <p className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/55">
          Esperando respuesta del servicio...
        </p>
      ) : null}

      {!loading && !showJson && tags.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/55">
          Aún no hay resultados para mostrar.
        </p>
      ) : null}

      {!loading && showJson ? (
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 px-4 py-5 text-sm leading-6 text-cyan-100">
          <code>{rawResponse || '{\n  "message": "Aun no hay respuesta para mostrar."\n}'}</code>
        </pre>
      ) : null}

      {!showJson && tags.length > 0 ? (
        <ul className="space-y-3">
          {tags.map((tag, index) => (
            <li
              key={`${tag.label}-${index}`}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-medium text-white">{tag.label}</span>
                <span className="text-sm text-white/60">
                  {(tag.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${
                    isBlackTheme ? "bg-white" : "bg-cyan-300"
                  }`}
                  style={{ width: `${Math.max(tag.confidence * 100, 4)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
