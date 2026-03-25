import type { ChangeEvent } from "react";

type FileUploaderProps = {
  fileName: string | null;
  loading: boolean;
  onChange: (file: File | null) => void;
};

export default function FileUploader({
  fileName,
  loading,
  onChange,
}: FileUploaderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-sm font-medium text-white/90">Selecciona tu imagen</p>
      </div>

      <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-white/15 bg-white/4 px-6 py-10 text-center transition hover:border-cyan-300/40 hover:bg-white/7">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/8 text-xl text-cyan-200 transition group-hover:scale-105">
          +
        </span>
        <div className="space-y-1">
          <p className="text-base font-medium text-white">
            {fileName ? "Cambiar imagen" : "Haz click para subir una imagen"}
          </p>
          <p className="text-sm text-white/55">
            PNG, JPG o JPEG. Menos de 10 MB.
          </p>
        </div>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={loading}
          onChange={handleChange}
          className="sr-only"
        />
      </label>

      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
        {fileName ? `Archivo listo: ${fileName}` : "Todavía no has seleccionado un archivo."}
      </div>
    </div>
  );
}
