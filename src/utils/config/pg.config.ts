import 'dotenv/config';

export const pgConfig = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: 30
}