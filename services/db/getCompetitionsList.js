import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

async function getCompetitionsList() {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.all('SELECT * FROM competition;');
    return result;
}

export default getCompetitionsList;
