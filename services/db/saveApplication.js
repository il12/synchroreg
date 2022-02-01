import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function saveApplication(data,file){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const createTableSQL = `CREATE TABLE IF NOT EXISTS application (
            competition TEXT,
            author TEXT, 
            json TEXT, 
            file BLOB
         )`
    console.log(data);
    await db.exec(createTableSQL);
    const insertSQL = await db.prepare('INSERT INTO application (competition,author,json,file) VALUES (?,?,?,?);');
    await insertSQL.run([
        data.competition,
        data.author,
        data.application,
        file.buffer,
    ])
}

export default saveApplication;
