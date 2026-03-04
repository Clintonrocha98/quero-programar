import { Category } from "@/types";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={category.url} className="block h-full group">
      <Card className="h-full hover:border-metal-500 hover:shadow-lg hover:shadow-metal-900/50 transition-all duration-300">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-metal-800 p-3 rounded-lg text-steel-blue-light group-hover:text-cyan-accent transition-colors duration-300">
              {category.icon}
            </div>
            <h2 className="text-xl font-bold text-metal-100 group-hover:text-white transition-colors m-0 mb-0">
              {category.name}
            </h2>
          </div>
          <p className="text-metal-400 group-hover:text-metal-300 transition-colors">
            {category.description}
          </p>
        </div>
      </Card>
    </Link>
  )
}
