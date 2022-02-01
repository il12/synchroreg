import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getApplicationsByCompetitionId(id){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.all(   `
    SELECT
        rowid,
        json
    FROM 
        application 
    WHERE
        competition=?`,[id]);
    return result;
}

export default getApplicationsByCompetitionId;
