"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "../../components/LanguageContext";
import Navbar from "../../components/Navbar";

type Option = { text: string; textEn: string; next: number; image?: string; };
type StoryNode = {
  type?: "text" | "subtitle" | "text-full";
  text: string;
  options?: Option[];
  ending?: { verdict: string; verdictEn: string; tone: "buena" | "mala"; };
};

const storyF1: StoryNode[] = [
  {
    type: "text",
    text: "La FIA presentó el nuevo reglamento técnico para la temporada 2026, generando un intenso debate en el paddock sobre su impacto en la competitividad.",
    options: [
      { text: "Los organizadores del campeonato estudian la posibilidad de añadir nuevas sedes al calendario, incluyendo circuitos urbanos en distintas ciudades del mundo. La propuesta busca ampliar la presencia global del deporte.", textEn: "Championship organizers are studying the possibility of adding new venues to the calendar, including urban circuits in different cities around the world. The proposal seeks to expand the sport's global presence.", next: 1, image: "/tenis.jpg" },
      { text: "Varios pilotos han expresado su preocupación por cómo las nuevas regulaciones podrían afectar las dinámicas de adelantamiento y la gestión de energía durante las carreras. Algunos ingenieros señalan que los cambios podrían obligar a replantear estrategias que durante años definieron el desarrollo de los monoplazas.", textEn: "Several drivers have expressed concern about how the new regulations could affect overtaking dynamics and energy management during races. Some engineers note that the changes could force a rethink of strategies that for years defined the development of the cars.", next: 1, image: "/f1.jpg" },
    ],
  },
  {
    type: "subtitle",
    text: "Los datos preliminares empiezan a dar forma a la cobertura del hecho.",
    options: [
      { text: "NUEVO SISTEMA DE ENERGÍA PODRÍA NIVELAR EL CAMPO", textEn: "NEW ENERGY SYSTEM COULD LEVEL THE PLAYING FIELD", next: 2 },
      { text: "SE ESPECULA QUE LOS CAMBIOS FAVORECEN A LOS MÁS RICOS", textEn: "SPECULATION THAT CHANGES FAVOR THE WEALTHIEST TEAMS", next: 3 },
    ],
  },
  {
    type: "text",
    text: "",
    options: [
      { text: "Ingenieros de distintos equipos coinciden en que el nuevo sistema de recuperación de energía requerirá un rediseño completo de las estrategias de carrera. Los cambios en la unidad de potencia implican repensar desde la gestión de batería hasta la distribución de frenada regenerativa, lo que podría abrir la puerta a equipos medianos.", textEn: "Engineers from different teams agree that the new energy recovery system will require a complete redesign of race strategies. Changes in the power unit mean rethinking everything from battery management to regenerative braking distribution, which could open the door to midfield teams.", next: 4 },
      { text: "Se priorizan declaraciones alarmistas de pilotos sin contrastar con datos técnicos verificados. La nota pierde rigor en favor del impacto emocional.", textEn: "Alarmist statements from drivers are prioritized without cross-checking with verified technical data. The story loses rigor in favor of emotional impact.", next: 5 },
    ],
  },
  {
    type: "text",
    text: "",
    options: [
      { text: "El equipo editorial decide contrastar las especulaciones con fuentes técnicas oficiales antes de publicar. La nota recupera solidez.", textEn: "The editorial team decides to cross-check speculation with official technical sources before publishing. The story recovers its solidity.", next: 4 },
      { text: "Fuentes cercanas a varios equipos aseguran que los cambios perjudicarán a los pilotos, sin datos concretos que lo respalden. La especulación avanza.", textEn: "Sources close to several teams claim the changes will harm drivers, without concrete data to back it up. Speculation advances.", next: 5 },
    ],
  },
  {
    type: "text-full",
    text: "",
    options: [
      { text: "La nota final incluye declaraciones de pilotos, ingenieros y directivos de múltiples equipos, ofreciendo una visión equilibrada y bien contextualizada que permite al lector formarse su propia opinión con datos verificados.", textEn: "The final story includes statements from drivers, engineers and executives from multiple teams, offering a balanced and well-contextualized view that allows readers to form their own opinion with verified data.", next: 6, image: "/f1.jpg" },
      { text: "En el último momento se cedió a la presión y se incluyeron rumores sin confirmar que debilitaron la credibilidad de toda la nota.", textEn: "At the last moment, pressure led to including unconfirmed rumors that weakened the credibility of the entire story.", next: 7, image: "/tenis.jpg" },
    ],
  },
  {
    type: "text-full",
    text: "",
    options: [
      { text: "A pesar del camino irregular, el cierre de la nota logró recuperar el rigor. Se añadió contexto técnico real que equilibró la cobertura.", textEn: "Despite the irregular path, the story's conclusion managed to recover rigor. Real technical context was added that balanced the coverage.", next: 6, image: "/f1.jpg" },
      { text: "La especulación se viralizó en redes sociales antes de que ningún medio la verificara, dificultando enormemente la corrección posterior del error. Una vez instalado el rumor, resultó casi imposible desmentirlo.", textEn: "Speculation went viral on social media before any outlet could verify it, making subsequent correction of the error extremely difficult. Once the rumor was embedded, it proved almost impossible to debunk.", next: 7, image: "/tenis.jpg" },
    ],
  },
  { text: "", ending: { verdict: "Tu nota informó con rigor sobre los cambios y su impacto real en la Fórmula 1.", verdictEn: "Your story rigorously informed about the changes and their real impact on Formula 1.", tone: "buena" } },
  { text: "", ending: { verdict: "Tu nota generó controversia innecesaria y desinformó sobre el reglamento.", verdictEn: "Your story generated unnecessary controversy and misinformed about the regulations.", tone: "mala" } },
];

