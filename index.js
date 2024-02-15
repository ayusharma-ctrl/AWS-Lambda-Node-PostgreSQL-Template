const { Pool } = require('pg');
const http = require('http');


const host = process.env.BACKEND_HOST
const path = process.env.BACKEND_PATH

const db_user = process.env.DB_USER
const db_host = process.env.DB_HOST
const db_database = process.env.DB_DATABASE
const db_password = process.env.DB_PASSWORD
const db_port = process.env.DB_PORT


const pool = new Pool({
    user: db_user,
    host: db_host,
    database: db_database,
    password: db_password,
    port: db_port,
});


function postRequest(body) {
    const options = {
        hostname: host,
        path: path,
        method: 'POST',
        port: 80,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (err) {
                    reject(new Error(err));
                }
            });
        });

        req.on('error', err => {
            reject(new Error(err));
        });

        req.write(JSON.stringify(body));
        req.end();
    });
}


exports.handler = async event => {
    try {
        const client = await pool.connect()

        const query = 'write your query'

        let result = [];

        try {
            await client.query('BEGIN');
            try {
                result = await client.query(query);
                await client.query('COMMIT');
            } catch (err) {
                await client.query('ROLLBACK');
                throw err;
            }
        } finally {
            client.release();
        }

        const response = await postRequest(result);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.log('Error️', error);
        return {
            statusCode: 400,
            body: error.message,
        };
    }
};