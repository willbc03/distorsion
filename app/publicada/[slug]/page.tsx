"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useLang } from "../../components/LanguageContext";
import { supabase } from "../../lib/supabase";

type ContentItem =
  | { type: "text"; text: string; image?: string }
  | { type: "subtitle"; text: string }
  | { type: "text-full"; text: string };

type SavedNews = {
  titleEs: string; titleEn: string;
  subtitleEs: string; subtitleEn: string;
  heroImage: string;
  introEs: string; introEn: string;
  tagsEs: string[]; tagsEn: string[];
  contentItemsEs: ContentItem[];
  contentItemsEn: ContentItem[];
  author: string;
  verdict: "buena" | "mala";
  verdictEs: string; verdictEn: string;
  createdAt: string;
};

function groupItems(items: ContentItem[]) {
  type Group = { subtitle?: string; fullWidth?: boolean; texts: { text: string; image?: string }[] };
  const groups: Group[] = [];
  let current: Group | null = null;
  for (const item of items) {
    if (item.type === "subtitle") {
      if (current) groups.push(current);
      current = { subtitle: item.text, texts: [] };
    } else if (item.type === "text-full") {
      if (current) groups.push(current);
      current = { fullWidth: true, texts: [{ text: item.text }] };
    } else {
      if (!current) current = { texts: [] };
      current.texts.push({ text: item.text, image: (item as any).image });
    }
  }
  if (current) groups.push(current);
  return groups;
}

const imagesPerGroup: Record<string, [string, string, string]> = {
  "1":  ["/1bayern.jpg",      "/2bayern.jpg",      "/3bayern.jpg"],
  "2":  ["/1venezuela.jpg",   "/2venezuela.jpg",   "/3venezuela.jpg"],
  "3":  ["/1debate.jpg",      "/2debate.jpg",      "/3debate.jpg"],
  "4":  ["/okpolilla.jpg",    "/nelson.jpg",       "/escritos.jpg"],
  "5":  ["/1valdiri.jpg",     "/2valdiri.jpg",     "/3valdiri.jpg"],
  "6":  ["/1kimi.jpg",        "/2kimi.jpg",        "/3kimi.jpg"],
  "7":  ["/1nino.jpg",        "/2nino.jpg",        "/3nino.jpg"],
  "8":  ["/3narco.jpg",       "/1narco.jpeg",      "/2narco.jpg"],
  "9":  ["/1ia.jpg",          "/2ia.jpg",          "/3ia.jpeg"],
  "10": ["/science-fake.jpg", "/science-fake.jpg", "/science-fake.jpg"],
  "11": ["/ciencia.jpg",      "/ciencia.jpg",      "/ciencia.jpg"],
  "12": ["/ia.jpg",           "/ia.jpg",           "/ia.jpg"],
};

