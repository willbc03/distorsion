"use client";

import Navbar from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import NewsCard from "./components/NewsCard";
import { useLang } from "./components/LanguageContext";

const noticiasPorGenero = {
  deportes: [
    { id: 1, title: "Polémica arbitral en el Bayern Múnich", titleEn: "Refereeing controversy at Bayern Munich", description: "El Bayern apeló la expulsión de Luis Díaz tras el reconocimiento del árbitro.", descriptionEn: "Bayern appealed Luis Díaz's red card after the referee acknowledged the harsh decision.", href: "/noticia/1", image: "/bayerncard.jpg", imagePosition: "center center", imageScale: 1 },
    { id: 2, title: "Venezuela avanza al Clásico Mundial", titleEn: "Venezuela advances at the World Baseball Classic", description: "La selección derrotó 8-5 a Japón y aseguró su clasificación a los Juegos Olímpicos 2028.", descriptionEn: "The team defeated Japan 8-5 and secured their qualification for the 2028 Olympics.", href: "/noticia/2", image: "/venezuelacard.jpg", imagePosition: "center top", imageScale: 1 },
    { id: 3, title: "Debate sobre el presupuesto deportivo", titleEn: "Debate over the sports budget", description: "El recorte para 2026 preocupa a federaciones y atletas colombianos.", descriptionEn: "The 2026 budget cut raises concern among Colombian federations and athletes.", href: "/noticia/3", image: "/debatecard.jpg", imagePosition: "right center", imageScale: 1 },
  ],
  farandula: [
    { id: 4, title: "Polilla habla de cartas de la Gorda Fabiola", titleEn: "Polilla speaks about La Gorda Fabiola's letters", description: "El comediante encontró cartas y poemas escritos por su esposa durante su proceso de duelo.", descriptionEn: "The comedian found letters and poems written by his wife during his grieving process.", href: "/noticia/4", image: "/polillacard.jpg", imagePosition: "center center", imageScale: 1 },
    { id: 5, title: "Valdiri regaló esmeraldas en los 15 de su hija", titleEn: "Valdiri gifted emeralds at her daughter's quinceañera", description: "La fiesta en Cartagena sorprendió con dijes de esmeralda como recuerdo para los invitados.", descriptionEn: "The Cartagena party surprised guests with emerald charms as keepsakes.", href: "/noticia/5", image: "/valdiricard.jpg", imagePosition: "center top", imageScale: 1 },
    { id: 6, title: "F1: Antonelli gana en Shanghái y apunta alto", titleEn: "F1: Antonelli wins in Shanghai and aims high", description: "El piloto de Mercedes logró su primera victoria en F1 con una actuación que sorprendió a su propio equipo.", descriptionEn: "The Mercedes driver secured his first F1 win with a performance that surprised even his own team.", href: "/noticia/6", image: "/kimicard.jpg", imagePosition: "right center top", imageScale: 1 },
  ],
  social: [
    { id: 7, title: "Alerta por posible 'super El Niño'", titleEn: "Warning over possible 'super El Niño'", description: "Científicos monitorean señales en el Pacífico que podrían indicar un fenómeno climático intenso.", descriptionEn: "Scientists monitor Pacific signals that could indicate an intense climate phenomenon.", href: "/noticia/7", image: "/ninocard.jpg", imagePosition: "center center" },
    { id: 8, title: "Colombia y Venezuela contra el narcotráfico", titleEn: "Colombia and Venezuela against drug trafficking", description: "Ambos países anunciaron operaciones espejo en la frontera para combatir redes criminales.", descriptionEn: "Both countries announced mirror operations on the border to combat criminal networks.", href: "/noticia/8", image: "/narcocard.jpg", imagePosition: "center center" },
    { id: 9, title: "¿La IA reemplazará a los trabajadores?", titleEn: "Will AI replace workers?", description: "Expertos debaten si la inteligencia artificial eliminará empleos o creará nuevas oportunidades.", descriptionEn: "Experts debate whether artificial intelligence will eliminate jobs or create new opportunities.", href: "/noticia/9", image: "/iacard.jpg", imagePosition: "center center" },
  ],
  ciencia: [
    { id: 10, title: "Vacuna nasal contra virus y alergias", titleEn: "Nasal vaccine against viruses and allergies", description: "Investigadores presentaron una vacuna experimental que activa defensas frente a virus, bacterias y alérgenos.", descriptionEn: "Researchers presented an experimental vaccine that activates defenses against viruses, bacteria and allergens.", href: "/noticia/10", image: "/science-fake.jpg", imagePosition: "center center" },
    { id: 11, title: "Eclipse lunar teñirá la Luna de rojo", titleEn: "Lunar eclipse will turn the Moon red", description: "El 3 de marzo de 2026 la Luna adquirirá un tono rojizo visible en distintas partes del mundo.", descriptionEn: "On March 3, 2026 the Moon will turn reddish and be visible across different parts of the world.", href: "/noticia/11", image: "/ciencia.jpg", imagePosition: "center center" },
    { id: 12, title: "Mascotas y salud: vivir con perros", titleEn: "Pets and health: living with dogs", description: "Estudios sugieren que convivir con perros podría mejorar indicadores de bienestar físico y mental.", descriptionEn: "Studies suggest that living with dogs could improve physical and mental wellbeing indicators.", href: "/noticia/12", image: "/ia.jpg", imagePosition: "center center" },
  ],
};

