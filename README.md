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

## Design System "Dark Metallic"

O projeto utiliza um tema personalizado escuro com tons metálicos.

- **Cores Principais:** Variáveis `metal-100` a `metal-950` definem a escala de cinza azulada.
- **Acentos:** `steel-blue`, `cyan-accent`, `amber-accent`, `emerald-accent`, `rose-accent`.
- **Tipografia:** Configurada via `@tailwindcss/typography` para renderização elegante de arquivos Markdown.

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
