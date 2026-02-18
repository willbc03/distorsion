import NewsCard from "./components/NewsCard";

export default function HomePage() {
  return (
    <main className="bg-white">

      {/* ======================
          HERO / CONCEPTO
      ====================== */}
      <section className="h-screen w-full bg-zinc-200 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">
          DISTORCIÓN
        </h1>

        <p className="max-w-md text-zinc-700 text-base md:text-lg mb-12">
          La información no siempre miente. A veces, solo se va torciendo con cada decisión.
        </p>

        <div className="flex flex-col items-center gap-2 text-xs tracking-widest text-zinc-600 uppercase">
          <span>Desliza para comenzar</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* ======================
          INTRO
      ====================== */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">
          Arma tu noticia
        </h2>
        <p className="max-w-xl mx-auto text-zinc-600">
          La forma en que eliges contar los hechos cambia su significado.
          Construye una noticia y descubre qué tipo de relato produces.
        </p>
      </section>

      {/* ======================
          GRID DE NOTICIAS
      ====================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <NewsCard
            title="Noticia Número 1"
            description="Una serie de eventos ha generado preocupación entre los ciudadanos."
            href="/noticia/1"
          />

          <NewsCard
            title="Noticia Número 2"
            description="Una nueva medida divide opiniones en todo el país."
            href="/noticia/2"
          />

          <NewsCard
            title="Noticia Número 3"
            description="Un desarrollo promete cambiar la forma en que vivimos."
            href="/noticia/3"
          />

        </div>
      </section>

    </main>
  );
}






