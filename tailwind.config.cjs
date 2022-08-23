/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-red': '#cc3535',
        'brand-red-dark': '#CB5F5D',
        // dark: '#18181b',
        dark: '#0f0d0c',
        // dark: '#12181b',
        // 'dark-light': '#2F2F32',
        'dark-light': '#2a2e35',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            // color: '#1a1a1a',
            // color: theme('colors.zinc.900'),
            color: '#31302e',
            a: {
              color: '#cc3535',
              filter: 'var(--tw-brightness)',
              '&:hover': {
                color: '#ff7f00',
                '--tw-brightness': 'brightness(1.25)',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              fontWeight: 'normal',
              color: theme('colors.zinc.600'),
              borderLeft: '3px solid #cc3535',
              margin: '1em 1em',
              padding: '1em 1em',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:first-of-type::after': {
              content: '',
            },
          },
        },
        dark: {
          css: [
            {
              color: theme('colors.zinc.400'),
              '[class~="lead"]': {
                color: theme('colors.zinc.300'),
              },
              a: {
                color: '#CB5F5D',
              },
              strong: {
                color: theme('colors.zinc.200'),
              },
              'ol > li::before': {
                color: '#7F7F8F',
              },
              'ul > li::before': {
                backgroundColor: theme('colors.zinc.600'),
              },
              hr: {
                borderColor: theme('colors.zinc.800'),
              },
              blockquote: {
                color: '#7F7F8F',
                borderLeftColor: '#CB5F5D',
              },
              h1: {
                color: theme('colors.zinc.50'),
              },
              h2: {
                color: theme('colors.zinc.50'),
              },
              h3: {
                color: theme('colors.zinc.50'),
              },
              h4: {
                color: theme('colors.zinc.50'),
              },
              'figure figcaption': {
                color: '#7F7F8F',
              },
              code: {
                color: theme('colors.zinc.50'),
              },
              'a code': {
                color: theme('colors.zinc.50'),
              },
              pre: {
                color: theme('colors.zinc.200'),
                backgroundColor: theme('colors.zinc.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.zinc.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.zinc.600'),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      brightness: ['hover', 'focus'],
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
