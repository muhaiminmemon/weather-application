/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      background: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      colors: {
        'blue-700': '#2B6CB0',
        'purple-700': '#8B5CF6',
        'yellow-700': '#D97706',
        'red-700': '#DC2626',
      },
    },
  },
  plugins: [],
}