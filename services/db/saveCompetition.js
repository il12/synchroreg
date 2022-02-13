import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function saveCompetition(competition){
    try {
        const db = await open({
            filename: 'assets/database.db',
            driver: sqlite3.Database
        })
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
            competition.file?.buffer
        ])
    } catch (e) {
        if (e.errno === 19) {
            throw new HandledError('Такое соревнование уже существует. Обратитесь к разработчику')
        } else {
            throw e;
        }
    }
}

export default saveCompetition;
