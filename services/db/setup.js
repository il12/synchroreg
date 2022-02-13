import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const setupDB = async ()=> {
    try {
        const createApplicationTableSQL = `CREATE TABLE IF NOT EXISTS application (
            competition TEXT,
            author TEXT,
            teamName TEXT, 
            json TEXT, 
            file BLOB,
            UNIQUE(competition, teamName)
         )`
        const createUserTableSQL = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY, 
            login TEXT UNIQUE,
            password TEXT, 
            name TEXT, 
            email TEXT, 
            access INTEGER DEFAULT 0
            );`
        const createCompetitionTableSQL = `CREATE TABLE IF NOT EXISTS competition (
            id TEXT PRIMARY KEY,
            name TEXT, 
            dates TEXT, 
            place TEXT, 
            info TEXT, 
            deadline TEXT, 
            author INT, 
            file BLOB
         ) WITHOUT ROWID;`

        const db = await open({
            filename: 'assets/database.db',
            driver: sqlite3.Database
        })

        await db.exec(createUserTableSQL);
        await db.exec(createCompetitionTableSQL);
        await db.exec(createApplicationTableSQL)
    } catch (e) {
        throw e;
    }
}

export default setupDB;
