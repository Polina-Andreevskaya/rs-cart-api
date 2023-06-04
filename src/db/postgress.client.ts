import { Pool } from 'pg';

const {
    PG_PASSWORD,
    PG_USERNAME,
    PG_DATABASE,
    PG_PORT,
    PG_HOST,
} = process.env;

const options = {
    host: PG_HOST,
    port: Number(PG_PORT),
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
};

console.log('DB Connection Option: ', options);

let pool;

export const query_db = async (query: string) => {
    if (!pool) {
        pool = new Pool(options);
    }
    const client = await pool.connect();

    try {
        return await client.query(query);
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
};
