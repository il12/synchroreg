import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function getUser(user) {
    try {
        const db = await open({
            filename: 'assets/database.db',
            driver: sqlite3.Database
        })
        const result = await db.get('SELECT * FROM users WHERE login = ? AND password = ?;', [
            user.login,
            user.password,
        ]);
        return result;
    } catch (e) {
        throw e;
    }
}

export default getUser;
