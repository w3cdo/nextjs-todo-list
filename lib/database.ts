const mysql = require("mysql2/promise");

export const db = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME
})