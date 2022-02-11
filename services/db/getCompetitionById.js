import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function getCompetitionById(id) {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.get('SELECT id,name,dates,place,info,deadline,author FROM competition WHERE id = ?;',
        id
    );
    if (!result) throw new HandledError('Данного соревнования не существует. Обновите страницу')
    return result;
}

export default getCompetitionById;
