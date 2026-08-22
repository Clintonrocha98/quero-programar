import { useState, type KeyboardEvent } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InlineTagsProps {
  tags: string[]
  onChange: (tags: string[]) => void
  rotulo: string
  placeholder?: string
  ordenavel?: boolean
}

interface ChipProps {
  tag: string
  aoRemover: () => void
}

const classesChip =
  'inline-flex items-center gap-1 rounded border border-neutral-200 bg-neutral-100 px-1.5 text-[0.85em] leading-relaxed'

function BotaoRemoverChip({ tag, aoRemover }: ChipProps) {
  return (
    <button
      type="button"
      onClick={aoRemover}
      aria-label={`Remover ${tag}`}
      className="text-neutral-400 hover:text-neutral-700"
    >
      <X className="h-3 w-3" />
    </button>
  )
}

function ChipFixo({ tag, aoRemover }: ChipProps) {
  return (
    <span className={classesChip}>
      {tag}
      <BotaoRemoverChip tag={tag} aoRemover={aoRemover} />
    </span>
  )
}

function ChipOrdenavel({ tag, aoRemover }: ChipProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tag })

  return (
    <span
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(classesChip, 'cursor-grab active:cursor-grabbing')}
    >
      {tag}
      <BotaoRemoverChip tag={tag} aoRemover={aoRemover} />
    </span>
  )
}

export function InlineTags({ tags, onChange, rotulo, placeholder, ordenavel = false }: InlineTagsProps) {
  const [rascunho, setRascunho] = useState('')

  const sensores = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  )

  function adicionarTag(valor: string) {
    const tratada = valor.trim()
    setRascunho('')

    if (tratada === '') return
    if (tags.some((tag) => tag.toLowerCase() === tratada.toLowerCase())) return

    onChange([...tags, tratada])
  }

  function removerTag(tag: string) {
    onChange(tags.filter((item) => item !== tag))
  }

  function aoTeclar(evento: KeyboardEvent<HTMLInputElement>) {
    if (evento.key === 'Enter' || evento.key === ',') {
      evento.preventDefault()
      adicionarTag(rascunho)
      return
    }

    if (evento.key === 'Backspace' && rascunho === '' && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  function aoFinalizarArraste(evento: DragEndEvent) {
    const { active, over } = evento
    if (!over || active.id === over.id) return

    const indiceAntigo = tags.indexOf(String(active.id))
    const indiceNovo = tags.indexOf(String(over.id))
    if (indiceAntigo === -1 || indiceNovo === -1) return

    onChange(arrayMove(tags, indiceAntigo, indiceNovo))
  }

  const campoNovaTag = (
    <input
      type="text"
      value={rascunho}
      onChange={(evento) => setRascunho(evento.target.value)}
      onKeyDown={aoTeclar}
      aria-label={rotulo}
      placeholder={placeholder}
      className="min-w-[6ch] rounded-sm border-0 bg-transparent px-0.5 [font:inherit] outline-none placeholder:italic placeholder:text-neutral-400 hover:bg-neutral-100 focus:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-300"
    />
  )

  if (!ordenavel) {
    return (
      <div className="flex flex-wrap items-center gap-1">
        {tags.map((tag) => (
          <ChipFixo key={tag} tag={tag} aoRemover={() => removerTag(tag)} />
        ))}
        {campoNovaTag}
      </div>
    )
  }

  return (
    <DndContext sensors={sensores} onDragEnd={aoFinalizarArraste}>
      <SortableContext items={tags} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap items-center gap-1">
          {tags.map((tag) => (
            <ChipOrdenavel key={tag} tag={tag} aoRemover={() => removerTag(tag)} />
          ))}
          {campoNovaTag}
        </div>
      </SortableContext>
    </DndContext>
  )
}
