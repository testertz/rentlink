import { Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useI18n, Locale } from "@/lib/i18n";

export function ThemeLangToggle() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl h-9 w-9"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-xl h-9 px-2 text-xs gap-1"
        onClick={() => setLocale(locale === "en" ? "sw" : "en")}
        aria-label="Toggle language"
      >
        <Globe className="h-3.5 w-3.5" />
        {locale === "en" ? "SW" : "EN"}
      </Button>
    </div>
  );
}
