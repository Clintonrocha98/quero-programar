import { Link } from "react-router-dom";
import { TecnologiesInformationsInterface } from "@/types";
import { Card } from "@/components/ui/card";

export default function LanguageCard({ language }: { language: TecnologiesInformationsInterface }) {
  return (
    <Card className="h-full hover:border-metal-500 hover:shadow-lg hover:shadow-metal-900/50 transition-all duration-300">
      <Link to={language.url} className="block h-full p-6 hover:no-underline group">
        <div className="flex items-center gap-4 mb-4">
          <div className={`${language.color} text-white p-3 rounded-lg font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-300`}>
            {language.icon}
          </div>
          <h2 className="text-xl font-bold text-metal-100 group-hover:text-steel-blue-light transition-colors m-0 mb-0">
            {language.name}
          </h2>
        </div>
        <p className="text-metal-400 group-hover:text-metal-300 transition-colors font-normal">
          {language.description}
        </p>
      </Link>
    </Card>
  )
}
