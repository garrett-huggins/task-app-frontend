import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-accent": "var(--background-accent)",
        "background-muted": "rgb(var(--background-muted))",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        muted: "var(--muted)",

        primary: "var(--primary)",
        "primary-muted": "rgb(var(--primary-muted))",
        secondary: "var(--secondary)",
        "secondary-muted": "var(--secondary-muted)",

        "tag-none": "var(--tag-none)",
        "tag-red": "var(--tag-red)",
        "tag-orange": "var(--tag-orange)",
        "tag-yellow": "var(--tag-yellow)",
        "tag-green": "var(--tag-green)",
        "tag-blue": "var(--tag-blue)",
        "tag-indigo": "var(--tag-indigo)",
        "tag-purple": "var(--tag-purple)",
        "tag-pink": "var(--tag-pink)",
        "tag-brown": "var(--tag-brown)",
      },
    },
  },
  plugins: [],
} satisfies Config;
