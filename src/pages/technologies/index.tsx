import LanguageCard from "@/components/language-card";
import { technologiesForCards } from "@/data/content";


export default function TechnologiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 pt-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {technologiesForCards.map((language) => (
            <LanguageCard key={language.name} language={language} />
          ))}
        </div>
      </div>
    </main>
  )
}

