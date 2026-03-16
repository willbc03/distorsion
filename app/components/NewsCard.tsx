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
    { bg: "#FF3B27", text: "text-white", numColor: "#BEFE46", btnBg: "#BEFE46", btnText: "#FF3B27" },
    { bg: "#BEFE46", text: "text-black", numColor: "#FF3B27", btnBg: "#FF3B27", btnText: "#BEFE46" },
    { bg: "#FF3B27", text: "text-white", numColor: "#BEFE46", btnBg: "#BEFE46", btnText: "#FF3B27" },
  ];

  const v = variants[variant % variants.length];
  const glowColor = v.bg === "#FF3B27" ? "rgba(255, 61, 0, 0.6)" : "rgba(204, 255, 0, 0.5)";

  return (
    <Link href={href} className="block">
      <div className="relative rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-2 h-[420px] md:h-[480px]">

        {/* IMAGEN */}
        <div className="absolute inset-0 bg-zinc-800">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover grayscale" style={{ objectPosition: "center bottom" }} />
          ) : (
            <div className="w-full h-full bg-zinc-700" />
          )}
        </div>

        {/* Número */}
        <span className="absolute top-4 left-4 text-2xl font-bold z-10" style={{ color: v.numColor }}>
          {String(variant + 1).padStart(2, "0")}
        </span>

        {/* Botón flecha SVG */}
        <span
          className="absolute top-4 right-4 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10"
          style={{ backgroundColor: v.btnBg }}
        >
          <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="40.11 27.49 73.52 27.49 73.52 61.46" fill="none" stroke={v.btnText} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="22.37" y1="78.26" x2="73.33" y2="27.3" stroke={v.btnText} strokeWidth="5" strokeLinecap="round" />
          </svg>
        </span>

        {/* TEXTO */}
        <div
          className="absolute top-[60%] left-0 right-0 bottom-0 rounded-b-2xl px-5 py-5 md:px-8 md:py-8 z-10"
          style={{ backgroundColor: v.bg, boxShadow: `0 20px 60px 20px ${glowColor}` }}
        >
          <h3 className={`text-xl md:text-2xl font-medium mb-2 md:mb-3 text-left ${v.text}`}>{title}</h3>
          <p className={`text-xs md:text-sm leading-relaxed text-left ${v.text} opacity-80`}>{description}</p>
        </div>

      </div>
    </Link>
  );
}