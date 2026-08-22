import { Download, Loader2, RotateCcw, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { useCurriculo } from '@/hooks/use-curriculo'

export function CurriculoToolbar() {
  const { state, dispatch, avisos, rascunhoSalvo } = useCurriculo()
  const [gerando, setGerando] = useState(false)
  const [erroPdf, setErroPdf] = useState(false)

  async function handleBaixarPdf() {
    setErroPdf(false)
    setGerando(true)

    try {
      const { baixarCurriculoPdf } = await import('@/lib/curriculo-pdf')
      await baixarCurriculoPdf(state.data, state.opcionaisAtivos)
    } catch {
      setErroPdf(true)
    } finally {
      setGerando(false)
    }
  }

  function handleRestaurarModelo() {
    const confirmado = window.confirm(
      'Restaurar o currículo modelo? Suas alterações atuais serão substituídas.',
    )
    if (confirmado) {
      dispatch({ type: 'restaurarModelo' })
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={gerando}
        onClick={handleBaixarPdf}
        className="inline-flex items-center gap-2 rounded-md border border-steel-blue/30 bg-steel-blue/20 px-4 py-2 text-sm font-medium text-steel-blue-light transition-colors hover:bg-steel-blue/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {gerando ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Gerando…
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Baixar PDF
          </>
        )}
      </button>

      {erroPdf ? (
        <span className="text-xs text-rose-400">
          Não foi possível gerar o PDF. Tente novamente.
        </span>
      ) : null}

      <button
        type="button"
        onClick={handleRestaurarModelo}
        className="inline-flex items-center gap-2 rounded-md border border-metal-700 bg-metal-800/50 px-4 py-2 text-sm font-medium text-metal-200 transition-colors hover:bg-metal-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw className="w-4 h-4" />
        Restaurar modelo
      </button>

      {avisos.length > 0 ? (
        <span
          className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-400"
          title={avisos.map((aviso) => aviso.mensagem).join('\n')}
        >
          <TriangleAlert className="w-3.5 h-3.5" />
          {avisos.length === 1 ? '1 aviso' : `${avisos.length} avisos`}
        </span>
      ) : null}

      <span className={`ml-auto text-xs ${rascunhoSalvo ? 'text-metal-400' : 'text-amber-400'}`}>
        {rascunhoSalvo
          ? 'Rascunho salvo automaticamente neste navegador'
          : 'Não foi possível salvar o rascunho neste navegador'}
      </span>
    </div>
  )
}
