/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "oklch(82.6% 0.165 85.5)",
        "primary-content": "oklch(0% 0 0)",
        secondary: "oklch(55.5% 0.03 240)",
        "secondary-content": "oklch(100% 0 0)",
        accent: "oklch(65% 0.2 260)",
        "accent-content": "oklch(100% 0 0)",
        neutral: "oklch(35% 0.02 240)",
        "neutral-content": "oklch(100% 0 0)",
        "base-100": "oklch(100% 0 0)",
        "base-200": "oklch(96% 0.005 240)",
        "base-300": "oklch(92% 0.01 240)",
        "base-content": "oklch(20% 0.01 240)",
        info: "oklch(70% 0.15 240)",
        success: "oklch(70% 0.2 150)",
        warning: "oklch(80% 0.2 90)",
        error: "oklch(65% 0.2 30)",
      },
    },
  },
};
