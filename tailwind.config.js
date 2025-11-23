/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./_batches/**/*.md",
    "./*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
