// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: '#CFA4CC',
          light: '#E1C5DF',
          dark: '#B383B0',
        },
        poppy: {
          DEFAULT: '#EE5A36',
          light: '#F47E61',
          dark: '#D43C18',
        },
        babyBlue: {
          DEFAULT: '#9FC4E8',
          light: '#C1DBF2',
          dark: '#7BA9D6',
        },
        forest: {
          DEFAULT: '#1A9562',
          light: '#2AB47E',
          dark: '#127548',
        },
        mango: {
          DEFAULT: '#F5AB54',
          light: '#F8C07D',
          dark: '#E89126',
        },
        primary: {
          DEFAULT: '#9FC4E8', // Baby Blue sebagai warna utama
          light: '#C1DBF2',
          dark: '#7BA9D6',
        },
        secondary: {
          DEFAULT: '#CFA4CC', // Lavender sebagai warna sekunder
          light: '#E1C5DF',
          dark: '#B383B0',
        },
        accent: {
          DEFAULT: '#EE5A36', // Poppy sebagai warna aksen
          light: '#F47E61',
          dark: '#D43C18',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'slide-in-up': 'slideInUp 0.3s ease-out forwards',
        'slide-out-down': 'slideOutDown 0.3s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 10%, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(1rem)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};