import { pgConfig } from "@Utils/config/pg.config";

const pgp = require('pg-promise')();

const db = pgp(pgConfig);

let pgConnection: any;

export async function initPG(): Promise<void> {
    try {
        pgConnection = await db.connect();
        console.log("pg connected");
    } catch (error) {
        console.log("pg not connected\n" + error);
    }
}

export const pg = () => pgConnection;
