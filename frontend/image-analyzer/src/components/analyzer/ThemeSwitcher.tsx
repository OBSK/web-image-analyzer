import type { ThemeMode } from "@/types/analyzer";

type ThemeSwitcherProps = {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
};

const options: ThemeMode[] = ["dark", "black"];

export default function ThemeSwitcher({
  theme,
  onChange,
}: ThemeSwitcherProps) {
  return (
    <div className="rounded-full border border-white/10 bg-black/20 p-1">
      <div className="flex items-center gap-1">
        {options.map((option) => {
          const isActive = option === theme;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full px-3 py-2 text-xs font-semibold tracking-[0.24em] uppercase transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
