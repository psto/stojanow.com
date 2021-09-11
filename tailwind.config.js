module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-red': '#cc3535'
      }
    },
  },
  variants: {
    extend: {
      brightness: ['hover', 'focus'],
    },
  },
  plugins: [],
}
