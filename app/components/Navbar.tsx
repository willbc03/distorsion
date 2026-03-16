"use client";

import Link from "next/link";
import { useLang } from "./LanguageContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isNoticia = pathname.startsWith("/noticia");
  const isContacto = pathname.startsWith("/contacto");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ES" ? "es" : "en";
  }, [lang]);

  const toggleTheme = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  };

  const scrollToArmaNoticia = () => {
    setMenuOpen(false);
    const section = document.getElementById("arma-tu-noticia");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#arma-tu-noticia";
    }
  };

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md border rounded-full px-2 py-2 items-center gap-1 transition-colors duration-300 hidden md:flex
        ${dark ? "bg-white/10 border-white/20" : "bg-white/80 border-black/20"}`}>
        <Link href="/"
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${!isNoticia && !isContacto ? "bg-[#BEFE46] text-black" : dark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}>
          {t("Inicio", "Home")}
        </Link>
        <button
          onClick={scrollToArmaNoticia}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${isNoticia ? "bg-[#BEFE46] text-black" : dark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}
        >
          {t("Arma tu noticia", "Build your story")}
        </button>
        <Link href="/contacto"
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${isContacto ? "bg-[#BEFE46] text-black" : dark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}>
          {t("Contacto", "Contact")}
        </Link>
        <div className={`w-px h-4 mx-1 ${dark ? "bg-white/20" : "bg-black/20"}`} />
        <button
  onClick={() => setLang(lang === "ES" ? "EN" : "ES")}
  className={`flex items-center gap-1 px-3 py-2 rounded-full bg-[#FF3B27] transition hover:opacity-90`}
>
  <span className={`text-xs font-bold transition ${lang === "ES" ? "text-white" : "text-white/40"}`}>ES</span>
  <span className="text-xs text-white/40">/</span>
  <span className={`text-xs font-bold transition ${lang === "EN" ? "text-white" : "text-white/40"}`}>EN</span>
</button>
      </nav>

      {/* NAVBAR MOBILE */}
      <nav className={`absolute top-4 left-4 right-4 z-50 backdrop-blur-md border rounded-2xl px-4 py-3 flex items-center justify-between transition-colors duration-300 md:hidden
        ${dark ? "bg-white/10 border-white/20" : "bg-white/80 border-black/20"}`}>
       <button
  onClick={() => setLang(lang === "ES" ? "EN" : "ES")}
  className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#FF3B27]"
>
  <span className={`text-xs font-bold ${lang === "ES" ? "text-white" : "text-white/40"}`}>ES</span>
  <span className="text-xs text-white/40">/</span>
  <span className={`text-xs font-bold ${lang === "EN" ? "text-white" : "text-white/40"}`}>EN</span>
</button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5 ${dark ? "text-white" : "text-black"}`}
        >
          <span className={`block w-5 h-0.5 transition-all ${dark ? "bg-white" : "bg-black"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 transition-all ${dark ? "bg-white" : "bg-black"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 transition-all ${dark ? "bg-white" : "bg-black"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* MENU MOBILE DESPLEGADO */}
      {menuOpen && (
        <div className={`absolute top-20 left-4 right-4 z-50 backdrop-blur-md border rounded-2xl p-4 flex flex-col gap-2 md:hidden transition-colors duration-300
          ${dark ? "bg-black/80 border-white/20" : "bg-white/90 border-black/20"}`}>
          <Link href="/"
            onClick={() => setMenuOpen(false)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium
              ${!isNoticia && !isContacto ? "bg-[#BEFE46] text-black" : dark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}>
            {t("Inicio", "Home")}
          </Link>
          <button
            onClick={scrollToArmaNoticia}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium
              ${isNoticia ? "bg-[#BEFE46] text-black" : dark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}
          >
            {t("Arma tu noticia", "Build your story")}
          </button>
          <Link href="/contacto"
            onClick={() => setMenuOpen(false)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium
              ${isContacto ? "bg-[#BEFE46] text-black" : dark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}>
            {t("Contacto", "Contact")}
          </Link>
        </div>
      )}

      {/* Botón sol/luna */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: dark ? "#BEFE46" : "#0A0A0A" }}
      >
        {dark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BEFE46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </>
  );
}