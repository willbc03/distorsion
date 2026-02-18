"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =====================
   TIPOS
===================== */
type Option = {
  text: string;
  next: number;
};

type StoryNode = {
  text: string;
  options?: Option[];
  ending?: {
    verdict: string;
    tone: "buena" | "mala";
  };
};

/* =====================
   HISTORIAS
===================== */

/* NOTICIA 1 — INUNDACIONES */
const storyInundaciones: StoryNode[] = [
  {
    text: "Fuertes lluvias provocaron inundaciones en varias zonas de Córdoba, dejando cientos de familias afectadas.",
    options: [
      {
        text: "Vecinos reportan que el agua subió rápidamente tras varias horas de lluvia intensa.",
        next: 1,
      },
      {
        text: "Habitantes aseguran que la ciudad estuvo a punto de desaparecer bajo el agua.",
        next: 2,
      },
    ],
  },
  {
    text: "Autoridades locales informan que el fenómeno responde a lluvias intensas concentradas en pocas horas.",
    options: [
      { text: "Desde la alcaldía explican la situación técnica.", next: 3 },
      { text: "En redes se acusa una supuesta negligencia estatal.", next: 4 },
    ],
  },
  {
    text: "Circulan versiones exageradas que aumentan la alarma.",
    options: [
      { text: "Se viralizan teorías sin fundamento.", next: 4 },
      { text: "Algunos medios contrastan la información.", next: 3 },
    ],
  },
  {
    text: "Especialistas explican patrones meteorológicos conocidos.",
    options: [
      { text: "Se incorporan datos históricos.", next: 5 },
      { text: "Se minimizan las explicaciones técnicas.", next: 4 },
    ],
  },
  {
    text: "La narrativa se llena de especulación y miedo.",
    options: [
      { text: "Se publica sin verificar.", next: 6 },
      { text: "Se exagera el impacto humano.", next: 6 },
    ],
  },
  {
    text: "La cobertura incorpora contexto y datos verificados.",
    options: [
      { text: "Publicar la noticia con responsabilidad.", next: 7 },
      { text: "Simplificar la información para impacto.", next: 6 },
    ],
  },
  {
    text: "La noticia prioriza el impacto emocional.",
    ending: {
      verdict:
        "Tu noticia terminó siendo desinformante y amplificó el pánico.",
      tone: "mala",
    },
  },
  {
    text: "La noticia permite comprender lo ocurrido.",
    ending: {
      verdict: "Tu noticia fue informativa y responsable.",
      tone: "buena",
    },
  },
];

/* NOTICIA 2 — GOBIERNO */
const storyGobierno: StoryNode[] = [
  {
    text: "El gobierno anunció una nueva medida que divide opiniones.",
    options: [
      { text: "Se enfatiza el miedo ciudadano.", next: 1 },
      { text: "Se revisa el decreto oficial.", next: 2 },
    ],
  },
  {
    text: "Las reacciones emocionales dominan el debate.",
    options: [
      { text: "Se amplifican mensajes alarmistas.", next: 3 },
      { text: "Se buscan voces expertas.", next: 4 },
    ],
  },
  {
    text: "El documento oficial detalla los alcances reales.",
    options: [
      { text: "Se explica el contexto legal.", next: 4 },
      { text: "Se ignora el documento.", next: 3 },
    ],
  },
  {
    text: "La cobertura se basa en rumores y miedo.",
    ending: {
      verdict: "La noticia se volvió sensacionalista.",
      tone: "mala",
    },
  },
  {
    text: "El análisis incorpora contexto legal y social.",
    ending: {
      verdict: "La noticia ayudó a entender la medida.",
      tone: "buena",
    },
  },
];

/* NOTICIA 3 — TECNOLOGÍA */
const storyTecnologia: StoryNode[] = [
  {
    text: "Una nueva tecnología promete cambiarlo todo.",
    options: [
      { text: "Se exagera el impacto.", next: 1 },
      { text: "Se analizan límites reales.", next: 2 },
    ],
  },
  {
    text: "Las expectativas crecen sin sustento técnico.",
    options: [
      { text: "Se vende como revolución inmediata.", next: 3 },
      { text: "Se ignoran las advertencias.", next: 3 },
    ],
  },
  {
    text: "Expertos explican las limitaciones actuales.",
    options: [
      { text: "Se presenta análisis equilibrado.", next: 4 },
      { text: "Se reduce el análisis.", next: 3 },
    ],
  },
  {
    text: "La noticia exageró el impacto.",
    ending: {
      verdict: "La noticia generó falsas expectativas.",
      tone: "mala",
    },
  },
  {
    text: "La noticia fue responsable y clara.",
    ending: {
      verdict: "La noticia presentó un análisis equilibrado.",
      tone: "buena",
    },
  },
];

/* =====================
   MAPA
===================== */
const stories: Record<string, StoryNode[]> = {
  "1": storyInundaciones,
  "2": storyGobierno,
  "3": storyTecnologia,
};

const titles: Record<string, string> = {
  "1": "Crisis en la ciudad",
  "2": "Decisión gubernamental",
  "3": "Avance tecnológico",
};

/* =====================
   COMPONENTE
===================== */
export default function NoticiaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const story = stories[params.id];

  if (!story) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Noticia no encontrada</p>
      </main>
    );
  }

  const [step, setStep] = useState(0);
  const [content, setContent] = useState<string[]>([]);
  const [name, setName] = useState("");

  const current = story[step];

  const handleOption = (option: Option) => {
    setContent((prev) => [...prev, current.text, option.text]);
    setStep(option.next);
  };

  const handlePublish = () => {
    if (!name.trim() || !current.ending) return;

    const slug = `noticia-${params.id}-${Date.now()}`;

    localStorage.setItem(
      `news-${slug}`,
      JSON.stringify({
        title: titles[params.id],
        content: [...content, current.text],
        author: name,
        verdict: current.ending.tone,
        createdAt: new Date().toISOString(),
      })
    );

    router.push(`/publicada/${slug}`);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <header className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-serif font-bold mb-6">
          {titles[params.id]}
        </h1>
      </header>

      <section className="max-w-4xl mx-auto space-y-6 mb-20 text-lg leading-relaxed">
        {content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {!current.ending && <p>{current.text}</p>}
      </section>

      {!current.ending && current.options && (
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {current.options.map((option, i) => (
            <div
              key={i}
              className="bg-zinc-200 rounded-3xl p-12 text-center flex flex-col justify-between"
            >
              <h2 className="text-3xl font-serif font-bold mb-6">
                Opción {i === 0 ? "A" : "B"}
              </h2>

              <p className="text-zinc-700">{option.text}</p>

              <button
                onClick={() => handleOption(option)}
                className="mt-12 bg-zinc-700 text-white py-3 rounded-full uppercase tracking-wide hover:bg-black transition"
              >
                Seleccionar
              </button>
            </div>
          ))}
        </section>
      )}

      {current.ending && (
        <section className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-xl font-serif font-semibold">
            {current.ending.verdict}
          </p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre y apellido"
            className="w-full p-4 border rounded-xl text-center"
          />

          <button
            onClick={handlePublish}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            Publicar noticia
          </button>

          <a href="/" className="block text-sm underline text-zinc-500">
            Volver al inicio
          </a>
        </section>
      )}
    </main>
  );
}










