import ExcelJS from "exceljs";

async function addAppToOldProgram(buffer, app) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet('TEAMS_SETUP');

    const athleteCount = worksheet.getCell('AC2').result;
    const staffCount = worksheet.getCell('AD2').result;
    const teamCount = worksheet.getCell('Y2').result;
    const freeSoloCount = worksheet.getCell('N2').result;
    const freeDuetCount = worksheet.getCell('O2').result;
    const freeMixedCount = worksheet.getCell('P2').result;
    const freeTeamCount = worksheet.getCell('Q2').result;
    const freeHighlightCount = worksheet.getCell('R2').result;
    const freeCombiCount = worksheet.getCell('S2').result;
    const techSoloCount = worksheet.getCell('T2').result;
    const techDuetCount = worksheet.getCell('U2').result;
    const techMixedCount = worksheet.getCell('V2').result;
    const techTeamCount = worksheet.getCell('W2').result;

    const newTeamLine = teamCount + 4;
    const startingLine = athleteCount + 4;
    const staffStartingLine = staffCount + 4;

    worksheet.getCell(`Y${newTeamLine}`).value = teamCount+1

    app.athletes.forEach((athlete, index) => {
        const athleteLine = startingLine + index;
        const id = worksheet.getCell(`A${athleteLine}`)
        id.value = athleteCount + index + 1;
        const name = worksheet.getCell(`B${athleteLine}`)
        name.value = `${athlete.family} ${athlete.name}`
        const dob = worksheet.getCell(`C${athleteLine}`)
        dob.value = athlete.dob
        const discharge = worksheet.getCell(`D${athleteLine}`)
        discharge.value = athlete.discharge
        const team = worksheet.getCell(`E${athleteLine}`)
        team.value = athlete.team
        const athleteId = worksheet.getCell(`F${athleteLine}`)
        athleteId.value = athlete.id
        const coach = worksheet.getCell(`H${athleteLine}`)
        coach.value = athlete.coach

        const isJounglingFigures = app.figures.joungling.findIndex(item => item.id === athlete.id)
        const isPadawanFigures = app.figures.padawan.findIndex(item => item.id === athlete.id)
        const isJuniorFigures = app.figures.junior.findIndex(item => item.id === athlete.id)
        const isSeniorFigures = app.figures.senior.findIndex(item => item.id === athlete.id)

        if (isJounglingFigures !== -1) {
            const jounglingCell = worksheet.getCell(`J${athleteLine}`)
            jounglingCell.value = '+'
        }

        if (isPadawanFigures !== -1) {
            const padawanCell = worksheet.getCell(`K${athleteLine}`)
            padawanCell.value = '+'
        }

        if (isJuniorFigures !== -1) {
            const juniorCell = worksheet.getCell(`L${athleteLine}`)
            juniorCell.value = '+'
        }

        if (isSeniorFigures !== -1) {
            const seniorCell = worksheet.getCell(`M${athleteLine}`)
            seniorCell.value = '+'
        }

        const doFreeSolo = app.free.solo.findIndex(solo => {
            return solo.athlete.id === athlete.id;
        })
        const doFreeDuet = app.free.duet.findIndex(duet => {
            return duet.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })
        const doFreeMixed = app.free.mixed.findIndex(mixed => {
            return mixed.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })
        const doFreeTeam = app.free.team.findIndex(team => {
            return team.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })
        const doFreeHighlight = app.free.highlight.findIndex(highlight => {
            return highlight.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })
        const doFreeCombi = app.free.combi.findIndex(combi => {
            return combi.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })

        const doTechSolo = app.tech.solo.findIndex(solo => {
            return solo.athlete.id === athlete.id;
        })
        const doTechDuet = app.tech.duet.findIndex(duet => {
            return duet.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })
        const doTechMixed = app.tech.mixed.findIndex(mixed => {
            return mixed.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })
        const doTechTeam = app.tech.team.findIndex(team => {
            return team.athletes.findIndex(item => item.id === athlete.id) !== -1;
        })

        if (doFreeSolo !== -1) {
            const solo = app.free.solo[doFreeSolo];
            const isReserve = solo.athlete.isReserve;
            const soloCell = worksheet.getCell(`N${athleteLine}`)
            soloCell.value = `${freeSoloCount + doFreeSolo + 1}${isReserve ? 'Р' : 'С'}`
        }
        if (doFreeDuet !== -1) {
            const duet = app.free.duet[doFreeDuet];
            const isReserve = duet.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const duetCell = worksheet.getCell(`O${athleteLine}`)
            duetCell.value = `${freeDuetCount + duet.number}${isReserve ? 'Р' : 'Д'}`
        }
        if (doFreeMixed !== -1) {
            const mixed = app.free.mixed[doFreeMixed];
            const isReserve = mixed.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const mixedCell = worksheet.getCell(`P${athleteLine}`)
            mixedCell.value = `${freeMixedCount + mixed.number}${isReserve ? 'Р' : 'Д'}`
        }
        if (doFreeTeam !== -1) {
            const team = app.free.team[doFreeTeam];
            const isReserve = team.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const teamCell = worksheet.getCell(`Q${athleteLine}`)
            teamCell.value = `${freeTeamCount + team.number}${isReserve ? 'Р' : 'Г'}`
        }
        if (doFreeHighlight !== -1) {
            const highlight = app.free.highlight[doFreeHighlight];
            const isReserve = highlight.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const highlightCell = worksheet.getCell(`R${athleteLine}`)
            highlightCell.value = `${freeHighlightCount + highlight.number}${isReserve ? 'Р' : 'Г'}`
        }
        if (doFreeCombi !== -1) {
            const combi = app.free.combi[doFreeCombi];
            console.log(`${athlete.family} combi - ${combi.number}`);
            const isReserve = combi.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const combiCell = worksheet.getCell(`S${athleteLine}`)
            combiCell.value = `${freeCombiCount + combi.number}${isReserve ? 'Р' : 'К'}`
        }


        if (doTechSolo !== -1) {
            const solo = app.tech.solo[doTechSolo];
            const isReserve = solo.athlete.isReserve;
            const soloCell = worksheet.getCell(`T${athleteLine}`)
            soloCell.value = `${techSoloCount + doTechSolo + 1}${isReserve ? 'Р' : 'С'}`
        }
        if (doTechDuet !== -1) {
            const duet = app.tech.duet[doTechDuet];
            const isReserve = duet.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const duetCell = worksheet.getCell(`U${athleteLine}`)
            duetCell.value = `${techDuetCount + duet.number}${isReserve ? 'Р' : 'Д'}`
        }
        if (doTechMixed !== -1) {
            const mixed = app.tech.mixed[doTechMixed];
            const isReserve = mixed.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const mixedCell = worksheet.getCell(`V${athleteLine}`)
            mixedCell.value = `${techMixedCount + mixed.number}${isReserve ? 'Р' : 'Д'}`
        }
        if (doTechTeam !== -1) {
            const team = app.tech.team[doTechTeam];
            const isReserve = team.athletes.filter(item => item.id === athlete.id)[0].isReserve;
            const teamCell = worksheet.getCell(`W${athleteLine}`)
            teamCell.value = `${techTeamCount + team.number}${isReserve ? 'Р' : 'Г'}`
        }
    })

    app.staff.forEach((staffMember,index)=>{
        const staffLine = staffStartingLine + index;
        const id = worksheet.getCell(`AF${staffLine}`)
        id.value = staffCount + index + 1;
        const name = worksheet.getCell(`AG${staffLine}`)
        name.value = staffMember.name
        const team = worksheet.getCell(`AH${staffLine}`)
        team.value = staffMember.team
        let roleString = '';
        roleString+=staffMember.representative ? `${staffMember.representative.role} ` : '';
        roleString+=staffMember.coach ? `${staffMember.coach.role} ` : '';
        roleString+=staffMember.judge ? `${staffMember.judge.role}` : '';
        const role = worksheet.getCell(`AI${staffLine}`)
        role.value = roleString
    })

    worksheet.getCell('AC2').value = {
        formula: worksheet.getCell('AC2').value.formula,
        result: Number(athleteCount)+app.athletes.length,
    };
    worksheet.getCell('AD2').value = {
        formula: worksheet.getCell('AD2').value.formula,
        result: Number(staffCount)+app.staff.length,
    };
    worksheet.getCell('Y2').value = {
        formula: worksheet.getCell('Y2').value.formula,
        result: Number(teamCount)+1,
    };
    worksheet.getCell('N2').value = {
        formula: worksheet.getCell('N2').value.formula,
        result: Number(freeSoloCount)+app.free.solo.length,
    };
    worksheet.getCell('O2').value = {
        formula: worksheet.getCell('O2').value.formula,
        result: Number(freeDuetCount)+app.free.duet.length,
    };
    worksheet.getCell('P2').value = {
        formula: worksheet.getCell('P2').value.formula,
        result: Number(freeMixedCount)+app.free.mixed.length,
    };
    worksheet.getCell('Q2').value = {
        formula: worksheet.getCell('Q2').value.formula,
        result: Number(freeTeamCount)+app.free.team.length,
    };
    worksheet.getCell('R2').value = {
        formula: worksheet.getCell('R2').value.formula,
        result: Number(freeHighlightCount)+app.free.highlight.length,
    };
    worksheet.getCell('S2').value = {
        formula: worksheet.getCell('S2').value.formula,
        result: Number(freeCombiCount)+app.free.combi.length,
    };
    worksheet.getCell('T2').value = {
        formula: worksheet.getCell('T2').value.formula,
        result: Number(techSoloCount)+app.tech.solo.length,
    };
    worksheet.getCell('U2').value = {
        formula: worksheet.getCell('U2').value.formula,
        result: Number(techDuetCount)+app.tech.duet.length,
    };
    worksheet.getCell('V2').value = {
        formula: worksheet.getCell('V2').value.formula,
        result: Number(techMixedCount)+app.tech.mixed.length,
    };
    worksheet.getCell('W2').value = {
        formula: worksheet.getCell('W2').value.formula,
        result: Number(techTeamCount)+app.tech.team.length,
    };

    const newTeam = worksheet.getCell(`Z${newTeamLine}`);
    newTeam.value = app.teamName;
    return await workbook.xlsx.writeBuffer()
}

export default addAppToOldProgram;
