import { SecaoExperiencias } from '@/components/curriculo/documento/secao-experiencias'
import { SecaoHardSkills } from '@/components/curriculo/documento/secao-hard-skills'
import { SecaoHeader } from '@/components/curriculo/documento/secao-header'
import { SecaoProjetos } from '@/components/curriculo/documento/secao-projetos'
import { SecaoResumo } from '@/components/curriculo/documento/secao-resumo'
import { SecoesOpcionais } from '@/components/curriculo/documento/secoes-opcionais'

export function CurriculoDocumento() {
  return (
    <div className="space-y-6">
      <SecaoHeader />
      <SecaoResumo />
      <SecaoExperiencias />
      <SecaoHardSkills />
      <SecaoProjetos />
      <SecoesOpcionais />
    </div>
  )
}
