/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'hsl(220, 90%, 56%)',
                    dark: 'hsl(220, 90%, 45%)',
                },
                secondary: 'hsl(280, 70%, 60%)',
                success: 'hsl(142, 76%, 45%)',
                warning: 'hsl(38, 92%, 50%)',
                danger: 'hsl(0, 84%, 60%)',
                dark: 'hsl(220, 20%, 15%)',
                light: 'hsl(220, 15%, 97%)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}
