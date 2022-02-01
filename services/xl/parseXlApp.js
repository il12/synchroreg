import xlsx from "xlsx";
import Athlete from "../../classes/Athlete.js";
import Solo from "../../classes/Solo.js";
import Duet from "../../classes/Duet.js";
import Team from "../../classes/Team.js";

let parseXlApp = function parseXlApp(file) {
    let workbook = xlsx.read(file)
    let worksheet = workbook.Sheets["Заявка"]
    let teamName = worksheet['C7'] ? worksheet['C7'].v : null
    let athletes = [];
    let figures = {
        'joungling': [],
        'padawan': [],
        'junior': [],
        'senior': []
    }
    let free = {
        solo: [],
        duet: [],
        mixed: [],
        team: [],
        highlight: [],
        combi: []
    };
    let tech = {
        solo: [],
        duet: [],
        mixed: [],
        team: [],
    }
    for (let i = 11; i < 23; i++) {
        if (worksheet[`B${i}`]) {
            let athlete = new Athlete(
                worksheet[`B${i}`].v,
                worksheet[`C${i}`].v,
                worksheet[`D${i}`].v,
                teamName,
                worksheet[`T${i}`].v,
            )
            athletes.push(athlete)

            if (worksheet[`E${i}`] && worksheet[`E${i}`].v === '+') {
                figures['joungling'].push(athlete)
            }

            if (worksheet[`F${i}`] && worksheet[`F${i}`].v === '+') {
                figures['padawan'].push(athlete)
            }

            if (worksheet[`G${i}`] && worksheet[`G${i}`].v === '+') {
                figures['junior'].push(athlete)
            }

            if (worksheet[`H${i}`] && worksheet[`H${i}`].v === '+') {
                figures['senior'].push(athlete)
            }

            if (worksheet[`I${i}`] && worksheet[`I${i}`].v.endsWith('С')) {
                free['solo'].push(new Solo(
                    athlete
                ))
            }

            if (worksheet[`J${i}`] && (worksheet[`J${i}`].v.endsWith('Д') || worksheet[`J${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`J${i}`].v, 10)
                athlete.isReserve = worksheet[`J${i}`].v.endsWith('Р');
                let currentDuet = free.duet.find(duet => duet.number === number)
                if (!currentDuet) {
                    let duet = new Duet(
                        number,
                        teamName
                    )
                    free.duet.push(duet);
                    currentDuet = duet;
                }
                currentDuet.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ));
            }

            if (worksheet[`K${i}`] && (worksheet[`K${i}`].v.endsWith('Д') || worksheet[`K${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`K${i}`].v, 10)
                athlete.isReserve = worksheet[`K${i}`].v.endsWith('Р');
                let currentDuet = free.mixed.find(duet => duet.number === number)
                if (!currentDuet) {
                    let duet = new Duet(
                        number,
                        teamName
                    )
                    free.mixed.push(duet);
                    currentDuet = duet;
                }

                currentDuet.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`L${i}`] && (worksheet[`L${i}`].v.endsWith('Г') || worksheet[`L${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`L${i}`].v, 10)
                athlete.isReserve = worksheet[`L${i}`].v.endsWith('Р');
                let currentTeam = free.team.find(team => team.number === number)
                if (!currentTeam) {
                    let team = new Team(
                        number,
                        teamName
                    )
                    free.team.push(team);
                    currentTeam = team;
                }
                currentTeam.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`M${i}`] && (worksheet[`M${i}`].v.endsWith('Г') || worksheet[`M${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`M${i}`].v, 10)
                athlete.isReserve = worksheet[`M${i}`].v.endsWith('Р');
                let currentTeam = free.highlight.find(team => team.number === number)
                if (!currentTeam) {
                    let team = new Team(
                        number,
                        teamName
                    )
                    free.highlight.push(team);
                    currentTeam = team;
                }
                currentTeam.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`N${i}`] && (worksheet[`N${i}`].v.endsWith('К') || worksheet[`N${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`N${i}`].v, 10)
                athlete.isReserve = worksheet[`N${i}`].v.endsWith('Р');
                let currentTeam = free.combi.find(team => team.number === number)
                if (!currentTeam) {
                    let team = new Team(
                        number,
                        teamName
                    )
                    free.combi.push(team);
                    currentTeam = team;
                }
                currentTeam.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`O${i}`] && worksheet[`O${i}`].v.endsWith('С')) {
                tech['solo'].push(new Solo(athlete))
            }


            if (worksheet[`P${i}`] && (worksheet[`P${i}`].v.endsWith('Д') || worksheet[`J${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`P${i}`].v, 10)
                athlete.isReserve = worksheet[`P${i}`].v.endsWith('Р');
                let currentDuet = tech.duet.find(duet => duet.number === number)
                if (!currentDuet) {
                    let duet = new Duet(
                        number,
                        teamName
                    )
                    tech.duet.push(duet);
                    currentDuet = duet;
                }
                currentDuet.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`Q${i}`] && (worksheet[`Q${i}`].v.endsWith('Д') || worksheet[`Q${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`Q${i}`].v, 10)
                athlete.isReserve = worksheet[`Q${i}`].v.endsWith('Р');
                let currentDuet = tech.mixed.find(duet => duet.number === number)
                if (!currentDuet) {
                    let duet = new Duet(
                        number,
                        teamName
                    )
                    tech.mixed.push(duet);
                    currentDuet = duet;
                }
                currentDuet.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`R${i}`] && (worksheet[`R${i}`].v.endsWith('Г') || worksheet[`R${i}`].v.endsWith('Р'))) {
                let number = parseInt(worksheet[`R${i}`].v, 10)
                athlete.isReserve = worksheet[`R${i}`].v.endsWith('Р');
                let currentTeam = tech.team.find(team => team.number === number)
                if (!currentTeam) {
                    let team = new Team(
                        number,
                        teamName
                    )
                    tech.team.push(team);
                    currentTeam = team;
                }
                currentTeam.add(new Athlete(
                    athlete.name,
                    athlete.year,
                    athlete.discharge,
                    athlete.team,
                    athlete.coach,
                    athlete.isReserve
                ))
            }
        }
    }

    const application = {
        teamName: teamName,
        athletes: athletes,
        figures: figures,
        free: free,
        tech: tech
    }
    return application;
};

export default parseXlApp
