/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-red': '#cc3535',
        'brand-red-dark': '#CB5F5D',
        dark: '#0f0d0c',
        'dark-light': '#19171D',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            color: '#31302e',
            a: {
              color: '#cc3535',
              filter: 'var(--tw-brightness)',
              '&:hover': {
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
            code: {
              color: theme('colors.slate.200'),
              backgroundColor: theme('colors.slate.800'),
              borderRadius: '0.15rem'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            '[class~="footnotes"]': {
              fontSize: '0.8em',
            },
            '[class~="data-footnote-backref"]': {
              fontSize: '0.8em',
              textDecoration: 'none',
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
