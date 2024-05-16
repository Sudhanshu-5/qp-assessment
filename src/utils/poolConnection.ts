import { createPool } from "mysql2";
import { Pool, PoolOptions } from "mysql2/typings/mysql/lib/Pool";

const poolConfig: PoolOptions = {
  host: "db",
  user: "root",
  password: "root",
  database: "grocery_store",
  waitForConnections: true,
  connectionLimit: 5,
};

const pool: Pool = createPool(poolConfig);
export const promisePool = pool.promise();
