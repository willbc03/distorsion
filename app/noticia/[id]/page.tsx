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

const storyInundaciones: StoryNode[] = [
  // 0
  {
    type: "text",
    text: "Fuertes lluvias provocaron inundaciones en varias zonas de Córdoba, dejando cientos de familias afectadas.",
    options: [
      { text: "Vecinos reportan que el agua subió rápidamente tras varias horas de lluvia intensa. Los barrios más afectados fueron aquellos ubicados en zonas bajas, donde el sistema de drenaje resultó insuficiente para contener el caudal.", textEn: "Residents report that water rose rapidly after several hours of intense rainfall. The most affected neighborhoods were those in low-lying areas, where the drainage system proved insufficient to handle the flow.", next: 1, image: "/activismo.jpg" },
      { text: "Habitantes aseguran que la ciudad estuvo a punto de desaparecer bajo el agua. Imágenes que circulan en redes sociales muestran calles completamente inundadas, aunque su origen y fecha exacta no han sido verificados.", textEn: "Residents claim the city was on the verge of disappearing under water. Images circulating on social media show completely flooded streets, although their origin and exact date have not been verified.", next: 2, image: "/activismo.jpg" },
    ],
  },
  // 1
  {
    type: "subtitle",
    text: "Autoridades locales informan que el fenómeno responde a lluvias intensas concentradas en pocas horas.",
    options: [
      { text: "PROTOCOLOS DE EMERGENCIA ACTIVADOS DESDE EL INICIO", textEn: "EMERGENCY PROTOCOLS ACTIVATED FROM THE START", next: 3 },
      { text: "GOBIERNO ACUSADO DE NEGLIGENCIA EN REDES", textEn: "GOVERNMENT ACCUSED OF NEGLIGENCE ON SOCIAL MEDIA", next: 3 },
    ],
  },
  // 2
  {
    type: "subtitle",
    text: "Circulan versiones exageradas que aumentan la alarma en la ciudadanía.",
    options: [
      { text: "TEORÍAS ASEGURAN QUE EL GOBIERNO OCULTÓ DATOS", textEn: "THEORIES CLAIM GOVERNMENT HID DATA", next: 3 },
      { text: "MEDIOS CONTRASTAN CON FUENTES VERIFICADAS", textEn: "MEDIA CROSS-CHECKS WITH VERIFIED SOURCES", next: 3 },
    ],
  },
  // 3
  {
    type: "text",
    text: "",
    options: [
      { text: "Se incorporan datos históricos que muestran cómo este tipo de eventos se han intensificado en los últimos años debido al cambio climático. Los expertos piden inversión en infraestructura y sistemas de alerta temprana.", textEn: "Historical data is incorporated showing how these events have intensified in recent years due to climate change. Experts call for investment in infrastructure and early warning systems.", next: 4 },
      { text: "Se minimizan las explicaciones técnicas y se opta por un enfoque emocional, publicando testimonios de víctimas sin contexto sobre las causas reales del evento.", textEn: "Technical explanations are minimized in favor of an emotional approach, publishing victim testimonies without context about the real causes of the event.", next: 4 },
    ],
  },
  // 4
  {
    type: "text",
    text: "",
    options: [
      { text: "La nota fue compartida por organismos de emergencia y citada como referencia por otros medios. La cobertura responsable generó confianza ciudadana y ayudó a coordinar la ayuda humanitaria.", textEn: "The article was shared by emergency agencies and cited as a reference by other media. The responsible coverage built public trust and helped coordinate humanitarian aid.", next: 5, image: "/activismo.jpg" },
      { text: "La nota se viralizó por su impacto emocional, pero generó pánico innecesario. Varios datos resultaron falsos y el medio debió emitir una rectificación días después.", textEn: "The article went viral due to its emotional impact, but caused unnecessary panic. Several facts turned out to be false and the outlet had to issue a correction days later.", next: 5, image: "/activismo.jpg" },
    ],
  },
  // 5
  {
    type: "text-full",
    text: "",
    options: [
      { text: "El resultado fue una cobertura que estableció un estándar en el periodismo local. Los lectores comprendieron la magnitud real del evento y las autoridades valoraron la precisión con la que el medio comunicó las medidas de emergencia.", textEn: "The result was coverage that set a standard in local journalism. Readers understood the real magnitude of the event and authorities valued the precision with which the outlet communicated emergency measures.", next: 6 },
      { text: "La falta de rigor generó un efecto dominó: otros medios replicaron la información errónea amplificando el daño. La rectificación llegó tarde y con mucho menos alcance que el error original, dejando una huella difícil de borrar en la credibilidad del medio.", textEn: "The lack of rigor created a domino effect: other media replicated the erroneous information amplifying the damage. The correction came late and with far less reach than the original error, leaving a hard-to-erase mark on the outlet's credibility.", next: 7 },
    ],
  },
  // 6
  { text: "", ending: { verdict: "Tu noticia fue informativa y responsable. ¡Bien hecho!", verdictEn: "Your story was informative and responsible. Well done!", tone: "buena" } },
  // 7
  { text: "", ending: { verdict: "Tu noticia terminó siendo desinformante y amplificó el pánico.", verdictEn: "Your story ended up being misleading and amplified panic.", tone: "mala" } },
];

