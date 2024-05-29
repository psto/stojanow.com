import js from "@eslint/js"
import eslintPluginAstro from "eslint-plugin-astro"

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  }
]
