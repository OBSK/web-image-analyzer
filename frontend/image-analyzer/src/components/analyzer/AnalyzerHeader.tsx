export default function AnalyzerHeader() {
  return (
    <div className="max-w-xl space-y-3">
      <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium tracking-[0.28em] text-cyan-200 uppercase">
        Prueba técnica Kushki
      </span>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Analizador de imágenes con Inteligencia Artificial
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
          Sube una imagen, y analízala
        </p>
      </div>
    </div>
  );
}
