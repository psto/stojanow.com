module.exports = {
  important: "html", // Override typography plugin with more specific selectors.
  mode: "jit",
  purge: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/*.md",
    "./*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "brand-red": "#cc3535",
      },
      typography: {
        DEFAULT: {
          css: {
            img: {
              marginLeft: "auto",
              marginRight: "auto",
            },
            color: "#1a1a1a",
            a: {
              color: "#cc3535",
              "&:hover": {
                color: "#ff7f00",
              },
            },
            blockquote: {
              fontStyle: "italic",
              fontWeight: "normal",
              color: "#333",
              borderLeft: "3px solid #cc3535",
              margin: "1em 1em",
              padding: "1em 1em",
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:first-of-type::after": {
              content: "",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      brightness: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
