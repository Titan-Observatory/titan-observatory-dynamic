const withOpacityValue = variable => ({ opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgb(var(${variable}) / ${opacityValue})`;
  }
  return `rgb(var(${variable}))`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        titan: {
          bg: withOpacityValue("--color-bg"),
          "bg-alt": withOpacityValue("--color-bg-alt"),
          surface: withOpacityValue("--color-surface"),
          "surface-hover": withOpacityValue("--color-surface-hover"),
          border: withOpacityValue("--color-border"),
          "status-line": withOpacityValue("--color-status-line"),
          "text-primary": withOpacityValue("--color-text-primary"),
          "text-secondary": withOpacityValue("--color-text-secondary"),
          "text-muted": withOpacityValue("--color-text-muted"),
          red: withOpacityValue("--color-red"),
          green: withOpacityValue("--color-green"),
          blue: withOpacityValue("--color-blue"),
          yellow: withOpacityValue("--color-yellow"),
          purple: withOpacityValue("--color-purple"),
          orange: withOpacityValue("--color-orange"),
          aqua: withOpacityValue("--color-aqua")
        }
      },
      boxShadow: {
        titan: "0 10px 25px -15px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: []
};
