/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:    '#F5F1ED',
        walnut:   '#8B7355',
        sand:     '#D4C5B9',
        charcoal: '#2C2C2C',
        obsidian: '#080808',
        surface:  '#111111',
        card:     '#161616',
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        body:    ["'DM Sans'", 'system-ui', 'sans-serif'],
        sans:    ["'DM Sans'", 'system-ui', 'sans-serif'],
        logo:    ["'Josefin Sans'", "'DM Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
