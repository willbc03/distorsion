"use client";

import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import NewsCard from "./components/NewsCard";
import { useLang } from "./components/LanguageContext";

const noticiasPorGenero = {
  deportes: [
    { id: 1, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetudipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam", href: "/noticia/1", image: "/tenis.jpg" },
    { id: 2, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetudipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam", href: "/noticia/2", image: "/futbol.jpg" },
    { id: 3, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetudipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam", href: "/noticia/3", image: "/f1.jpg" },
  ],
  farandula: [
    { id: 4, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/4", image: "/bts.jpg" },
    { id: 5, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/5", image: "/jimcarrey.jpg" },
    { id: 6, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/6", image: "/badbunny.jpg" },
  ],
  social: [
    { id: 7, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/7", image: "/petro.jpg" },
    { id: 8, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/8", image: "/trump.jpg" },
    { id: 9, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/9", image: "/activismo.jpg" },
  ],
  ciencia: [
    { id: 10, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/10", image: "/science-fake.jpg" },
    { id: 11, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/11", image: "/ciencia.jpg" },
    { id: 12, title: "Nombre Noticia", description: "Lorem ipsum dolor sit amet, consectetu dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", href: "/noticia/12", image: "/ia.jpg" },
  ],
};

const generosLabel: Record<keyof typeof noticiasPorGenero, { es: string; en: string }> = {
  deportes:  { es: "Deportes",  en: "Sports"       },
  farandula: { es: "Farandula", en: "Entertainment" },
  social:    { es: "Social",    en: "Social"        },
  ciencia:   { es: "Ciencia",   en: "Science"       },
};

const tarjetasInfo = [
  { titleEs: "¿Quiénes somos?",   titleEn: "Who are we?",    descEs: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", descEn: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", bg: "#CCFF00", textColor: "#000000", rotate: "-2deg", mt: "0px" },
  { titleEs: "¿Qué hacemos?",     titleEn: "What do we do?", descEs: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", descEn: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", bg: "#FF3D00", textColor: "#ffffff", rotate: "2deg",  mt: "-20px" },
  { titleEs: "Nuestro propósito", titleEn: "Our purpose",    descEs: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", descEn: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", bg: "#CCFF00", textColor: "#000000", rotate: "3deg",  mt: "0px"   },
];

export default function HomePage() {
  const [generoSeleccionado, setGeneroSeleccionado] = useState<keyof typeof noticiasPorGenero>("deportes");
  const { t, lang } = useLang();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="text-black dark:text-white">
      <Navbar />

      {/* VIDEO FONDO GLOBAL — fijo detrás de todo en dark mode */}
      <div className="fixed inset-0 z-0 hidden dark:block pointer-events-none">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#000000]/70" />
      </div>

      {/* HERO */}
      <section className="sticky top-0 z-0 h-screen flex flex-col px-4 md:px-10 pb-16 overflow-hidden">
        {/* Video de fondo solo en light mode (en dark lo hace el fixed global) */}
        <div className="absolute inset-0 dark:hidden">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#000000]/60" />
        </div>

        {/* Título animado — centrado verticalmente, sin paddingTop hardcodeado */}
        <div
          className="relative z-10 flex items-center justify-center h-full"
          style={{
            transform: `translateY(${-scrollY * 0.4}px)`,
            opacity: Math.max(0, 1 - scrollY / 400),
          }}
        >
          <video
            autoPlay muted loop playsInline
            className="w-full"
            style={{ objectFit: "contain", transform: "scale(1.3)", transformOrigin: "center center" }}
          >
            <source src="/distorsion-titulo.webm" type="video/webm" />
          </video>
        </div>
      </section>

      <div className="relative z-10">

        {/* QUÉ ES DISTORSION */}
        <section className="bg-[#F5F5F5] dark:bg-transparent pt-16 md:pt-32 pb-10 px-4 md:px-10 overflow-hidden transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-title font-bold mb-6 md:mb-8 text-black dark:text-white">
              {t("¿QUÉ ES DISTORSION?", "WHAT IS DISTORSION?")}
            </h2>
            <p className="max-w-2xl mx-auto text-xs md:text-sm text-black/70 dark:text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-4 md:py-8">
            {tarjetasInfo.map((card, i) => (
              <div key={i}
                className="rounded-lg p-8 md:p-10 text-left cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: card.bg,
                  color: card.textColor,
                  transform: `rotate(${card.rotate})`,
                  marginTop: card.mt,
                  minHeight: "280px"
                }}>
                <h3 className="font-bold text-lg md:text-xl mb-3">{t(card.titleEs, card.titleEn)}</h3>
                <hr className="mb-4" style={{ borderColor: card.textColor, opacity: 0.3 }} />
                <p className="text-xs md:text-sm leading-relaxed" style={{ opacity: 0.85 }}>{t(card.descEs, card.descEn)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IMAGEN */}
        <section className="bg-[#F5F5F5] dark:bg-transparent pt-0 pb-10 flex items-center justify-center overflow-hidden transition-colors duration-300">
          <img src="/grafico.png" alt="Gráfico Real o Fake" className="w-full object-contain" />
        </section>

        {/* ARMA TU NOTICIA */}
        <section id="arma-tu-noticia" className="bg-[#F5F5F5] dark:bg-transparent pt-10 pb-16 md:pb-32 px-4 md:px-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-title font-bold mb-4 md:mb-6 text-black dark:text-white">
              {t("ARMA TU NOTICIA", "BUILD YOUR STORY")}
            </h2>
            <p className="max-w-xl mx-auto text-xs md:text-sm mb-8 md:mb-12 text-black/70 dark:text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-16">
              {(Object.keys(noticiasPorGenero) as Array<keyof typeof noticiasPorGenero>).map((genero) => (
                <button key={genero} onClick={() => setGeneroSeleccionado(genero)}
                  className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-[#CCFF00] hover:text-black hover:border-transparent
                    ${generoSeleccionado === genero
                      ? "bg-[#FF3D00] text-white border-transparent"
                      : "bg-transparent border border-black/30 text-black dark:border-white/30 dark:text-white"
                    }`}>
                  {lang === "ES" ? generosLabel[genero].es : generosLabel[genero].en}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {noticiasPorGenero[generoSeleccionado].map((noticia, i) => (
                <NewsCard key={noticia.id} title={noticia.title} description={noticia.description} href={noticia.href} image={(noticia as any).image} variant={i} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}