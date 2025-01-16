import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        // Set Abel as the default sans font
        sans: ["var(--font-abel)", ...fontFamily.sans],
        // Anton as accent font
        accent: ["var(--font-anton)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
