/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
        xs: "calc(var(--radius) - 8px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          darker: "var(--primary-darker)",
          light: "var(--primary-light)",
          lighter: "var(--primary-lighter)",
          muted: "var(--primary-muted)",
          stroke: "var(--primary-stroke)",
          foreground: "var(--primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          foreground: "var(--secondary-foreground)",
        },

        muted: {
          DEFAULT: "var(--muted)",
          light: "var(--muted-light)",
          dark: "var(--muted-dark)",
          foreground: "var(--muted-foreground)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        destructive: {
          DEFAULT: "var(--destructive)",
          light: "var(--destructive-light)",
          dark: "var(--destructive-dark)",
          foreground: "var(--destructive-foreground)",
        },

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
    },
  },
};
