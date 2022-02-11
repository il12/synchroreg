import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

async function deleteApplicationById(id) {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get(`DELETE FROM application WHERE application.rowid=?`, [id]);
    return result;
}

export default deleteApplicationById;
