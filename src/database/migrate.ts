import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

import * as schema from "./schema";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
await migrate(db, { migrationsFolder: "./drizzle" });

await db.insert(schema.ActivitiesTable).values([
    {ActivityName: 'outlet'},
    {ActivityName: 'real estate'},
    {ActivityName: 'laundry'},
    {ActivityName: 'retail'},
    {ActivityName: 'store'},
])

await db.insert(schema.PermissionsTable).values([
    {PermissionName: 'delete'},
    {PermissionName: 'add'},
    {PermissionName: 'update'},
    {PermissionName: 'view'},
])

// I wrote this file to execuute it in the command line (Terminal)