const stories: Record<string, StoryNode[]> = {
  "1": storyF1, "2": storyF1, "3": storyF1, "4": storyF1,
  "5": storyF1, "6": storyF1, "7": storyF1, "8": storyF1,
  "9": storyF1, "10": storyF1, "11": storyF1, "12": storyF1,
};

const F1_TITLE    = { es: "Pilotos cuestionan las nuevas regulaciones de la Fórmula 1", en: "Drivers Question New Formula 1 Regulations" };
const F1_SUBTITLE = { es: "Tras las primeras carreras bajo el nuevo reglamento, varias figuras del campeonato advierten que las diferencias de velocidad y la gestión de energía podrían alterar la dinámica tradicional del deporte.", en: "After the first races under the new regulations, several championship figures warn that speed differences and energy management could alter the sport's traditional dynamics." };
const F1_IMAGE    = "/f1.jpg";
const F1_TAGS     = { es: ["DEPORTES", "FÓRMULA 1"], en: ["SPORTS", "FORMULA 1"] };
const F1_INTRO    = { es: "La introducción del nuevo reglamento técnico ha generado un intenso debate dentro del paddock, donde varios pilotos y equipos cuestionan el impacto que estos cambios podrían tener en el desarrollo de las carreras.", en: "The introduction of the new technical regulations has generated an intense debate within the paddock, where several drivers and teams question the impact these changes could have on race development." };

const ids = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const titles:    Record<string, { es: string; en: string }> = Object.fromEntries(ids.map(id => [id, F1_TITLE]));
const subtitles: Record<string, { es: string; en: string }> = Object.fromEntries(ids.map(id => [id, F1_SUBTITLE]));
const images:    Record<string, string>                      = Object.fromEntries(ids.map(id => [id, F1_IMAGE]));
const tags:      Record<string, { es: string[]; en: string[] }> = Object.fromEntries(ids.map(id => [id, F1_TAGS]));
const intros:    Record<string, { es: string; en: string }> = Object.fromEntries(ids.map(id => [id, F1_INTRO]));

type ContentItem =
  | { type: "text"; text: string; image?: string }
  | { type: "subtitle"; text: string }
  | { type: "text-full"; text: string };

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

