/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx",
        "./constants.tsx",
        "./types.ts"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0284c7', // Sky 600 - Professional Blue
                secondary: '#0f172a', // Slate 900 - Dark Navy/Black
                accent: '#38bdf8', // Sky 400 - Lighter Blue
                cream: '#f0f9ff', // Sky 50 - Very Light Blue Tint
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
