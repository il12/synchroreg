import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

async function deleteCompetitionById(id) {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get(`DELETE FROM competition WHERE competition.id=?`, [id]);
    return result;
}

export default deleteCompetitionById;
