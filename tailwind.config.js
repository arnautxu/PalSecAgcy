/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#282828",
        frame: "#f5e6e2",
        page: "#ffffff",
      },
      fontFamily: {
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
        script: ['"Caveat"', "cursive"],
      },
      fontSize: {
        nav: "8px",
        body: "10px",
        bodymd: "11px",
      },
      letterSpacing: {
        nav: "0.08em",
      },
      transitionTimingFunction: {
        page: "cubic-bezier(0.40, 0.24, 0.40, 1)",
      },
    },
  },
  plugins: [],
}