const storyGobierno: StoryNode[] = [
  {
    type: "text",
    text: "El gobierno anunció una nueva medida económica que divide opiniones en la ciudadanía.",
    options: [
      { text: "Se enfatiza el miedo ciudadano, publicando reacciones de personas que temen perder beneficios sin haber leído el decreto completo. El titular usa palabras como 'colapso' y 'caos'.", textEn: "Public fear is emphasized, publishing reactions from people afraid of losing benefits without having read the full decree. The headline uses words like 'collapse' and 'chaos'.", next: 1, image: "/trump.jpg" },
      { text: "Se revisa el decreto oficial publicado en el diario oficial. El texto establece ajustes graduales con períodos de transición y mecanismos de compensación para los sectores más vulnerables.", textEn: "The official decree published in the official gazette is reviewed. The text establishes gradual adjustments with transition periods and compensation mechanisms for the most vulnerable sectors.", next: 2, image: "/petro.jpg" },
    ],
  },
  {
    type: "subtitle",
    text: "Las reacciones emocionales dominan el debate público.",
    options: [
      { text: "MENSAJES ALARMISTAS SIN CONTEXTO REAL", textEn: "ALARMIST MESSAGES WITHOUT REAL CONTEXT", next: 3 },
      { text: "EXPERTOS EXPLICAN EL IMPACTO REAL DE LA MEDIDA", textEn: "EXPERTS EXPLAIN THE REAL IMPACT OF THE MEASURE", next: 3 },
    ],
  },
  {
    type: "subtitle",
    text: "El documento oficial detalla los alcances reales de la medida.",
    options: [
      { text: "CONTEXTO LEGAL E HISTÓRICO ENRIQUECE LA NOTA", textEn: "LEGAL AND HISTORICAL CONTEXT ENRICHES THE STORY", next: 3 },
      { text: "REDES SOCIALES REEMPLAZAN LAS FUENTES OFICIALES", textEn: "SOCIAL MEDIA REPLACES OFFICIAL SOURCES", next: 3 },
    ],
  },
  {
    type: "text",
    text: "",
    options: [
      { text: "Se explica el contexto legal e histórico de la medida, comparándola con políticas similares en otros países y sus resultados. La nota incluye declaraciones de expertos independientes.", textEn: "The legal and historical context of the measure is explained, comparing it with similar policies in other countries and their results. The story includes statements from independent experts.", next: 4 },
      { text: "Se amplifican mensajes alarmistas de figuras políticas opositoras sin presentar el contexto completo ni la posición oficial. La nota omite datos económicos relevantes.", textEn: "Alarmist messages from opposition political figures are amplified without presenting the full context or the official position. The story omits relevant economic data.", next: 4 },
    ],
  },
  {
    type: "text",
    text: "",
    options: [
      { text: "La nota fue destacada por su rigor. Otros medios la tomaron como referencia y la ciudadanía pudo debatir la medida con información verificada y contextualizada.", textEn: "The story was praised for its rigor. Other media used it as a reference and citizens could debate the measure with verified and contextualized information.", next: 5, image: "/petro.jpg" },
      { text: "La nota se publicó sin verificar ninguna fuente. Generó confusión masiva y el medio tuvo que emitir una rectificación que pasó desapercibida frente al alcance original.", textEn: "The story was published without verifying any source. It caused massive confusion and the outlet had to issue a correction that went unnoticed compared to the original reach.", next: 5, image: "/trump.jpg" },
    ],
  },
  {
    type: "text-full",
    text: "",
    options: [
      { text: "El análisis profundo generó un debate informado en redes sociales. Los lectores valoraron la transparencia del medio y aumentaron su confianza en la cobertura periodística, consolidando al medio como referente en temas de política económica.", textEn: "The in-depth analysis generated an informed debate on social media. Readers valued the outlet's transparency and increased their trust in journalistic coverage, consolidating the outlet as a reference in economic policy topics.", next: 6 },
      { text: "El impacto emocional de la nota generó protestas basadas en información incorrecta. La ciudadanía tomó decisiones sin conocer los datos reales de la medida, y el medio perdió credibilidad ante su audiencia más fiel.", textEn: "The emotional impact of the story generated protests based on incorrect information. Citizens made decisions without knowing the real data of the measure, and the outlet lost credibility with its most loyal audience.", next: 7 },
    ],
  },
  { text: "", ending: { verdict: "La noticia ayudó a entender la medida y generó un debate informado.", verdictEn: "The story helped understand the measure and generated an informed debate.", tone: "buena" } },
  { text: "", ending: { verdict: "La noticia se volvió sensacionalista y desinformó a la ciudadanía.", verdictEn: "The story became sensationalist and misinformed the public.", tone: "mala" } },
];