export default function NoticiaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { lang, t } = useLang();
  const story = stories[params.id];

  if (!story) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        <p>{t("Noticia no encontrada", "Story not found")}</p>
      </main>
    );
  }

  const [step, setStep] = useState(0);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [firstImage, setFirstImage] = useState<string | undefined>(undefined);
  const [roundCount, setRoundCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const current = story[step];

  const handleOption = (option: Option) => {
    const nodeType = current.type ?? "text";
    const text = lang === "ES" ? option.text : option.textEn;
    if (nodeType === "subtitle") {
      setContentItems((prev) => [...prev, { type: "subtitle", text }]);
    } else if (nodeType === "text-full") {
      setContentItems((prev) => [...prev, { type: "text-full", text }]);
    } else {
      if (option.image && !firstImage) setFirstImage(option.image);
      setContentItems((prev) => [...prev, { type: "text", text, image: option.image }]);
    }
    setStep(option.next);
    setStarted(true);
    setRoundCount(prev => prev + 1);
  };

  const handlePublish = () => {
    if (!name.trim() || !current.ending) return;
    const slug = `noticia-${params.id}-${Date.now()}`;
    localStorage.setItem(`news-${slug}`, JSON.stringify({
      title: titles[params.id][lang === "ES" ? "es" : "en"],
      subtitle: subtitles[params.id][lang === "ES" ? "es" : "en"],
      heroImage: images[params.id],
      intro: intros[params.id][lang === "ES" ? "es" : "en"],
      tags: tags[params.id][lang === "ES" ? "es" : "en"],
      contentItems,
      author: name,
      verdict: current.ending.tone,
      verdictText: lang === "ES" ? current.ending.verdict : current.ending.verdictEn,
      createdAt: new Date().toISOString(),
    }));
    router.push(`/publicada/${slug}`);
  };

  const today = new Date().toLocaleDateString(lang === "ES" ? "es-ES" : "en-US", {
    year: "numeric", month: "long", day: "numeric"
  }).toUpperCase();

  const groups = groupItems(contentItems);
  const isGoodNews = current.ending?.tone === "buena";

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-24 md:pt-32 pb-10 md:pb-16">
        <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8 text-xs font-medium tracking-widest flex-wrap">
          <span className="text-black/70 dark:text-white/70 font-medium">{today}</span>
          <span className="text-black/50 dark:text-white/50">/</span>
          {(tags[params.id][lang === "ES" ? "es" : "en"] || []).map((tag, i) => (
            <span key={i} className="border-2 border-black/60 dark:border-white/60 rounded-full px-3 py-1 text-black dark:text-white font-medium">{tag}</span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start mb-8 md:mb-10">
          <div className="min-w-0">
            <h1 className="font-title font-bold text-black dark:text-white leading-tight uppercase mb-4 md:mb-6"
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 999px)" }}>
              {titles[params.id][lang === "ES" ? "es" : "en"]}
            </h1>
            <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed">
              {subtitles[params.id][lang === "ES" ? "es" : "en"]}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-[#FF3D00] h-[280px] md:h-[500px]">
            <img src={images[params.id]} alt={titles[params.id][lang === "ES" ? "es" : "en"]}
              className="w-full h-full object-cover grayscale"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        <hr className="border-black/30 dark:border-white/30 mb-6 md:mb-8" />
        <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed mb-10 md:mb-16">
          {intros[params.id][lang === "ES" ? "es" : "en"]}
        </p>

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
                  <div className="min-w-0">
                    <h2 className="font-title font-bold text-black dark:text-white leading-tight uppercase mb-6 md:mb-8"
                      style={{ fontSize: "clamp(1.5rem, 3.8vw, 999px)" }}>
                      {group.subtitle}
                    </h2>
                    {group.texts.map((t, ti) => (
                      <p key={ti} className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed mb-6">{t.text}</p>
                    ))}
                  </div>
                  <div className="bg-[#FF3D00] overflow-hidden relative rounded-xl" style={{ minHeight: "200px" }}>
                    {(imageItem?.image || firstImage) && (
                      <img src={imageItem?.image || firstImage!} alt=""
                        className="absolute inset-0 w-full h-full object-cover grayscale"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    )}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={gi} className="mb-10">
                {group.texts.map((t, ti) => (
                  <div key={ti}>
                    <p className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed border-l-2 border-[#FF3D00] pl-4 md:pl-6 mb-6">{t.text}</p>
                    {t.image && <img src={t.image} alt="" className="w-full h-[240px] md:h-[420px] object-cover grayscale mb-6 rounded-xl" />}
                  </div>
                ))}
              </div>
            );
          }
        })}
      </section>

      {/* OPCIONES */}
      {!current.ending && current.options && (
        <section className="max-w-7xl mx-auto px-4 md:px-10 pb-16 md:pb-32">
          <h2 className="font-title font-bold text-black dark:text-white text-2xl md:text-3xl mb-6 md:mb-10">
            {started
              ? t("¿Cómo continúa la historia?", "How does the story continue?")
              : t("¿Cómo arranca tu noticia?", "How does your story start?")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {(() => {
              const opts = roundCount % 2 === 0
                ? current.options!.map((o, idx) => ({ opt: o, orig: idx }))
                : [...current.options!.map((o, idx) => ({ opt: o, orig: idx }))].reverse();
              return opts.map(({ opt, orig }, i) => {
                const isGreen = orig === 0;
                return (
                  <div key={i} className="relative">
                    {isGreen && (
                      <div className="absolute inset-0 bg-[#FF3D00] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"
                        style={{ clipPath: "polygon(5% 0, 98% 3%, 95% 88%, 100% 97%, 1% 100%, 3% 60%, 0 20%)" }} />
                    )}
                    <button
                      onClick={() => handleOption(opt)}
                      style={{
                        clipPath: i === 0
                          ? "polygon(4% 0, 100% 2%, 97% 75%, 100% 95%, 2% 100%, 0% 55%, 3% 18%)"
                          : "polygon(0 3%, 96% 0, 100% 20%, 98% 60%, 100% 97%, 4% 95%, 2% 40%)"
                      }}
                      className={`relative w-full text-left p-6 md:p-10 transition-all duration-300 hover:scale-[1.02] ${isGreen ? "bg-[#CCFF00] text-black" : "bg-[#FF3D00] text-white"}`}>
                      {isGreen ? (
                        <p className="font-title font-bold tracking-widest uppercase mb-3 text-base md:text-lg">
                          {t("OPCIÓN A", "OPTION A")}
                        </p>
                      ) : (
                        <p className="font-sans font-bold tracking-widest uppercase mb-3 text-sm">
                          {t("OPCIÓN B", "OPTION B")}
                        </p>
                      )}
                      <hr className={`mb-4 md:mb-6 ${isGreen ? "border-black/30" : "border-white/30"}`} />
                      {current.type === "subtitle" ? (
                        <p className="font-title font-bold leading-tight uppercase text-lg md:text-2xl">
                          {lang === "ES" ? opt.text : opt.textEn}
                        </p>
                      ) : (
                        <p className="text-sm md:text-base leading-relaxed">{lang === "ES" ? opt.text : opt.textEn}</p>
                      )}
                    </button>
                  </div>
                );
              });
            })()}
          </div>
        </section>
      )}

      {/* FINAL */}
      {current.ending && (
        <section className="max-w-7xl mx-auto px-4 md:px-10 pb-16 md:pb-32 text-center">
          <hr className="border-black/10 dark:border-white/10 mb-12 md:mb-24" />
          <h2 className="font-title font-bold text-black dark:text-white uppercase mb-8 md:mb-16"
            style={{ fontSize: "clamp(2rem, 6vw, 999px)" }}>
            {t("Tu noticia está lista", "Your story is ready")}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button onClick={() => setShowModal(true)} className="w-full sm:w-auto bg-[#CCFF00] text-black font-bold px-8 md:px-10 py-4 rounded-full hover:bg-white transition text-sm md:text-base">
              {t("Publicar noticia", "Publish story")}
            </button>
            <Link href={`/noticia/${params.id}`} className="w-full sm:w-auto text-center bg-[#FF3D00] text-white font-bold px-8 md:px-10 py-4 rounded-full hover:bg-red-600 transition text-sm md:text-base">
              {t("Volver a empezar", "Start over")}
            </Link>
          </div>
        </section>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className={`relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden flex flex-col md:flex-row ${isGoodNews ? "bg-[#CCFF00]" : "bg-[#FF3D00]"}`}>
            {/* Formulario — 50% */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between" style={{ minHeight: "380px" }}>
              <div>
                <div className="mb-5">
                  <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${isGoodNews ? "bg-[#FF3D00] text-white" : "bg-[#CCFF00] text-black"}`}>
                    {isGoodNews ? t("NOTICIA VERÍDICA", "VERIFIED NEWS") : t("FAKE NEWS", "FAKE NEWS")}
                  </span>
                </div>
                <h2 className={`font-title font-bold uppercase leading-tight mb-6 ${isGoodNews ? "text-black" : "text-white"}`}
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 999px)" }}>
                  {t("¿Realmente deseas publicarla?", "Do you really want to publish it?")}
                </h2>
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isGoodNews ? "text-black/60" : "text-white/70"}`}>
                  {t("Nombre y Apellido", "Full Name")}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-full bg-[#FFF5E4] text-black text-sm outline-none mb-5"
                />
                <button onClick={handlePublish}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition hover:opacity-90 ${isGoodNews ? "bg-[#FF3D00] text-white" : "bg-[#CCFF00] text-black"}`}>
                  {t("Publicar noticia", "Publish story")}
                </button>
              </div>
            </div>
            {/* Imagen — 50% */}
            <div className="hidden md:block w-1/2 relative">
              <img
                src={images[params.id]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}