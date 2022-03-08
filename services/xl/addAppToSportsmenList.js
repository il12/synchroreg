import ExcelJS from "exceljs";

async function addAppToSportsmenList(buffer, app) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet('SPORTSMEN_LIST');

    const athleteCount = worksheet.getCell('I1').result;

    const startingLine = athleteCount + 1;
    console.log(startingLine)
    app.athletes.forEach((athlete, index) => {
        const athleteLine = startingLine + index;
        const id = worksheet.getCell(`A${athleteLine}`)
        id.value = athleteCount + index;
        const name = worksheet.getCell(`B${athleteLine}`)
        name.value = `${athlete.family} ${athlete.name} ${athlete.surname}`
        const year = worksheet.getCell(`C${athleteLine}`)
        year.value = athlete.year
        const discharge = worksheet.getCell(`D${athleteLine}`)
        discharge.value = athlete.discharge
        const city = worksheet.getCell(`G${athleteLine}`)
        city.value = athlete.city
        const organisation = worksheet.getCell(`H${athleteLine}`)
        organisation.value = athlete.organisation
    })

    worksheet.getCell('I1').value = {
        formula: worksheet.getCell('I1').value.formula,
        result: athleteCount + app.athletes.length,
    };

    return await workbook.xlsx.writeBuffer()
}

export default addAppToSportsmenList;
