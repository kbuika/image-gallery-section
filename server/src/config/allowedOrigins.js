require('dotenv').config();

const allowedOrigins = [
    process.env.DEV_APP_URL,
    process.env.PROD_APP_URL,
    "http://localhost:5173/",
];

module.exports = allowedOrigins;