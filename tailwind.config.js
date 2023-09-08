/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans-regular': ['sans-regular'],
                'sans-bold': ['sans-bold'],
                'sans-medium': ['sans-medium'],
                'sans-light': ['sans-light'],
                'sans-thin': ['sans-thin'],
            },
        },
    },
    plugins: [],
}