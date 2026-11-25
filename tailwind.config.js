/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        metal: {
          100: "#e8e3d8",
          200: "#d2d0ca",
          300: "#b4bac5",
          400: "#8b94a5",
          500: "#5f6979",
          600: "#3a4556",
          700: "#252d39",
          800: "#1d232d",
          850: "#1a2029",
          900: "#141920",
          950: "#0e1116",
        },
        "steel-blue": {
          DEFAULT: "#4a6fa5",
          light: "#7fa6dd",
        },
        "cyan-accent": "#22d3ee",
        "amber-accent": "#fbbf24",
        "emerald-accent": "#34d399",
        "rose-accent": "#fb7185",
      },
      fontFamily: {
        sans: ['"Instrument Sans Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        surgir: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'subir-degrau': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        pousar: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '60%': { opacity: '1', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'girar-uma-vez': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        fluir: {
          from: { strokeDashoffset: '32' },
          to: { strokeDashoffset: '0' },
        },
        // 19ch e steps(19) seguem o tamanho de "por onde eu começo?" em src/pages/home.tsx.
        digitar: {
          from: { width: '0' },
          to: { width: '19ch' },
        },
        piscar: {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        surgir: 'surgir 200ms ease-out both',
        'subir-degrau': 'subir-degrau 450ms cubic-bezier(.2,.8,.2,1) both',
        pousar: 'pousar 350ms ease-out both',
        'girar-uma-vez': 'girar-uma-vez 700ms ease-in-out 1 both',
        fluir: 'fluir 1.2s linear 1 both',
        digitar: 'digitar 1.1s steps(19, end) 300ms both',
        piscar: 'piscar 1s steps(1) infinite',
        responder: 'surgir 420ms cubic-bezier(.22,1,.36,1) 1.6s both',
      },
      typography: (theme) => ({
        metal: {
          css: {
            '--tw-prose-body': theme('colors.metal.300'),
            '--tw-prose-headings': theme('colors.metal.100'),
            '--tw-prose-lead': theme('colors.metal.200'),
            '--tw-prose-links': theme('colors.steel-blue.light'),
            '--tw-prose-bold': theme('colors.metal.100'),
            '--tw-prose-counters': theme('colors.metal.400'),
            '--tw-prose-bullets': theme('colors.metal.400'),
            '--tw-prose-hr': theme('colors.metal.700'),
            '--tw-prose-quotes': theme('colors.metal.200'),
            '--tw-prose-quote-borders': theme('colors.metal.700'),
            '--tw-prose-captions': theme('colors.metal.400'),
            '--tw-prose-code': theme('colors.metal.200'),
            '--tw-prose-pre-code': theme('colors.metal.200'),
            '--tw-prose-pre-bg': theme('colors.metal.900'),
            '--tw-prose-th-borders': theme('colors.metal.700'),
            '--tw-prose-td-borders': theme('colors.metal.700'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
