import Link from "next/link";

type NewsCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function NewsCard({
  title,
  description,
  href,
}: NewsCardProps) {
  return (
    <article className="rounded-2xl bg-white border border-zinc-200 overflow-hidden flex flex-col">
      {/* Imagen placeholder */}
      <div className="h-40 bg-zinc-200" />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Tags */}
        <div className="flex gap-2 text-xs text-zinc-600">
          <span className="px-2 py-1 bg-zinc-100 rounded-full">
            GÉNERO
          </span>
          <span className="px-2 py-1 bg-zinc-100 rounded-full">
            TEMA GENERAL
          </span>
        </div>

        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-zinc-600 text-sm flex-1">
          {description}
        </p>

        <Link
          href={href}
          className="mt-4 inline-flex justify-center rounded-full bg-zinc-800 text-white py-2 text-sm hover:bg-zinc-900 transition"
        >
          Empezar noticia
        </Link>
      </div>
    </article>
  );
}
