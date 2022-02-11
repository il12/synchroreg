import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function saveApplication(data, file) {
    try {
        const db = await open({
            filename: 'assets/database.db',
            driver: sqlite3.Database
        })
        const createTableSQL = `CREATE TABLE IF NOT EXISTS application (
            competition TEXT,
            author TEXT,
            teamName TEXT, 
            json TEXT, 
            file BLOB,
            UNIQUE(competition, teamName)
         )`
        let teamName = JSON.parse(data.application).teamName;
        await db.exec(createTableSQL);
        const insertSQL = await db.prepare('INSERT INTO application (competition,author,teamName,json,file) VALUES (?,?,?,?,?);');
        await insertSQL.run([
            data.competition,
            data.author,
            teamName,
            data.application,
            file.buffer,
        ])
    } catch (e) {
        if (e.errno === 19) {
            throw new HandledError('Команда с таким названием уже зарегистрирована на данное соревнование')
        } else {
            throw e;
        }
    }
}

export default saveApplication;
