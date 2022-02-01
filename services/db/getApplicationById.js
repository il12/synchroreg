import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getApplicationById(id){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get(   `
    SELECT
        competition.name,
        competition.place,
        competition.deadline,
        competition.dates,
        application.rowid,
        application.json
    FROM competition
    INNER JOIN application
    ON
        competition.id = application.competition
    AND
        application.rowid=?`,[id]);
    return result;
}

export default getApplicationById;
