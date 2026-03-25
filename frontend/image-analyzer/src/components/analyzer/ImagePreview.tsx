import Image from "next/image";
import type { ThemeMode } from "@/types/analyzer";

type ImagePreviewProps = {
  fileName: string | null;
  preview: string;
  theme: ThemeMode;
};

export default function ImagePreview({
  fileName,
  preview,
  theme,
}: ImagePreviewProps) {
  const isBlackTheme = theme === "black";

  return (
    <section
      className={`rounded-[28px] border p-5 sm:p-6 ${
        isBlackTheme
          ? "border-white/10 bg-white/4"
          : "border-white/12 bg-white/7"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Vista previa</h2>
          <p className="text-sm text-white/55">
            Verifica el archivo antes de iniciar el análisis.
          </p>
        </div>
        {fileName ? (
          <span className="max-w-40 truncate rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
            {fileName}
          </span>
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30">
        {preview ? (
          <div className="relative aspect-[4/3]">
            <Image
              src={preview}
              alt="Vista previa de la imagen cargada"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center px-6 text-center text-sm text-white/45">
            Tu imagen aparecerá aquí en cuanto selecciones un archivo.
          </div>
        )}
      </div>
    </section>
  );
}
