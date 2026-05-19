/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (Amr Ziada Interiors Style Guide)
        cream:    '#FAFCFC',  // primary light  (#FAFCFC)
        walnut:   '#DA4F37',  // accent terra   (#DA4F37) — brand red-orange
        sand:     '#C9C9C9',  // secondary ash  (#C9C9C9)
        charcoal: '#373A3B',  // primary dark   (#373A3B)
        obsidian: '#0F1011',  // near-black surface for video backgrounds
        surface:  '#1A1B1D',
        card:     '#232527',
        // Explicit brand aliases for new code
        mist:     '#FAFCFC',
        terra:    '#DA4F37',
        ash:      '#C9C9C9',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        logo:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
