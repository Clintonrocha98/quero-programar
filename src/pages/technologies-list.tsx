import TechnologyCard from "@/components/technology-card";
import { technologiesForCards } from "@/data/content";


export default function TechnologiesPage() {
  return (
    <main className="min-h-screen py-10 pt-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {technologiesForCards.map((language) => (
            <TechnologyCard key={language.name} language={language} />
          ))}
        </div>
      </div>
    </main>
  )
}
