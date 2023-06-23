import { createPool } from 'mysql2/promise';

const { DB_HOST } = require("../config/db.config");
const { DB_NAME } = require("../config/db.config");
const { DB_PASSWORD } = require("../config/db.config");
const { DB_USER } = require("../config/db.config");
const { DB_PORT } = require("../config/db.config");

export const pool = createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME
});
