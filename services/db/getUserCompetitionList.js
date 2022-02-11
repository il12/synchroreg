import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

async function getUserCompetitionsList(userid) {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.all('SELECT * from competition WHERE author=?', [userid]);
    return result;
}

export default getUserCompetitionsList;