export default function PublicadaPage() {
  const params = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const [news, setNews] = useState<SavedNews | null>(null);
  const [fontSize, setFontSize] = useState(0);

useEffect(() => {
  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .eq("id", params.slug)
      .single();

    if (error || !data) {
      setNews(null);
      return;
    }

    setNews({
      titleEs: data.title_es,
      titleEn: data.title_en,
      subtitleEs: data.subtitle_es,
      subtitleEn: data.subtitle_en,
      heroImage: data.hero_image,
      introEs: data.intro_es,
      introEn: data.intro_en,
      tagsEs: data.tags_es,
      tagsEn: data.tags_en,
      contentItemsEs: data.content_items_es,
      contentItemsEn: data.content_items_en,
      author: data.author,
      verdict: data.verdict,
      verdictEs: data.verdict_es,
      verdictEn: data.verdict_en,
      createdAt: data.created_at,
    });
  };

  fetchNews();
}, [params.slug]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-size-md", "text-size-lg");
    if (fontSize === 1) root.classList.add("text-size-md");
    if (fontSize === 2) root.classList.add("text-size-lg");
    return () => {
      root.classList.remove("text-size-md", "text-size-lg");
    };
  }, [fontSize]);

  if (!news) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-black/50 dark:text-white/50">{t("Noticia no encontrada.", "Story not found.")}</p>
      </main>
    );
  }

  const title = lang === "ES" ? news.titleEs : news.titleEn;
  const subtitle = lang === "ES" ? news.subtitleEs : news.subtitleEn;
  const intro = lang === "ES" ? news.introEs : news.introEn;
  const currentTags = lang === "ES" ? news.tagsEs : news.tagsEn;
  const contentItems = lang === "ES" ? news.contentItemsEs : news.contentItemsEn;

  const date = new Date(news.createdAt).toLocaleDateString(lang === "ES" ? "es-ES" : "en-US", {
    year: "numeric", month: "long", day: "numeric"
  }).toUpperCase();

  const groups = groupItems(contentItems || []);
  const noticiaId = params.slug.split("-")[1];

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24">

        {/* HEADER META */}
        <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8 text-xs font-medium tracking-widest flex-wrap">
          <span className="text-black/70 dark:text-white/70 font-medium">{date}</span>
          <span className="text-black/50 dark:text-white/50">/</span>
          {(currentTags || []).map((tag, i) => (
            <span key={i} className="border-2 border-black/60 dark:border-white/60 rounded-full px-3 py-1 text-black dark:text-white font-medium">{tag}</span>
          ))}
          <span className="text-black/50 dark:text-white/50">/</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#BEFE46] flex items-center justify-center text-black font-bold text-xs">
              {news.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-black/70 dark:text-white/70">
              {t("Por", "By")} <span className="text-black dark:text-white font-medium">{news.author}</span>
            </span>
          </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start mb-8 md:mb-10">
          <div>
            <h1 className="font-title font-bold text-black dark:text-white leading-tight uppercase mb-4 md:mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 999px)" }}>
              {title}
            </h1>
            <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed">{subtitle}</p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-[#FF3B27] h-[280px] md:h-[500px]">
            <img src={news.heroImage.startsWith("/") ? news.heroImage : `/${news.heroImage}`}
              alt={title} className="w-full h-full object-cover grayscale"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        <hr className="border-black/30 dark:border-white/30 mb-6 md:mb-8" />
        <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed mb-10 md:mb-16">{intro}</p>

        {/* CONTENIDO */}
        {groups.map((group, gi) => {
          const hasSubtitle = !!group.subtitle;
          const imageItem = group.texts.find(t => t.image);

          if (group.fullWidth) {
            return (
              <div key={gi} className="mb-10">
                <hr className="border-black/10 dark:border-white/10 mb-10" />
                {group.texts.map((t, ti) => (
                  <p key={ti} className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed mb-6">{t.text}</p>
                ))}
              </div>
            );
          } else if (hasSubtitle) {
            return (
              <div key={gi} className="mb-10 md:mb-16">
                <hr className="border-black/10 dark:border-white/10 mb-8 md:mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch">
                  <div>
                    <h2 className="font-title font-bold text-black dark:text-white leading-tight uppercase mb-6 md:mb-8"
                      style={{ fontSize: "clamp(1.5rem, 3.8vw, 999px)" }}>
                      {group.subtitle}
                    </h2>
                    {group.texts.map((t, ti) => (
                      <p key={ti} className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed mb-6">{t.text}</p>
                    ))}
                  </div>
                  <div className="bg-[#FF3B27] overflow-hidden relative rounded-xl" style={{ minHeight: "200px" }}>
                    {(() => {
                      const subtitleIndex = groups.slice(0, gi).filter(g => !!g.subtitle).length;
                      const noticiaImages = imagesPerGroup[noticiaId] || [news.heroImage, news.heroImage, news.heroImage];
                      const groupImage = imageItem?.image || noticiaImages[subtitleIndex + 1] || noticiaImages[0];
                      return (
                        <img
                          src={groupImage}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover grayscale"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={gi} className="mb-10">
                {group.texts.map((t, ti) => (
                  <div key={ti}>
                    <p className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed border-l-2 border-[#FF3B27] pl-4 md:pl-6 mb-6">{t.text}</p>
                    {t.image && <img src={t.image} alt="" className="w-full h-[240px] md:h-[420px] object-cover grayscale mb-6 rounded-xl" />}
                  </div>
                ))}
              </div>
            );
          }
        })}

        {/* CIERRE */}
        <div className="mt-16 md:mt-24">
          <hr className="border-black/10 dark:border-white/10 mb-10 md:mb-16" />
          <h2 className="font-title font-bold text-black dark:text-white uppercase text-center mb-8 md:mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 999px)" }}>
            {t("Noticia publicada", "Story published")}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link href="/" className="w-full sm:w-auto text-center bg-[#BEFE46] text-black font-bold px-8 md:px-10 py-4 rounded-full hover:bg-white transition text-sm md:text-base">
              {t("Volver al inicio", "Back to home")}
            </Link>
            <Link href={`/noticia/${noticiaId}`} className="w-full sm:w-auto text-center bg-[#FF3B27] text-white font-bold px-8 md:px-10 py-4 rounded-full hover:bg-red-600 transition text-sm md:text-base">
              {t("Volver a empezar", "Start over")}
            </Link>
          </div>
        </div>

      </section>

      {/* Botón tamaño texto */}
      <button
  onClick={() => setFontSize(prev => (prev + 1) % 3)}
  className="fixed bottom-[78px] right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
  style={{ backgroundColor: "#BEFE46" }}
>
  <span className="font-bold leading-none text-black"
    style={{ fontSize: fontSize === 0 ? "12px" : fontSize === 1 ? "11px" : "9px" }}>
    {fontSize === 0 ? "A" : fontSize === 1 ? "A+" : "A++"}
  </span>
</button>

    </main>
  );
}