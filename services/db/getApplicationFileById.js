import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function getFileApplicationById(id) {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get('SELECT file FROM application WHERE author = ?;',
        id
    );
    if (!result) throw new HandledError('К данному соревнованию не прикреплён файл');
    return result.file;
}

export default getFileApplicationById;
