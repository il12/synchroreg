import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getCompetitionById(id){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get('SELECT id,name,dates,place,info,deadline,author FROM competition WHERE id = ?;',
        id
    );
    return result;
}

export default getCompetitionById;
