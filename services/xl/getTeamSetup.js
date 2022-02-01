import ExcelJS from "exceljs";
import addAppToOldProgram from "#root/services/xl/addAppToOldProgram";

async function getTeamSetup(applications) {
    const workbook = new ExcelJS.Workbook();
    let initFile = await workbook.xlsx.readFile('assets/TEAMS_SETUP_5.xlsx');
    let initBuffer = await initFile.xlsx.writeBuffer();
    const file = applications.reduce((accum,item)=>addAppToOldProgram(accum,JSON.parse(item.json)), initBuffer)
    return file;
}

export default getTeamSetup;
