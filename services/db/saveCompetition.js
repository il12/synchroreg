import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function saveCompetition(competition){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    console.log(competition);
    const createTableSQL = `CREATE TABLE IF NOT EXISTS competition (
            id TEXT PRIMARY KEY,
            name TEXT, 
            dates TEXT, 
            place TEXT, 
            info TEXT, 
            deadline TEXT, 
            author INT, 
            file BLOB
         ) WITHOUT ROWID;`
    let deadlineDate = new Date(competition.deadline).toDateString();
    console.log(deadlineDate);
    await db.exec(createTableSQL);
    const insertSQL = await db.prepare('INSERT INTO competition (id,name,dates,place,info,deadline,author,file) VALUES (?,?,?,?,?,?,?,?);');
    await insertSQL.run([
        competition.id,
        competition.name,
        competition.dates,
        competition.place,
        competition.info,
        deadlineDate,
        competition.author,
        competition.file.buffer
    ])
}

export default saveCompetition;