const generosLabel: Record<keyof typeof noticiasPorGenero, { es: string; en: string }> = {
  deportes:  { es: "Deportes",  en: "Sports"       },
  farandula: { es: "Farándula", en: "Entertainment" },
  social:    { es: "Social",    en: "Social"        },
  ciencia:   { es: "Ciencia",   en: "Science"       },
};

const tarjetasInfo = [
  { titleEs: "¿Quiénes somos?",   titleEn: "Who are we?",    descEs: "Somos un proyecto académico enfocado en analizar la relación entre diseño, información y percepción. Buscamos evidenciar cómo los elementos visuales pueden influir en la forma en que las personas entienden una noticia.", descEn: "We are an academic project focused on analyzing the relationship between design, information, and perception. We seek to show how visual elements can influence the way people understand a news story.", bg: "#BEFE46", textColor: "#000000", rotate: "-2deg", mt: "0px" },
  { titleEs: "¿Qué hacemos?",     titleEn: "What do we do?", descEs: "Creamos una experiencia donde el usuario arma una noticia a partir de distintos fragmentos de información. Durante el proceso se revela cómo el diseño puede guiar decisiones y generar interpretaciones erróneas.", descEn: "We create an experience where the user builds a news story from different pieces of information. Throughout the process, it reveals how design can guide decisions and generate mistaken interpretations.", bg: "#FF3B27", textColor: "#ffffff", rotate: "2deg",  mt: "-20px" },
  { titleEs: "Nuestro propósito", titleEn: "Our purpose",    descEs: "Fomentar una lectura crítica de la información digital y reflexionar sobre la responsabilidad del diseño en la manera en que las noticias se presentan, interpretan y comparten.", descEn: "To foster critical reading of digital information and reflect on the responsibility of design in the way news is presented, interpreted, and shared.", bg: "#BEFE46", textColor: "#000000", rotate: "3deg",  mt: "0px" },
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

  const audioRef = useRef<HTMLAudioElement>(null);
const [muted, setMuted] = useState(true);

const toggleAudio = () => {
  if (!audioRef.current) return;
  if (muted) {
    audioRef.current.play();
    setMuted(false);
  } else {
    audioRef.current.pause();
    setMuted(true);
  }
};

useEffect(() => {
  if (window.location.hash === "#arma-tu-noticia") {
    const section = document.getElementById("arma-tu-noticia");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }
}, []);

  return (
    <main className="text-black dark:text-white">
      <Navbar />

      <audio ref={audioRef} loop src="/glitch-sound.mp3" />

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
  style={{ 
    objectFit: "contain", 
    transform: "scale(1.3)", 
    transformOrigin: "center center",
    mixBlendMode: "screen"
  }}
>
  <source src="/DISTORSION-titulo.webm" type="video/webm" />
  <source src="/DISTORSION-titulo.mp4" type="video/mp4" />
</video>
        </div>
      </section>

      <div className="relative z-10">

        {/* QUÉ ES DISTORSIÓN */}
        <section className="bg-[#F5F5F5] dark:bg-transparent pt-16 md:pt-32 pb-10 px-4 md:px-10 overflow-hidden transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-title font-bold mb-6 md:mb-8 text-black dark:text-white">
              {t("¿QUÉ ES DISTORSIÓN?", "WHAT IS DISTORTION?")}
            </h2>
            <p className="max-w-2xl mx-auto text-xs md:text-sm text-black/70 dark:text-white/80">
  {t(
    "Es una experiencia interactiva que explora cómo el diseño puede influir en la forma en que interpretamos la información. A través de decisiones visuales y contenido fragmentado, el usuario descubre cómo una noticia puede parecer creíble incluso cuando está distorsionada.",
    "It's an interactive experience that explores how design can influence the way we interpret information. Through visual decisions and fragmented content, the user discovers how a news story can seem credible even when it's distorted."
  )}
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
                <p className="text-[10px] md:text-xs leading-relaxed" style={{ opacity: 0.85 }}>{t(card.descEs, card.descEn)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IMAGEN */}
        <section className="bg-[#F5F5F5] dark:bg-transparent pt-0 pb-10 flex items-center justify-center overflow-hidden transition-colors duration-300">
          <img src={lang === "ES" ? "/grafico.png" : "/grafico-en.png"} alt="Gráfico Real o Fake" className="w-full object-contain" />
        </section>

        {/* ARMA TU NOTICIA */}
        <section id="arma-tu-noticia" className="bg-[#F5F5F5] dark:bg-transparent pt-10 pb-16 md:pb-32 px-4 md:px-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-title font-bold mb-4 md:mb-6 text-black dark:text-white">
              {t("ARMA TU NOTICIA", "BUILD YOUR STORY")}
            </h2>
            <p className="max-w-xl mx-auto text-xs md:text-sm mb-8 md:mb-12 text-black/70 dark:text-white/80">
  {t(
    "Elige fragmentos, conecta ideas y construye una historia.",
    "Choose fragments, connect ideas and build a story."
  )}
</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-16">
              {(Object.keys(noticiasPorGenero) as Array<keyof typeof noticiasPorGenero>).map((genero) => (
                <button key={genero} onClick={() => setGeneroSeleccionado(genero)}
                  className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-[#BEFE46] hover:text-black hover:border-transparent
                    ${generoSeleccionado === genero
                      ? "bg-[#FF3B27] text-white border-transparent"
                      : "bg-transparent border border-black/30 text-black dark:border-white/30 dark:text-white"
                    }`}>
                  {lang === "ES" ? generosLabel[genero].es : generosLabel[genero].en}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {noticiasPorGenero[generoSeleccionado].map((noticia, i) => (
                <NewsCard
  key={noticia.id}
  title={lang === "ES" ? noticia.title : (noticia as any).titleEn}
  description={lang === "ES" ? noticia.description : (noticia as any).descriptionEn}
  href={noticia.href}
  image={(noticia as any).image}
  imagePosition={(noticia as any).imagePosition}
  imageScale={(noticia as any).imageScale}
  variant={i}
/>
              ))}
            </div>
          </div>
        </section>

      </div>

<button
  onClick={toggleAudio}
  className="fixed bottom-[78px] right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
  style={{ backgroundColor: muted ? "#0A0A0A" : "#BEFE46" }}
>
  {muted ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BEFE46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  )}
</button>

    </main>
  );
}