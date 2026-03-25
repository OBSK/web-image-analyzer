export default function LoadingIndicator() {
  return (
    <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-400/8 p-4">
      <div className="flex items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-200/20 border-t-cyan-200" />
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">Analizando imagen...</p>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-200 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
