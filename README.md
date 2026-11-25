# QueroProgramar

Uma plataforma web open-source projetada para guiar desenvolvedores iniciantes com trilhas de aprendizado, recursos curados e documentação técnica.

![Tech Stack](https://img.shields.io/badge/stack-React_18_|_Vite_|_TypeScript_|_Tailwind_v4-blue)

## Tech Stack

Este projeto utiliza uma arquitetura moderna focada em performance e experiência de desenvolvimento (DX).

- **Framework:** React 18 + Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (com configuração personalizada "Dark Metallic")
- **Conteúdo:** MDX (Markdown + JSX)
- **Roteamento:** React Router v7
- **Ícones:** Lucide React
- **Gerenciador de Pacotes:** `pnpm`

## Começando

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/quero-programar.git
   cd quero-programar
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

4. **Build para produção:**
   ```bash
   pnpm build
   ```

## Arquitetura do Projeto

```text
src/
├── components/
│   ├── ui/               # Componentes base reutilizáveis (Card, Tag, Skeleton...)
│   └── ...               # Componentes de negócio (ResourceCard, TechnologyCard...)
├── data/
│   └── content/
│       ├── technologies/ # Arquivos MDX de tecnologias
│       └── pages/        # Arquivos MDX de páginas soltas
├── pages/                # Componentes de página e rotas
├── lib/                  # Utilitários (cn, formatação)
├── types/                # Definições de tipos globais
└── App.tsx               # Configuração de rotas principal
```

## Design System "Grafite"

O projeto usa um tema escuro em tons de grafite, com cara de terminal.

- **Cores principais:** a escala `metal-100` a `metal-950` guarda os tons de grafite (fundo `#0e1116`, texto `#e8e3d8`). O nome `metal` ficou do tema anterior.
- **Ação principal:** `primary` é âmbar (`#f3c55b`). Use em botão de ação principal, cursor e item ativo da navegação.
- **Links e prompt:** `steel-blue-light` (`#7fa6dd`).
- **Acentos categóricos:** `cyan-accent`, `amber-accent`, `emerald-accent`, `rose-accent`.
- **Fontes:** Instrument Sans (`font-sans`, texto) e JetBrains Mono (`font-mono`, código e detalhes de terminal), via `@fontsource-variable`.
- **Markdown:** `@tailwindcss/typography` com o tema `prose-metal`.

## SEO e Compartilhamento

O site é uma SPA. Um crawler de rede social não executa JavaScript. Por isso o build gera um arquivo HTML por rota, com as meta tags já preenchidas.

O build executa três etapas:

```
vite build           →  dist/index.html + assets
gerar-og.mjs         →  dist/og/<rota>.png     (uma imagem 1200x630 por rota)
gerar-html.mjs       →  dist/<rota>.html       (meta tags por rota)
                        dist/sitemap.xml
                        dist/robots.txt
```

Os metadados vêm de duas fontes:

- `src/data/seo.json` define título, descrição e seção das rotas fixas.
- O `frontmatter` dos arquivos MDX define os metadados das rotas de tecnologia e de 4Noobs.

O componente `useSeo` (`src/hooks/use-seo.ts`) atualiza o título e as meta tags durante a navegação no cliente. O prerender atende o crawler. O hook atende o usuário.

### Como adicionar uma página ao SEO

- Rota de tecnologia ou de 4Noobs: nenhuma ação. O script lê o `frontmatter` do MDX novo.
- Rota fixa nova: adicione uma entrada em `src/data/seo.json` com `titulo`, `descricao` e `secao`.

### Como trocar o domínio

Defina `VITE_SITE_URL` no arquivo `.env` ou no ambiente de build:

```bash
VITE_SITE_URL=https://seu-dominio.com.br pnpm build
```

O valor alimenta `og:url`, `og:image`, o canonical e o sitemap.

### Como regerar apenas as imagens

```bash
pnpm build:seo
```

O comando exige um `dist` existente. As fontes usadas pelas imagens ficam em `scripts/og/fontes`.

## Guia de Contribuição de Conteúdo (MDX)

Toda a documentação de tecnologias e trilhas vive em arquivos `.mdx` dentro de `src/data/content`.

### Como adicionar uma nova tecnologia ou tópico:

1.  **Crie o arquivo:**
    Adicione um novo arquivo `.mdx` em `src/data/content/` (ex: `rust.mdx`).

2.  **Defina o Frontmatter (Obrigatório):**
    No topo do arquivo, você deve exportar o objeto `frontmatter`:

    ```tsx
    export const frontmatter = {
      id: "rust",                 // Slug usado na URL (ex: /tecnologias/rust)
      title: "Rust",              // Título exibido na página
      description: "Uma linguagem focada em segurança e performance.",
      icon: "🦀",                 // Emoji ou ícone
      color: "bg-orange-600"      // Cor de fundo do ícone (classe Tailwind)
    }
    ```

3.  **Importe os Componentes:**
    Abaixo do frontmatter, importe os componentes que você usará:

    ```tsx
    import { ResourceCard } from '@/components/resource-card'
    import { Callout } from '@/components/callout'
    import { ContentSection } from '@/components/content-section'
    import { CodeBlock } from '@/components/code-block'
    ```

4.  **Escreva o Conteúdo:**
    Utilize Markdown padrão misturado com os componentes React:

    ```mdx
    # Introdução

    Rust é incrível. Aqui está um exemplo de código:

    <CodeBlock 
      language="rust" 
      code={`fn main() {
        println!("Hello World!");
      }`} 
    />

    <ContentSection title="Recursos Básicos">
      <ResourceCard 
        title="O Livro de Rust" 
        url="https://doc.rust-lang.org/book/" 
        type="documentacao"
      >
        A documentação oficial.
      </ResourceCard>
    </ContentSection>

    <Callout type="insight">Comece pelo Ownership e Borrowing!</Callout>
    ```

5.  **Registre o Conteúdo:**
    Abra `src/data/content/index.ts` e registre seu novo arquivo:

    ```typescript
    // 1. Importe o conteúdo e o frontmatter
    import RustContent, { frontmatter as rustMeta } from './technologies/rust.mdx'

    // ...

    // 2. Adicione ao objeto 'technologies'
    export const technologies: Record<string, ContentItem<TechnologyMeta>> = {
      // ... outras tecnologias
      rust: {
        meta: rustMeta,
        Content: RustContent,
      },
    }
    ```

### Componentes Disponíveis no MDX

*   **`<ContentSection title="Título" level="beginner|intermediate|advanced">`**: Agrupa conteúdo com um título e badge de nível opcional.
*   **`<ResourceCard title="" url="" type="curso|leitura|..." >`**: Card para links externos. O `type` define a cor da tag automaticamente.
*   **`<Callout type="tip|warning|insight|info">`**: Caixas de destaque para dicas ou avisos.
*   **`<CodeBlock code="" language="" filename="">`**: Bloco de código com syntax highlighting e botão de copiar.
*   **`<QuoteBlock variant="default|primary|accent">`**: Citações estilizadas.

---
