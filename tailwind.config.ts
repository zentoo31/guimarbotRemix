/* eslint-disable import/no-named-as-default-member */
import type { Config } from "tailwindcss";
import animations from "@midudev/tailwind-animations";
import flowbite from "flowbite-react/tailwind";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    animations,
    flowbite.plugin(),
    nextui()
  ],
} satisfies Config;
