"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ES" | "EN";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (es: string, en: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ES",
  setLang: () => {},
  t: (es) => es,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ES");
  const t = (es: string, en: string) => (lang === "ES" ? es : en);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}