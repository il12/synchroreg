import ExcelJS from "exceljs";
import addAppToSportsmenList from "#root/services/xl/addAppToSportsmenList";

async function getSportsmenList(applications) {
    const workbook = new ExcelJS.Workbook();
    workbook.calcProperties.fullCalcOnLoad = true;
    let initFile = await workbook.xlsx.readFile('assets/SPORTSMEN_LIST.xlsx');
    let resultFile = await initFile.xlsx.writeBuffer();
    for (const application of applications){
        resultFile = await addAppToSportsmenList(resultFile,JSON.parse(application.json));
    }
    return resultFile;
}

export default getSportsmenList;
