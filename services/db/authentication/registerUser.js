import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function registerUser(user){
    try {
        const db = await open({
            filename: 'assets/database.db',
            driver: sqlite3.Database
        })
        const createTableSQL = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, login TEXT UNIQUE, password TEXT, name TEXT, email TEXT, access INTEGER DEFAULT 0);'
        await db.exec(createTableSQL);
        const insertSQL = await db.prepare('INSERT INTO users (login,password,name,email) VALUES (?,?,?,?);');
        const result = await insertSQL.run([user.login, user.password, user.name, user.email])
        return result;
    } catch (e) {
        if(e.errno == 19){
            throw new HandledError('Пользователь с данным логином уже существует');
        }
        throw e;
    }
}

export default registerUser;