const storyF1: StoryNode[] = [
  {
    type: "text",
    text: "La FIA presentó el nuevo reglamento técnico para la temporada 2026, generando un intenso debate en el paddock sobre su impacto en la competitividad.",
    options: [
      { text: "Los organizadores del campeonato estudian la posibilidad de añadir nuevas sedes al calendario, incluyendo circuitos urbanos en distintas ciudades del mundo. La propuesta busca ampliar la presencia global del deporte.", textEn: "Championship organizers are studying the possibility of adding new venues to the calendar, including urban circuits in different cities around the world. The proposal seeks to expand the sport's global presence.", next: 1, image: "/tenis.jpg" },
      { text: "Varios pilotos han expresado su preocupación por cómo las nuevas regulaciones podrían afectar las dinámicas de adelantamiento y la gestión de energía durante las carreras. Algunos ingenieros señalan que los cambios podrían obligar a replantear estrategias que durante años definieron el desarrollo de los monoplazas.", textEn: "Several drivers have expressed concern about how the new regulations could affect overtaking dynamics and energy management during races. Some engineers note that the changes could force a rethink of strategies that for years defined the development of the cars.", next: 2, image: "/f1.jpg" },
    ],
  },
  {
    type: "subtitle",
    text: "El enfoque en la expansión comercial genera dudas sobre las prioridades del campeonato.",
    options: [
      { text: "FUENTES ANÓNIMAS ALERTAN SOBRE EXCESO DE CARRERAS", textEn: "ANONYMOUS SOURCES WARN ABOUT TOO MANY RACES", next: 3 },
      { text: "LA FIA PUBLICA CRITERIOS TÉCNICOS DEL CAMBIO", textEn: "FIA PUBLISHES TECHNICAL CRITERIA FOR THE CHANGE", next: 3 },
    ],
  },
  {
    type: "subtitle",
    text: "Las preocupaciones técnicas abren un debate legítimo sobre el futuro del deporte.",
    options: [
      { text: "NUEVO SISTEMA DE ENERGÍA PODRÍA NIVELAR EL CAMPO", textEn: "NEW ENERGY SYSTEM COULD LEVEL THE PLAYING FIELD", next: 3 },
      { text: "SE ESPECULA QUE LOS CAMBIOS FAVORECEN A LOS MÁS RICOS", textEn: "SPECULATION THAT CHANGES FAVOR THE WEALTHIEST TEAMS", next: 3 },
    ],
  },
  {
    type: "text",
    text: "",
    options: [
      { text: "Ingenieros de distintos equipos coinciden en que el nuevo sistema de recuperación de energía requerirá un rediseño completo de las estrategias de carrera. Los cambios en la unidad de potencia implican repensar desde la gestión de batería hasta la distribución de frenada regenerativa, lo que podría abrir la puerta a equipos medianos que hasta ahora no podían competir en igualdad de condiciones.", textEn: "Engineers from different teams agree that the new energy recovery system will require a complete redesign of race strategies. Changes in the power unit mean rethinking everything from battery management to regenerative braking distribution, which could open the door to midfield teams that until now couldn't compete on equal footing.", next: 4 },
      { text: "Fuentes cercanas a varios equipos aseguran que la expansión del calendario podría perjudicar seriamente el rendimiento de los pilotos debido al agotamiento acumulado. La fatiga física y mental de competir en más de 24 fechas anuales ya es un tema recurrente en el paddock, y las nuevas sedes propuestas solo agravan la situación.", textEn: "Sources close to several teams claim that the calendar expansion could seriously harm driver performance due to accumulated fatigue. The physical and mental strain of competing in more than 24 annual races is already a recurring topic in the paddock, and the proposed new venues only worsen the situation.", next: 4 },
    ],
  },
  {
    type: "text",
    text: "",
    options: [
      { text: "La nota final incluye declaraciones de pilotos, ingenieros y directivos de múltiples equipos, ofreciendo una visión equilibrada y bien contextualizada que permite al lector formarse su propia opinión con datos verificados.", textEn: "The final story includes statements from drivers, engineers and executives from multiple teams, offering a balanced and well-contextualized view that allows readers to form their own opinion with verified data.", next: 5, image: "/f1.jpg" },
      { text: "Varios medios replican los rumores sin contrastar fuentes, amplificando la incertidumbre en el paddock y entre los aficionados. La cobertura prioriza el impacto emocional sobre la precisión informativa.", textEn: "Several outlets replicate the rumors without cross-checking sources, amplifying uncertainty in the paddock and among fans. Coverage prioritizes emotional impact over informational accuracy.", next: 5, image: "/tenis.jpg" },
    ],
  },
  {
    type: "text-full",
    text: "",
    options: [
      { text: "El resultado fue una cobertura que estableció un estándar en el periodismo deportivo. Los lectores comprendieron los cambios técnicos con claridad, los equipos valoraron la precisión del medio y la nota se convirtió en referencia para el debate dentro y fuera del paddock.", textEn: "The result was coverage that set a standard in sports journalism. Readers clearly understood the technical changes, teams valued the outlet's precision, and the story became a reference for debate inside and outside the paddock.", next: 6 },
      { text: "La especulación se viralizó en redes sociales antes de que ningún medio la verificara, dificultando enormemente la corrección posterior del error. Una vez instalado el rumor en el imaginario colectivo, resultó casi imposible desmentirlo.", textEn: "Speculation went viral on social media before any outlet could verify it, making subsequent correction of the error extremely difficult. Once the rumor was embedded in the collective imagination, it proved almost impossible to debunk.", next: 7 },
    ],
  },
  { text: "", ending: { verdict: "Tu nota informó con rigor sobre los cambios y su impacto real en la Fórmula 1.", verdictEn: "Your story rigorously informed about the changes and their real impact on Formula 1.", tone: "buena" } },
  { text: "", ending: { verdict: "Tu nota generó controversia innecesaria y desinformó sobre el reglamento.", verdictEn: "Your story generated unnecessary controversy and misinformed about the regulations.", tone: "mala" } },
];

