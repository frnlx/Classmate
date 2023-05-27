/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/component/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'outline': '0 0 1px 3px #334155',
        'outline-section': '0 0 1px 1px #4B5563'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      keyframes: {
        contextMenuAnimation: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },

  corePlugins: {
    preflight: false,
  },
  
  plugins: [],
}

