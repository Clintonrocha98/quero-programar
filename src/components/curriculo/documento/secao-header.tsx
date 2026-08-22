import { InlinePhone } from '@/components/curriculo/inline/inline-phone'
import { InlineText } from '@/components/curriculo/inline/inline-text'
import { useCurriculo } from '@/hooks/use-curriculo'

export function SecaoHeader() {
  const { state, dispatch, avisos } = useCurriculo()
  const { header } = state.data
  const avisoEmail = avisos.some((aviso) => aviso.campo === 'header.email')

  return (
    <div className="space-y-1 text-center">
      <InlineText
        valor={header.nome_completo}
        onChange={(valor) => dispatch({ type: 'atualizarHeader', campo: 'nome_completo', valor })}
        rotulo="Nome completo"
        placeholder="Nome completo"
        className="w-full text-center text-xl font-bold uppercase tracking-wide"
      />

      <div className="flex flex-wrap items-baseline justify-center gap-x-1 text-sm">
        <InlineText
          valor={header.email}
          onChange={(valor) => dispatch({ type: 'atualizarHeader', campo: 'email', valor })}
          rotulo="E-mail"
          placeholder="email@exemplo.com"
          autoDimensionar
          aviso={avisoEmail}
        />
        <span className="text-neutral-400">|</span>
        <InlinePhone
          valor={header.telefone}
          onChange={(valor) => dispatch({ type: 'atualizarHeader', campo: 'telefone', valor })}
          rotulo="Telefone"
          placeholder="(00) 00000-0000"
          autoDimensionar
        />
      </div>

      <div className="flex flex-wrap items-baseline justify-center gap-x-1 text-sm">
        <span>LinkedIn:</span>
        <InlineText
          valor={header.linkedin_url}
          onChange={(valor) => dispatch({ type: 'atualizarHeader', campo: 'linkedin_url', valor })}
          rotulo="LinkedIn"
          placeholder="linkedin.com/in/seu-usuario"
          autoDimensionar
        />
        <span className="text-neutral-400">|</span>
        <span>Github:</span>
        <InlineText
          valor={header.github_url}
          onChange={(valor) => dispatch({ type: 'atualizarHeader', campo: 'github_url', valor })}
          rotulo="Github"
          placeholder="github.com/seu-usuario"
          autoDimensionar
        />
      </div>
    </div>
  )
}
