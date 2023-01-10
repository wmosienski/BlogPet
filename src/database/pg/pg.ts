import { pgConfig } from "@Utils/config/pg.config";

const pgp = require('pg-promise')();

export const pg = pgp(pgConfig);

export async function initPG(): Promise<void> {
    try {
        const connection = await pg.connect();
        console.log("pg connected");
        return connection;
    } catch (error) {
        console.log("pg not connected\n" + error);
    }
}
