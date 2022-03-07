import ExcelJS from "exceljs";
import XLSX from "xlsx";
import addAppToOldProgram from "#root/services/xl/addAppToOldProgram";
import JSZip from "jszip";
import fs from "fs/promises";

async function getTeamSetup(applications) {
    const workbook = new ExcelJS.Workbook();
    workbook.calcProperties.fullCalcOnLoad = true;
    let initFile = await workbook.xlsx.readFile('assets/TEAMS_SETUP_5b.xlsx');
    let resultBuffer = await initFile.xlsx.writeBuffer();
    for (const application of applications){
        resultBuffer = await addAppToOldProgram(resultBuffer,JSON.parse(application.json));
    }
    const zip = await JSZip.loadAsync(resultBuffer);
    const customPropertiesData = await fs.readFile('assets/custom.xml')
    const contentTypesData = await fs.readFile('assets/[Content_Types].xml')
    const rels = await fs.readFile('assets/.rels')
    zip.file('docProps/custom.xml',customPropertiesData);
    zip.file('[Content_Types].xml',contentTypesData);
    zip.file('_rels/.rels',rels);
    return await zip.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
    })
}

export default getTeamSetup;
