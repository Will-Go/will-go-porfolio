import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in">
      <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
      <h2 className="text-2xl font-semibold mb-2">{t("heading")}</h2>
      <p className="mb-6 text-zinc-400">{t("description")}</p>
      <Link
        href="/"
        className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all"
      >
        {t("goHome")}
      </Link>
    </main>
  );
}
