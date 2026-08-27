/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#282828",
        frame: "#f2f2f2",
        page: "#ffffff",
        accent: "#ff1a1a",
      },
      fontFamily: {
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        nav: "11px",
        body: "14px",
        bodymd: "15px",
        bodyLg: "16px",
      },
      lineHeight: {
        comfortable: "1.8",
      },
      letterSpacing: {
        nav: "0.08em",
      },
      transitionDuration: {
        crisp: "200ms",
        smooth: "400ms",
      },
      transitionTimingFunction: {
        page: "cubic-bezier(0.40, 0.24, 0.40, 1)",
      },
      zIndex: {
        nav: "50",
        overlay: "60",
        skip: "9999",
      },
    },
  },
  plugins: [],
}
