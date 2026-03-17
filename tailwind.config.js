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
            },
            keyframes: {
                fadeInDown: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                dropIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-80px) scale(0.95)'
                    },
                    '60%': {
                        opacity: '1',
                        transform: 'translateY(10px) scale(1.02)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0) scale(1)'
                    }
                }
            },
            animation: {
                fadeInDown: 'fadeInDown 0.6s ease-out forwards',
                fadeInDownDelay1: 'fadeInDown 0.6s ease-out 0.2s forwards',
                fadeInDownDelay2: 'fadeInDown 0.6s ease-out 0.4s forwards',
                fadeInDownDelay3: 'fadeInDown 0.6s ease-out 0.6s forwards',
                dropIn: 'dropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                dropInDelay1: 'dropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards',
                dropInDelay2: 'dropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards',
                dropInDelay3: 'dropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s forwards',
                dropInDelay4: 'dropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards',
                dropInDelay5: 'dropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.75s forwards',
            }
        },
    },
    plugins: [],
}
