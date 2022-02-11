import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import HandledError from "#root/classes/Errors/HandledError";

async function getApplicationsByCompetitionId(id) {
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const result = await db.all(`
            SELECT
                rowid,
                json
            FROM 
                application 
            WHERE
                competition=?`,
        [id]);
    if (!result) throw new HandledError('На это соревнование не подано ни одной заявки');
    return result;

}

export default getApplicationsByCompetitionId;
