import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getUserApplicationList(userid){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.all(`
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
        application.author=?`,[userid]);
    return result;
}

export default getUserApplicationList;
