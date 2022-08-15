/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-red': '#cc3535',
        // dark: '#18181b',
        dark: '#12181b',
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
            color: '#1a1a1a',
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
              color: '#333',
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
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.brand-red'),
              },
              strong: {
                color: theme('colors.gray.200'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.800'),
              },
              blockquote: {
                color: theme('colors.gray.500'),
                borderLeftColor: theme('colors.brand-red'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
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
}
