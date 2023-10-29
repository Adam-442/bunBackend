import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
await migrate(db, { migrationsFolder: "./drizzle" });

// I wrote this file to execuute it in the command line (Terminal)