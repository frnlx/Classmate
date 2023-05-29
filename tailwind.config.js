/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/component/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {

      boxShadow: {
        'outline': '0 0 1px 3px #334155',
        'outline-section': '0 0 1px 1px #4B5563'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif'],
        mono: ['var(--font-roboto-mono)', 'ui-monospace'],
      },
      keyframes: {
        contextMenuAnimation: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      backgroundImage: {
        radialGreenGradient: 'radial-gradient(circle, rgba(0,65,41,1) 0%, rgba(24,24,27,1) 60%)'
      },
      colors: {
  
        transparent: 'transparent',
        current: 'currentColor',
  
        black: '#09090b',
        dark0: '#18181b',
        dark1: '#222227',
        dark2: '#3f3f46',
        
        light2: '#52525b',
        light1: '#71717a',
        light0: '#a1a1aa',
  
        white: '#d4d4d8',
        whiter: '#e4e4e7',
  
        alert: '#D2473A',   //red
        warn: '#C97C0B',    // orange
        ok: '#008E5A',      // green
        primary: '#0e76f0', // blue
        unique: '#7C5ECF'   // unique
  
      }
    },
  },

  corePlugins: {
    preflight: false,
  },
  
  plugins: [],
}

