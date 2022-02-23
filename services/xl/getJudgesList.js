import ExcelJS from "exceljs";
import addAppToJudgesList from "#root/services/xl/addAppToJudgesList";

async function getJudgesList(applications) {
    const workbook = new ExcelJS.Workbook();
    workbook.calcProperties.fullCalcOnLoad = true;
    let initFile = await workbook.xlsx.readFile('assets/JUDGES_LIST.xlsx');
    let resultFile = await initFile.xlsx.writeBuffer();
    for (const application of applications){
        resultFile = await addAppToJudgesList(resultFile,JSON.parse(application.json));
    }
    return resultFile;
}

export default getJudgesList;
