import ExcelJS from "exceljs";

async function addAppToJudgesList(buffer, app) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet('SPORTSMEN_LIST');

    const judgesCount = worksheet.getCell('F1').result;

    const startingLine = judgesCount + 1;

    const judges = app.staff.filter(item=>item.judge);
    console.log(startingLine)
    judges.forEach((staff, index) => {
        const judgeLine = startingLine + index;
        const id = worksheet.getCell(`A${judgeLine}`)
        id.value = judgesCount + index;
        const name = worksheet.getCell(`B${judgeLine}`)
        name.value = staff.name
        const category = worksheet.getCell(`C${judgeLine}`)
        category.value = staff.judge.category
        const assignment = worksheet.getCell(`D${judgeLine}`)
        assignment.value = staff.judge.assignment
        const renewal = worksheet.getCell(`E${judgeLine}`)
        renewal.value = staff.judge.renewal
    })

    worksheet.getCell('F1').value = {
        formula: worksheet.getCell('F1').value.formula,
        result: judgesCount + judges.length,
    };

    return await workbook.xlsx.writeBuffer()
}

export default addAppToJudgesList;
