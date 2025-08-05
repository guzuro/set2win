/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,ts,vue}'],
    theme: {
        extend: {},
        screens: { //https://antdv.com/components/layout#breakpoint-width
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1600px',
            xxxl: '2000px',
        }
    },
    plugins: [require('@tailwindcss/container-queries')],
}
