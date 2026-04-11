export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lume: {
          sand: '#efe5d8',
          chalk: '#f7f1ea',
          stone: '#d7c6b0',
          olive: '#6d725f',
          sea: '#8da6aa',
          ink: '#2c211b',
          clay: '#9f7757'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif']
      },
      boxShadow: {
        soft: '0 24px 80px rgba(66, 46, 30, 0.14)'
      },
      letterSpacing: {
        wideish: '0.18em'
      }
    }
  },
  plugins: []
};
