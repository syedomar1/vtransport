<<<<<<< HEAD
// tailwind.config.js

module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // You can extend Tailwind CSS theme here
    },
  },
  plugins: [],
};
=======
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      fontFamily: {
        primary: 'Orbitron',
        secondary: 'Rajdhani',
        tertiary: 'Aldrich',
      },
      container: {
        padding: {
          DEFAULT: '15px',
        },
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
      },
      extend: {
        colors: {
          primary: '#0a0a0a',
          accent: '#B809C3',
        },
        backgroundImage: {
          site: "url('./assets/site-bg.jpg')",
          about: "url('./assets/about.png')",
          skill: "url('./assets/skill.png')",
        },
      },
    },
    plugins: [],
  };
  
>>>>>>> 431025954db3825fedeb17aa04b30ade4d0498ce
