import { Briefcase, FileText, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'

export default function GuiaHubPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          <Briefcase className="w-10 h-10 text-steel-blue-light" />
          Guia
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          Conteúdo prático e ferramentas para quem está se preparando para buscar as primeiras vagas
          como desenvolvedor: currículo, dicas e recursos de carreira.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full hover:border-metal-500 hover:shadow-lg hover:shadow-metal-900/50 transition-all duration-300">
          <Link to="/guia/curriculo" className="block h-full p-6 hover:no-underline group">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-steel-blue-light bg-steel-blue/10 p-3 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-metal-100 group-hover:text-steel-blue-light transition-colors m-0">
                Modelo de Currículo
              </h2>
            </div>
            <p className="text-metal-400 group-hover:text-metal-300 transition-colors font-normal">
              Preencha um currículo com estrutura aprovada por recrutadores direto no navegador e
              baixe em PDF.
            </p>
          </Link>
        </Card>

        <Card className="h-full opacity-60 hover:border-metal-700 cursor-default">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="text-metal-400 bg-metal-800/50 p-3 rounded-lg shadow-sm">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-metal-100 m-0">
                  Dicas para a busca de vagas
                </h2>
              </div>
              <Tag size="sm">Em breve</Tag>
            </div>
            <p className="text-metal-400 font-normal">
              Boas práticas de currículo, LinkedIn e entrevistas técnicas para quem está começando.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
