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
          100: "#e8e8f0",
          200: "#c4c4d4",
          300: "#9d9db0",
          400: "#7a7a8f",
          500: "#5a5a6e",
          600: "#3d3d4d",
          700: "#2a2a38",
          800: "#1c1c27",
          850: "#16161f",
          900: "#111118",
          950: "#0a0a0f",
        },
        "steel-blue": {
          DEFAULT: "#4a6fa5",
          light: "#6b8fc5",
        },
        "cyan-accent": "#22d3ee",
        "amber-accent": "#fbbf24",
        "emerald-accent": "#34d399",
        "rose-accent": "#fb7185",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
