/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      averta: ["Averta Standard", "sans-serif"],
      caveat: ["Caveat", "cursive"],
      avertabold: ["AvertaStd", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      transitionProperty: {
        'height-opacity': 'height, opacity',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.3s ease-out',
        bounceOut: 'bounceOut 0.3s ease-out',
        slideInDown: 'slideInDown 0.5s ease-out forwards',
        slideUp: 'slideUp 400ms ease-in-out',
      },
      backgroundImage: {
        "hero-bg": "url('public/images/banner2.jpg')",
        checkbg1: "url('public/images/chk-bg.webp')",
        checkbg2: "url('public/images/chk-bg-2.webp')",
        "section8-bg": "url('public/images/section8.webp')",
        "section11-bg": "url('public/images/section13Bg.webp')",
        "section12-bg": "url('public/images/moneybackimg.webp')",
        "section14-bg": "url('public/images/section14Bg.webp')",
        "playbg-bg": "url('public/images/playBg1.webp')",
        "faq-bg": "url('public/images/section15Bg.webp')",
        dottedbg: "url('public/images/dotShap.webp')",
      },
      backgroundSize: {
        '100%': '100%',
      },
      rotate: {
        10: "10deg",
      },
      colors: {
        clifford: "#da373d",
      },
    },
  },
};


