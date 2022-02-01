import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getCompetition(competition){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get('SELECT * FROM competition WHERE name = ? AND dates = ? AND place = ?;',[
        competition.name,
        competition.dates,
        competition.place
    ]);
    return result;
}

export default getCompetition;
