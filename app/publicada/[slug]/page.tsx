"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type PublishedNews = {
  title: string;
  content: string[];
  author: string;
  verdict: "buena" | "mala";
  createdAt: string;
};

export default function PublicadaPage() {
  const params = useParams<{ slug: string }>();
  const [news, setNews] = useState<PublishedNews | null>(null);

  useEffect(() => {
    if (!params.slug) return;

    const stored = localStorage.getItem(`news-${params.slug}`);
    if (stored) {
      setNews(JSON.parse(stored));
    }
  }, [params.slug]);

  if (!news) {
    return (
      <main className="p-10 text-center">
        <p>Noticia no encontrada.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 flex justify-center">
      <article className="max-w-3xl w-full space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">{news.title}</h1>
          <p className="text-sm text-zinc-500">
            Publicada por {news.author} ·{" "}
            {new Date(news.createdAt).toLocaleDateString()}
          </p>
        </header>

        <section className="space-y-4 text-lg leading-relaxed">
          {news.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <footer className="pt-10 border-t space-y-4">
          <p className="font-semibold">
            {news.verdict === "buena"
              ? "Esta noticia presenta una cobertura informativa."
              : "Esta noticia presenta una cobertura desinformante."}
          </p>

          <a href="/" className="text-sm underline text-zinc-600">
            Volver al inicio
          </a>
        </footer>
      </article>
    </main>
  );
}

