/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
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
                '--tw-brightness': 'brightness(1.10)',
                color: 'black',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              fontWeight: 'normal',
              color: 'var(--color-zinc-600)',
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
              color: 'var(--color-slate-200)',
              backgroundColor: 'var(--color-slate-800)',
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
            hr: {
              borderColor: 'var(--color-zinc-600)',
            },
          },
        },
        dark: {
          css: [
            {
              color: 'var(--color-zinc-400)',
              '[class~="lead"]': {
                color: 'var(--color-zinc-300)',
              },
              a: {
                color: '#CB5F5D',
                '&:hover': {
                  color: 'white',
                },
              },
              strong: {
                color: 'var(--color-zinc-200)',
              },
              'ol > li::before': {
                color: '#7F7F8F',
              },
              'ul > li::before': {
                backgroundColor: 'var(--color-zinc-600)',
              },
              hr: {
                borderColor: 'var(--color-zinc-400)',
              },
              blockquote: {
                color: '#7F7F8F',
                borderLeftColor: '#CB5F5D',
              },
              h1: {
                color: 'var(--color-zinc-50)',
              },
              h2: {
                color: 'var(--color-zinc-50)',
              },
              h3: {
                color: 'var(--color-zinc-50)',
              },
              h4: {
                color: 'var(--color-zinc-50)',
              },
              'figure figcaption': {
                color: '#7F7F8F',
              },
              code: {
                color: 'var(--color-zinc-50)',
              },
              'a code': {
                color: 'var(--color-zinc-50)',
              },
              pre: {
                color: 'var(--color-zinc-200)',
                backgroundColor: 'var(--color-zinc-800)',
              },
              thead: {
                color: 'var(--color-white)',
                borderBottomColor: 'var(--color-zinc-400)',
              },
              'tbody tr': {
                borderBottomColor: 'var(--color-zinc-600)',
              },
            },
          ],
        },
      }),
    },
  },
};
