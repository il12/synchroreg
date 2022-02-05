import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getFileCompetitionById(id){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get('SELECT file FROM competition WHERE id = ?;',
        id
    );
    return result.file;
}

export default getFileCompetitionById;
