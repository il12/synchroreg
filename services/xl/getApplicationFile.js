import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import ExcelJS from "exceljs";

async function getApplicationFile(id){
    const db = await open({
        filename: 'assets/database.db',
        driver: sqlite3.Database
    })
    const competition = await db.get('SELECT name,dates,place FROM competition WHERE id = ?;',
        id
    );

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('assets/Заявка.xlsm');
    const worksheet = workbook.getWorksheet('Заявка');

    const nameCell = worksheet.getCell('C3');
    const datesCell = worksheet.getCell('C4');
    const placeCell = worksheet.getCell('C5');

    nameCell.value = competition.name;
    datesCell.value = competition.dates;
    placeCell.value = competition.place;

    return await workbook.xlsx.writeBuffer()
}

export default getApplicationFile;
