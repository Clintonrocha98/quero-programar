import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CurriculoDocumento } from '@/components/curriculo/documento/curriculo-documento'
import { CurriculoToolbar } from '@/components/curriculo/documento/toolbar'
import { PainelDicas } from '@/components/curriculo/dicas/painel-dicas'
import { CurriculoProvider } from '@/contexts/curriculo-provider'

export default function CurriculoPage() {
  return (
    <CurriculoProvider>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Breadcrumb
          items={[{ label: 'Guia', href: '/guia' }, { label: 'Modelo de Currículo' }]}
        />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-metal-100">Modelo de Currículo</h1>
          <p className="text-lg text-metal-300 max-w-3xl leading-relaxed">
            Edite o modelo direto no documento abaixo, as alterações ficam salvas
            automaticamente no seu navegador e você pode baixar o resultado em PDF.
          </p>
        </div>

        <CurriculoToolbar />

        <div className="flex flex-col items-center gap-8 2xl:flex-row 2xl:items-start 2xl:justify-center">
          <div className="min-h-[600px] w-full max-w-[800px] rounded-sm bg-white p-10 font-serif text-neutral-900 shadow-lg sm:p-14">
            <CurriculoDocumento />
          </div>
          <PainelDicas />
        </div>
      </div>
    </CurriculoProvider>
  )
}
