const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      screens:{
        custom:"712px"
      },
      colors: {
        customBlue: '#052ea2',
        darkViolet:'#752e7e',
        lightViolet:'#bb86fc',
        colorGradient1:'#1f1f1f',
        colorGradient2:'#121212',
        colorGradient3:'#474540',
        colorGradient4:'#2a2a2a',
        hoverColor:'#2f2f2f'
      },
      // animation: {
      //   pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      // },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-2000px 0' },
          '100%': { backgroundPosition: '2000px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite ',
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
  
      
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  
  
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}