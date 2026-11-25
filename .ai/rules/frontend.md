---
paths:
  - 'src/**/*.tsx'
  - 'src/hooks/**'
  - 'src/contexts/**'
  - 'src/index.css'
  - 'tailwind.config.js'
---

# Frontend

Toda mudança de UI mantém o layout parado. Nada pisca, pula, corta ou refaz o fluxo no primeiro carregamento, na navegação ou depois de uma ação.

## Peças prontas

- Reuse o kit antes de escrever um componente: `components/ui` (`Card`, `Tag`, `Skeleton`, `Breadcrumb`, `QuoteBlock`), `components/layout` e os componentes de conteúdo (`ContentSection`, `ResourceCard`, `Callout`, `CodeBlock`).
- Junte classes com `cn()` de `@/lib/utils`, nunca com template string.
- Ícones vêm de `lucide-react`. Um ícone referenciado por string (navegação, frontmatter) passa pelo mapa em `src/data/icons.ts`.

## Sistema visual ("Dark Metallic")

- O tema é só escuro. Os tokens ficam em `src/index.css` (variáveis CSS em `:root`) e em `tailwind.config.js` (`metal-*`, `steel-blue`, `*-accent` e as cores semânticas `background`, `card`, `muted`, `primary`...).
- Nunca escreva uma cor crua: nada de `bg-[#1c1c27]` nem `style={{ color: '#fff' }}`.
- As cores seguem três níveis:

| Nível | O que é | Regra |
| --- | --- | --- |
| Tema | superfície, texto, borda, foco, acento da interface | Só tokens: `bg-card`, `text-muted-foreground`, `border-metal-800`, `text-cyan-accent`. Nunca a paleta padrão (`bg-gray-900`, `text-white`). |
| Categórica | a cor que identifica um item de uma categoria (tecnologia, tipo de recurso, papel na mentoria) | A paleta padrão é permitida, mas só num lugar por categoria: o campo `color` do frontmatter MDX ou um mapa tipado (`Record<Tipo, string>`, como `src/components/mentoria/papel.ts`). O JSX lê do mapa; nunca escreve a classe solta. |
| Folha do currículo | a folha branca que imita o PDF impresso e o que é renderizado sobre ela: `src/components/curriculo/documento/**`, `src/components/curriculo/inline/**`, `src/components/curriculo/dicas/dica-button.tsx` e o container da folha em `src/pages/guia/curriculo.tsx` | Exceção: usa `white`, `black` e `neutral-*` da paleta padrão, porque reproduz o papel. O que fica fora da folha (o painel de dicas, o título da página) segue o tema. |

- Uma cor de tema nova vira token em `tailwind.config.js` (ou variável em `src/index.css`) na mesma mudança, e o README é atualizado na seção "Design System".
- Profundidade vem das camadas de superfície (`background`, depois `card`, depois `popover`), não de uma sombra nova.

## Carregamento

- Um skeleton tem exatamente o tamanho do conteúdo carregado: mesma altura, mesmo número de linhas e mesma quebra em cada breakpoint.
- Mostre skeleton só enquanto o dado de fato falta (ex.: o `Suspense` de uma rota `lazy()`), nunca enquanto recarrega um dado que você já tem.

## Renderização

- O React Compiler não está ativo. Não adicione `useMemo`, `useCallback` ou `memo` por padrão. Adicione só para um custo medido, ou para uma identidade da qual um effect ou um filho realmente dependem.
- Derive valores das props durante o render, ou reinicie uma subárvore com `key`. Nunca copie props para state com um effect.
- Leia `window`, `matchMedia`, `localStorage` ou a hora por `useSyncExternalStore` ou por um hook construído sobre ele, nunca durante o render e nunca num effect de montagem que faz `setState`.
- Nunca declare um componente dentro de outro componente.
- Uma lista que adiciona, remove ou reordena itens usa um id estável como `key`. Quando o item ainda não tem id (um item novo num formulário), gere um com `crypto.randomUUID()` ao criar o item. `key={index}` só vale para listas estáticas que nunca mudam.

```tsx
// Evite: remover um item entrega o DOM dele (foco, campo aberto) ao próximo
<div key={index}>

// Bom
const novo = { id: crypto.randomUUID(), titulo: '' }
<div key={item.id}>
```

## Conteúdo que muda

- Números, contadores e cronômetros usam `tabular-nums`.
- Um controle tem o mesmo tamanho quando está desabilitado, carregando ou habilitado. Ponha o spinner ao lado de um rótulo estável em vez de trocar o rótulo.
- UI condicional (um aviso, uma confirmação inline, um erro) reserva o espaço dela ou fica por cima. Uma confirmação inline cabe no espaço do controle que ela substitui.
- Logo depois de uma ação, o controle sob o ponteiro não vira um controle destrutivo.

## Overflow

- Um diálogo ou popover é limitado à viewport (`dvh`) e rola por dentro, com cabeçalho e rodapé fixos quando as ações rolariam para fora. Sem barra de rolagem dupla e sem rolar a página através do overlay.
- Texto longo (um nome, um e-mail, uma URL) usa `min-w-0` com `truncate` ou `line-clamp`, e o texto completo em `title`.
- Uma página cabe na largura do celular. Um bloco largo (tabela, código) rola dentro da própria caixa.
- Um input usa pelo menos 16px de texto abaixo de `md`, para o iOS não dar zoom.

## Confira antes de dizer que está pronto

- Rode `pnpm dev` e olhe a mudança no navegador em 1440×900, 1366×650 e 390×844.
- Abra, use, feche e abra de novo cada overlay ou drawer que você mudou (a sidebar mobile, por exemplo), com teclado e com toque.
