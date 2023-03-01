import mysql from 'mysql';
import fs from 'fs';
import path from 'path';

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PWD || 'root',
    database: 'latinary',
});

// execute an SQL query and return a promise
export function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}