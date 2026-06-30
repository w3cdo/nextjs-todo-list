import * as mysql from "mysql2/promise"

export const db = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT!, 10),
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME
})