const stories: Record<string, StoryNode[]> = {
  "1": storyInundaciones,
  "2": storyGobierno,
  "3": storyF1,
};

const titles: Record<string, { es: string; en: string }> = {
  "1": { es: "Crisis en la ciudad", en: "City in Crisis" },
  "2": { es: "Decisión gubernamental", en: "Government Decision" },
  "3": { es: "Pilotos cuestionan las nuevas regulaciones de la Fórmula 1", en: "Drivers Question New Formula 1 Regulations" },
};

const subtitles: Record<string, { es: string; en: string }> = {
  "1": { es: "Cientos de familias afectadas tras las lluvias en Córdoba.", en: "Hundreds of families affected after the rains in Córdoba." },
  "2": { es: "Una medida que divide a la ciudadanía.", en: "A measure that divides the public." },
  "3": { es: "Tras las primeras carreras bajo el nuevo reglamento, varias figuras del campeonato advierten que las diferencias de velocidad y la gestión de energía podrían alterar la dinámica tradicional del deporte.", en: "After the first races under the new regulations, several championship figures warn that speed differences and energy management could alter the sport's traditional dynamics." },
};

const images: Record<string, string> = {
  "1": "/activismo.jpg",
  "2": "/petro.jpg",
  "3": "/f1.jpg",
};

