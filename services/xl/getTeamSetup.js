import ExcelJS from "exceljs";
import addAppToOldProgram from "#root/services/xl/addAppToOldProgram";

async function getTeamSetup(applications) {
    const workbook = new ExcelJS.Workbook();
    workbook.calcProperties.fullCalcOnLoad = true;
    let initFile = await workbook.xlsx.readFile('assets/TEAMS_SETUP_5.xlsx');
    let resultFile = await initFile.xlsx.writeBuffer();
    for (const application of applications){
        resultFile = await addAppToOldProgram(resultFile,JSON.parse(application.json));
    }
    return resultFile;
}

export default getTeamSetup;
