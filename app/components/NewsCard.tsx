import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  href: string;
  variant?: number;
  image?: string;
}

export default function NewsCard({
  title,
  description,
  href,
  variant = 0,
  image,
}: NewsCardProps) {
  const variants = [
    { bg: "#FF3D00", text: "text-white", numColor: "#CCFF00", btnBg: "#CCFF00", btnText: "#000000" },
    { bg: "#CCFF00", text: "text-black", numColor: "#FF3D00", btnBg: "#FF3D00", btnText: "#ffffff" },
    { bg: "#FF3D00", text: "text-white", numColor: "#CCFF00", btnBg: "#CCFF00", btnText: "#000000" },
  ];

  const v = variants[variant % variants.length];

  return (
    <Link href={href} className="block">
      <div className="relative rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-[480px]">

        {/* IMAGEN — ocupa toda la card */}
        <div className="absolute inset-0 bg-zinc-800">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover grayscale" style={{ objectPosition: "center bottom" }} />
          ) : (
            <div className="w-full h-full bg-zinc-700" />
          )}
        </div>

        {/* Número */}
        <span
          className="absolute top-4 left-4 text-2xl font-bold z-10"
          style={{ color: v.numColor }}
        >
          {String(variant + 1).padStart(2, "0")}
        </span>

        {/* Botón ↗ */}
        <span
          className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg z-10"
          style={{ backgroundColor: v.btnBg, color: v.btnText }}
        >
          ↗
        </span>

        {/* TEXTO — flotando encima de la imagen, rounded en todas las esquinas */}
        <div
          className="absolute top-[60%] left-0 right-0 bottom-0 rounded-b-2xl px-8 py-8 z-10"
          style={{ backgroundColor: v.bg }}
        >
          <h3 className={`text-2xl font-medium mb-3 text-left ${v.text}`} style={{ fontFamily: "var(--font-geist-sans)" }}>{title}</h3>
<p className={`text-sm leading-relaxed text-left ${v.text} opacity-80`} style={{ fontFamily: "var(--font-body)" }}>{description}</p>
        </div>

      </div>
    </Link>
  );
}
