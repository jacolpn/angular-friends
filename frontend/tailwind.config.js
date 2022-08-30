require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || false;

module.exports = {
    purge: {
        enabled: enablePurge,
        content: [
            './src/**/*.html',
            './src/**/*.css'
        ]
    },
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            screens: { 'sm': {'max': '700px'} }
        },
    },
    variants: {},
    plugins: [],
}
