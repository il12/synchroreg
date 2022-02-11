import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function getApplicationById(id) {
    const db = await open({
        filename: 'assets/database.db', driver: sqlite3.Database
    })
    const result = await db.get(`
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
                application.rowid=?`,
        [id]);
    if (!result) throw new HandledError('Этой заявки не существует. Обновите страницу');
    return result;

}

export default getApplicationById;
