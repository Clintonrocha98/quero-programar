import { Link } from "react-router-dom";
import { Technology } from "@/types";
import { Card } from "@/components/ui/card";
import { getTechnologyIcon } from "@/components/technology-icon";
import { cn } from "@/lib/utils";

export default function TechnologyCard({ language }: { language: Technology }) {
  return (
    <Card className="flex h-full flex-col hover:border-metal-500">
      <div className={cn("h-1 w-full shrink-0", language.color)} />
      <Link to={language.url} className="group flex flex-1 gap-5 p-6 hover:no-underline">
        <span className="shrink-0">{getTechnologyIcon(language.id || language.name)}</span>
        <div className="min-w-0">
          <h2 className="m-0 text-xl font-bold text-metal-100 transition-colors group-hover:text-steel-blue-light">
            {language.name}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-metal-400" title={language.description}>
            {language.description}
          </p>
        </div>
      </Link>
    </Card>
  )
}
