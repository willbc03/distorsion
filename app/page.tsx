"use client";

import { useState } from "react";
import NewsCard from "./components/NewsCard";

/* ======================
   DATA
===================== */
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

const tarjetasInfo = [
  {
    title: "¿Quiénes somos?",
    description: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    bg: "#CCFF00",
    textColor: "#000000",
    rotate: "-2deg",
    mt: "0px",
  },
  {
    title: "¿Qué hacemos?",
    description: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    bg: "#FF3D00",
    textColor: "#ffffff",
    rotate: "2deg",
    mt: "-20px",
  },
  {
    title: "Nuestro proposito",
    description: "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    bg: "#CCFF00",
    textColor: "#000000",
    rotate: "3deg",
    mt: "0px",
  },
];

export default function HomePage() {
  const [generoSeleccionado, setGeneroSeleccionado] =
    useState<keyof typeof noticiasPorGenero | null>("deportes");

  return (
    <main className="text-white">

      {/* HERO sticky, fondo rojo */}
      <section className="sticky top-0 z-0 h-screen flex flex-col justify-end px-10 pb-16 overflow-hidden">
  {/* VIDEO de fondo */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>

  {/* Overlay para legibilidad */}
  <div className="absolute inset-0 bg-[#000000]/60" />

  {/* Contenido */}
  <div className="relative z-10">
    <h1 className="font-serif font-bold text-white leading-none mb-6 w-full" style={{ fontSize: "clamp(1rem, 13.5vw, 999px)" }}>
      DISTORSIÓN
    </h1>
    <div className="flex items-end justify-between">
      <p className="max-w-xs text-sm text-white/100 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore
      </p>
      <span className="px-6 py-3 rounded-full bg-[#CCFF00] text-black font-medium text-sm">
        Desliza para empezar
      </span>
    </div>
  </div>
</section>

      {/* CONTENIDO encima del hero */}
      <div className="relative z-10">

        {/* QUE ES DISTORSIÓN — fondo negro */}
        <section className="bg-[#0A0A0A] pt-32 pb-10 px-10 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8">
              ¿QUE ES DISTORSIÓN?
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-white/100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Tarjetas en grid — misma línea, rotación individual */}
          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto py-8">
            {tarjetasInfo.map((card, i) => (
              <div
                key={i}
                className="rounded-3xl p-10 text-left cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: card.bg,
                  color: card.textColor,
                  transform: `rotate(${card.rotate})`,
                  marginTop: card.mt,
                  minHeight: "320px",
                }}
              >
                <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                <hr className="mb-4" style={{ borderColor: card.textColor, opacity: 0.3 }} />
                <p className="text-sm leading-relaxed" style={{ opacity: 0.85 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN IMAGEN */}
        <section className="bg-[#0A0A0A] pt-0 pb-10 flex items-center justify-center overflow-hidden">
          <img
            src="/grafico.png"
            alt="Gráfico Real o Fake"
            className="w-full object-contain"
          />
        </section>

        {/* ARMA TU NOTICIA — fondo negro */}
        <section className="bg-[#0A0A0A] pt-10 pb-32 px-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              ARMA TU NOTICIA
            </h2>
            <p className="max-w-xl mx-auto text-sm text-white/100 mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {Object.keys(noticiasPorGenero).map((genero, i) => (
                <button
                  key={genero}
                  onClick={() => setGeneroSeleccionado(genero as any)}
                  className={`
  px-6 py-2 rounded-full text-sm font-medium
  cursor-pointer transition-all duration-200 hover:scale-105
  hover:bg-[#CCFF00] hover:text-black hover:border-transparent
  ${
    generoSeleccionado === genero
      ? "bg-[#FF3D00] text-white border-transparent"
      : "bg-transparent border border-white/30 text-white"
  }
`}
                >
                  {genero.charAt(0).toUpperCase() + genero.slice(1)}
                </button>
              ))}
            </div>

            {generoSeleccionado && (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
                {noticiasPorGenero[generoSeleccionado].map((noticia, i) => (
                  <NewsCard
  key={noticia.id}
  title={noticia.title}
  description={noticia.description}
  href={noticia.href}
  image={(noticia as any).image}
  variant={i}
/>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}








