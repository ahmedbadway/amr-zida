/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (Amr Ziada Interiors) — OKLCH
        cream:      'oklch(0.992 0.002 197)',
        walnut:     'oklch(0.635 0.162 33)',  // accent terra — brand red-orange
        'walnut-dark': 'oklch(0.535 0.158 33)',
        sand:       'oklch(0.835 0 0)',
        charcoal:   'oklch(0.330 0.004 230)',
        obsidian:   'oklch(0.155 0.003 250)',
        surface:    'oklch(0.215 0.003 250)',
        card:       'oklch(0.255 0.003 250)',
        danger:     'oklch(0.515 0.205 27)',
        mist:       'oklch(0.992 0.002 197)',
        terra:      'oklch(0.635 0.162 33)',
        ash:        'oklch(0.835 0 0)',
      },
      fontFamily: {
        display: ['Nunito', 'Cairo', 'system-ui', 'sans-serif'],
        body:    ['Nunito', 'Cairo', 'system-ui', 'sans-serif'],
        sans:    ['Nunito', 'Cairo', 'system-ui', 'sans-serif'],
        logo:    ['Nunito', 'Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
