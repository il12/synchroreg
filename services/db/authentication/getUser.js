import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getUser(user){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get('SELECT * FROM users WHERE login = ? AND password = ?;',[
        user.login,
        user.password,
    ]);
    return result;
}

export default getUser;
