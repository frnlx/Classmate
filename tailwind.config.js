/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 300ms cubic-bezier(.08,.43,.46,1.01)",
        contentShow: "contentShow 300ms cubic-bezier(.25,1.44,.51,1)",
        overlayHide: "overlayHide 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentHide: "contentHide 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        outline: "0 0 1px 3px #ffffff66",
        "outline-section": "0 0 1px 1px #4B5563",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif"],
        mono: ["var(--font-roboto-mono)", "ui-monospace"],
      },
      keyframes: {
        contextMenuAnimation: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.56)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        overlayHide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        contentHide: {
          from: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: 0, transform: "translate(-50%, -48%) scale(0.56)" },
        },
      },
      backgroundImage: {
        radialGreenGradient:
          "radial-gradient(circle, rgba(0,65,41,1) 0%, rgba(24,24,27,1) 60%)",
        radialGreenGradientTransparent:
          "radial-gradient(circle, rgba(0,65,60,0.6) 0%, rgba(0,65,60,0) 60%)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        black: "#09090b",
        dark0: "#18181b",
        dark1: "#222227",
        dark2: "#3f3f46",

        light2: "#52525b",
        light1: "#71717a",
        light0: "#a1a1aa",

        white: "#d4d4d8",
        whiter: "#e4e4e7",

        alert: "#D2473A", //red
        warn: "#C97C0B", // orange

        oklight: "#19e6a0", // green light
        ok: "#008E5A", // green
        okdark: "#004d34", // green dark

        primary: "#0e76f0", // blue
        unique: "#7C5ECF", // unique
      },
      height: {
        pc80: "80vh",
      },
      maxHeight: {
        pc80: "80vh",
        pc55: "55vh",
      },
      minHeight: {
        rem2: "2rem",
      },
    },
  },

  corePlugins: {
    preflight: false,
  },

  plugins: [],
};
