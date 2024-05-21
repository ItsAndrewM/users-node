import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING, // Replace with your PostgreSQL connection string
});

export default pool;
