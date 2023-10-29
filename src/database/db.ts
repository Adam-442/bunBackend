import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqliteDB = new Database("sqlite.db", { create: true });
export const db = drizzle(sqliteDB);