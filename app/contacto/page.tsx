"use client";

import Navbar from "../components/Navbar";
import { useLang } from "../components/LanguageContext";

export default function ContactoPage() {
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-20">
        {/* Layout: izquierda título + imagen, derecha info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[80vh]">

          {/* Columna izquierda */}
          <div className="flex flex-col justify-between pr-0 md:pr-16 pb-16 md:pb-0">
            <div>
              <h1 className="font-title font-bold uppercase leading-none text-white mb-12"
                style={{ fontSize: "clamp(2.5rem, 6vw, 999px)" }}>
                {t("CONTACTO", "CONTACT")}
              </h1>
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xs">
                {t(
                  "Para cualquier consulta, o simplemente para saludar, escríbenos.",
                  "For any enquiries, or just to say hello, get in touch."
                )}
              </p>
            </div>

            {/* Imagen decorativa */}
            <div className="hidden md:block mt-16">
              <div className="w-full h-[280px] bg-[#FF3D00] rounded-2xl overflow-hidden relative">
                <img src="/activismo.jpg" alt="" className="w-full h-full object-cover grayscale mix-blend-multiply" />
              </div>
            </div>
          </div>

          {/* Columna derecha — info */}
          <div className="border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 pt-16 md:pt-0 md:pl-16 flex flex-col justify-center gap-12">

            {/* Email */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
                {t("Correo", "Email")}
              </p>
              <a href="mailto:distorsion@gmail.com"
                className="text-white text-lg md:text-xl font-medium hover:text-[#CCFF00] transition-colors">
                webdistorsion@gmail.com
              </a>
            </div>

            <hr className="border-white/10" />

            {/* Teléfono */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
                {t("Teléfono", "Phone")}
              </p>
              <a href="tel:+573001234567"
                className="text-white text-lg md:text-xl font-medium hover:text-[#CCFF00] transition-colors">
                +57 321 517 9273
              </a>
            </div>

            <hr className="border-white/10" />

            {/* Redes */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-5">
                {t("Redes sociales", "Social media")}
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Instagram", handle: "@webdistorsion", url: "https://instagram.com/webdistorsion" },
                  { label: "Twitter / X", handle: "@webdistorsion", url: "https://twitter.com/webdistorsion" },
                  { label: "TikTok", handle: "@webdistorsion", url: "https://tiktok.com/@webdistorsion" },
                ].map((red) => (
                  <a key={red.label} href={red.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between group">
                    <span className="text-white/50 text-sm">{red.label}</span>
                    <span className="text-white font-medium group-hover:text-[#CCFF00] transition-colors">
                      {red.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Ubicación */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
                {t("Ubicación", "Location")}
              </p>
              <p className="text-white text-base leading-relaxed">
                Barranquilla, Colombia
              </p>
            </div>

          </div>
        </div>

        {/* Badge bottom */}
        <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <p className="font-title font-bold text-white/10 uppercase text-xs tracking-widest">
            © 2026 Distorsión
          </p>
          <span className="inline-block bg-[#CCFF00] text-black text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase">
            {t("Hecho en Colombia", "Made in Colombia")}
          </span>
        </div>
      </div>
    </main>
  );
}