const tags: Record<string, { es: string[]; en: string[] }> = {
  "1": { es: ["SOCIEDAD", "CÓRDOBA"],    en: ["SOCIETY", "CÓRDOBA"] },
  "2": { es: ["POLÍTICA", "GOBIERNO"],   en: ["POLITICS", "GOVERNMENT"] },
  "3": { es: ["DEPORTES", "FÓRMULA 1"], en: ["SPORTS", "FORMULA 1"] },
};

const intros: Record<string, { es: string; en: string }> = {
  "1": { es: "Las intensas precipitaciones dejaron al descubierto la vulnerabilidad de la infraestructura urbana. El nivel del agua superó los registros históricos en algunos sectores, obligando a evacuaciones masivas.", en: "The intense rainfall exposed the vulnerability of urban infrastructure. Water levels exceeded historical records in some areas, forcing mass evacuations." },
  "2": { es: "La introducción del nuevo decreto ha generado un intenso debate en el congreso y entre la ciudadanía, donde distintos sectores cuestionan el impacto que estas medidas podrían tener.", en: "The introduction of the new decree has generated an intense debate in congress and among citizens, where different sectors question the impact these measures could have." },
  "3": { es: "La introducción del nuevo reglamento técnico ha generado un intenso debate dentro del paddock, donde varios pilotos y equipos cuestionan el impacto que estos cambios podrían tener en el desarrollo de las carreras.", en: "The introduction of the new technical regulations has generated an intense debate within the paddock, where several drivers and teams question the impact these changes could have on race development." },
};

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

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">

      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 pt-32 pb-16">
        <div className="flex items-center gap-4 mb-8 text-xs font-medium tracking-widest">
          <span className="text-black/70 dark:text-white/70 font-medium">{today}</span>
          <span className="text-black/50 dark:text-white/50">/</span>
          {(tags[params.id][lang === "ES" ? "es" : "en"] || []).map((tag, i) => (
            <span key={i} className="border-2 border-black/60 dark:border-white/60 rounded-full px-4 py-1 text-black dark:text-white font-medium">{tag}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-12 items-start mb-10 overflow-hidden">
          <div>
            <h1 className="font-serif font-bold text-black dark:text-white leading-tight uppercase mb-6"
              style={{ fontSize: "clamp(2rem, 3.8vw, 999px)" }}>
              {titles[params.id][lang === "ES" ? "es" : "en"]}
            </h1>
            <p className="text-black/70 dark:text-white/70 text-base leading-relaxed max-w-lg">
              {subtitles[params.id][lang === "ES" ? "es" : "en"]}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-[#FF3D00] h-[500px]">
            <img src={images[params.id]} alt={titles[params.id][lang === "ES" ? "es" : "en"]}
              className="w-full h-full object-cover grayscale"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        <hr className="border-black/30 dark:border-white/30 mb-8" />
        <p className="text-black/70 dark:text-white/70 text-base leading-relaxed mb-16">
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
                  <p key={ti} className="text-black/80 dark:text-white/80 text-base leading-relaxed mb-6">{t.text}</p>
                ))}
              </div>
            );
          } else if (hasSubtitle) {
            return (
              <div key={gi} className="mb-16">
                <hr className="border-black/10 dark:border-white/10 mb-10" />
                <div className="grid grid-cols-2 gap-12 items-stretch">
                  <div>
                    <h2 className="font-serif font-bold text-black dark:text-white leading-tight uppercase mb-8"
                      style={{ fontSize: "clamp(2rem, 3.8vw, 999px)" }}>
                      {group.subtitle}
                    </h2>
                    {group.texts.map((t, ti) => (
                      <p key={ti} className="text-black/80 dark:text-white/80 text-base leading-relaxed mb-6">{t.text}</p>
                    ))}
                  </div>
                  <div className="bg-[#FF3D00] overflow-hidden relative" style={{ minHeight: "200px" }}>
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
                    <p className="text-black/80 dark:text-white/80 text-base leading-relaxed border-l-2 border-[#FF3D00] pl-6 mb-6">{t.text}</p>
                    {t.image && <img src={t.image} alt="" className="w-full h-[420px] object-cover grayscale mb-6" />}
                  </div>
                ))}
              </div>
            );
          }
        })}
      </section>

      {/* OPCIONES */}
      {!current.ending && current.options && (
        <section className="max-w-7xl mx-auto px-10 pb-32">
          <h2 className="font-serif font-bold text-black dark:text-white text-3xl mb-10">
            {started
              ? t("¿Cómo continúa la historia?", "How does the story continue?")
              : t("¿Cómo arranca tu noticia?", "How does your story start?")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(() => {
              const opts = roundCount % 2 === 0
                ? current.options!.map((o, idx) => ({ opt: o, orig: idx }))
                : [...current.options!.map((o, idx) => ({ opt: o, orig: idx }))].reverse();
              return opts.map(({ opt, orig }, i) => {
                const isGreen = orig === 0;
                return (
                  <div key={i} className="relative">
                    {isGreen && (
                      <div className="absolute inset-0 bg-[#FF3D00] translate-x-4 translate-y-4"
                        style={{ clipPath: "polygon(5% 0, 98% 3%, 95% 88%, 100% 97%, 1% 100%, 3% 60%, 0 20%)" }} />
                    )}
                    <button
                      onClick={() => handleOption(opt)}
                      style={{
                        clipPath: i === 0
                          ? "polygon(4% 0, 100% 2%, 97% 75%, 100% 95%, 2% 100%, 0% 55%, 3% 18%)"
                          : "polygon(0 3%, 96% 0, 100% 20%, 98% 60%, 100% 97%, 4% 95%, 2% 40%)"
                      }}
                      className={`relative w-full text-left p-10 transition-all duration-300 hover:scale-[1.02] ${isGreen ? "bg-[#CCFF00] text-black" : "bg-[#FF3D00] text-white"}`}>
                      {isGreen ? (
                        <p className="font-serif font-bold tracking-widest uppercase mb-3" style={{ fontSize: "clamp(1.1rem, 1.4vw, 999px)" }}>
                          {t("OPCIÓN A", "OPTION A")}
                        </p>
                      ) : (
                        <p className="font-sans font-bold tracking-widest uppercase mb-3 text-sm">
                          {t("OPCIÓN B", "OPTION B")}
                        </p>
                      )}
                      <hr className={`mb-6 ${isGreen ? "border-black/30" : "border-white/30"}`} />
                      {current.type === "subtitle" ? (
                        <p className="font-serif font-bold leading-tight uppercase"
                          style={{ fontSize: "clamp(1.2rem, 2vw, 999px)" }}>
                          {lang === "ES" ? opt.text : opt.textEn}
                        </p>
                      ) : (
                        <p className="text-base leading-relaxed">{lang === "ES" ? opt.text : opt.textEn}</p>
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
        <section className="max-w-7xl mx-auto px-10 pb-32 text-center">
          <hr className="border-black/10 dark:border-white/10 mb-24" />
          <h2 className="font-serif font-bold text-black dark:text-white uppercase mb-16" style={{ fontSize: "clamp(3rem, 6vw, 999px)" }}>
            {t("Tu noticia está lista", "Your story is ready")}
          </h2>
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => setShowModal(true)} className="bg-[#CCFF00] text-black font-bold px-10 py-4 rounded-full hover:bg-white transition text-base">
              {t("Publicar noticia", "Publish story")}
            </button>
            <Link href={`/noticia/${params.id}`} className="bg-[#FF3D00] text-white font-bold px-10 py-4 rounded-full hover:bg-red-600 transition text-base">
              {t("Volver a empezar", "Start over")}
            </Link>
          </div>
        </section>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#FF3D00] rounded-3xl p-12 w-full max-w-xl mx-6 z-10">
            <div className="mb-8">
              <span className={`inline-block rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase ${current.ending?.tone === "buena" ? "bg-[#CCFF00] text-black" : "bg-black text-white"}`}>
                {current.ending?.tone === "buena" ? t("NOTICIA REAL", "REAL NEWS") : t("FAKE NEWS", "FAKE NEWS")}
              </span>
            </div>
            <h2 className="font-serif font-bold text-white uppercase leading-tight mb-10" style={{ fontSize: "clamp(2rem, 3.5vw, 999px)" }}>
              {t("¿Realmente deseas publicarla?", "Do you really want to publish it?")}
            </h2>
            <label className="block text-white/80 text-sm font-medium mb-2">
              {t("Nombre y Apellido", "Full Name")}
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-full bg-[#FFF5E4] text-black text-base outline-none mb-8"
            />
            <button onClick={handlePublish} className="bg-[#CCFF00] text-black font-bold px-10 py-4 rounded-full hover:bg-white transition text-base">
              {t("Publicar noticia", "Publish story")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}