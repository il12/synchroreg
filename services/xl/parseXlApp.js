import xlsx from "xlsx";
import Athlete from "../../classes/Athlete.js";
import Solo from "../../classes/Solo.js";
import Duet from "../../classes/Duet.js";
import Team from "../../classes/Team.js";
import Staff from "#root/classes/Staff";
import HandledError from "#root/classes/Errors/HandledError";

let parseXlApp = function parseXlApp(file) {
    let workbook = xlsx.read(file)
    let worksheet = workbook.Sheets["Заявка"]
    let teamName = worksheet['C7'] ? worksheet['C7'].v : null
    let athletes = [];
    let staff = [];
    let isRepresentativeExists = false;
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
    if (!teamName) throw new HandledError('Укажите название команды')
    for (let i = 11; i < 49; i++) {
        if (worksheet[`B${i}`]) {
            if (!worksheet[`E${i}`]) throw new HandledError(`Укажите дату рождения у спортсмена ${worksheet[`B${i}`].v}`);
            if (!worksheet[`F${i}`]) throw new HandledError(`Укажите разряд у спортсмена ${worksheet[`B${i}`].v}`)
            if (!worksheet[`U${i}`]) throw new HandledError(`Укажите общество/школу у спортсмена ${worksheet[`B${i}`].v}`)
            if (!worksheet[`V${i}`]) throw new HandledError(`Укажите город у спортсмена ${worksheet[`B${i}`].v}`)
            if (!worksheet[`W${i}`]) throw new HandledError(`Укажите тренера у спортсмена ${worksheet[`B${i}`].v}`)
            let athlete = new Athlete(
                {
                    family: worksheet[`B${i}`].v,
                    name: worksheet[`C${i}`].v,
                    surname: worksheet[`D${i}`] ? worksheet[`D${i}`].v : null,
                },
                worksheet[`E${i}`].v,
                worksheet[`F${i}`].v,
                teamName,
                worksheet[`U${i}`].v,
                worksheet[`V${i}`].v,
                worksheet[`W${i}`].v,
            )
            athletes.push(athlete)

            if (worksheet[`G${i}`] && worksheet[`G${i}`].v === '+') {
                figures['joungling'].push(athlete)
            }

            if (worksheet[`H${i}`] && worksheet[`H${i}`].v === '+') {
                figures['padawan'].push(athlete)
            }

            if (worksheet[`I${i}`] && worksheet[`I${i}`].v === '+') {
                figures['junior'].push(athlete)
            }

            if (worksheet[`J${i}`] && worksheet[`J${i}`].v === '+') {
                figures['senior'].push(athlete)
            }

            if (worksheet[`K${i}`] && worksheet[`K${i}`].v.toUpperCase().endsWith('С')) {
                free['solo'].push(new Solo(
                    athlete
                ))
            }

            if (worksheet[`L${i}`] && (worksheet[`L${i}`].v.toUpperCase().endsWith('Д') || worksheet[`L${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`L${i}`].v, 10)
                athlete.isReserve = worksheet[`L${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ));
            }

            if (worksheet[`M${i}`] && (worksheet[`M${i}`].v.toUpperCase().endsWith('Д') || worksheet[`M${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`M${i}`].v, 10)
                athlete.isReserve = worksheet[`M${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`N${i}`] && (worksheet[`N${i}`].v.toUpperCase().endsWith('Г') || worksheet[`N${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`N${i}`].v, 10)
                athlete.isReserve = worksheet[`N${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`O${i}`] && (worksheet[`O${i}`].v.toUpperCase().endsWith('Г') || worksheet[`O${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`O${i}`].v, 10)
                athlete.isReserve = worksheet[`O${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`P${i}`] && (worksheet[`P${i}`].v.toUpperCase().endsWith('К') || worksheet[`P${i}`].v.toUpperCase().endsWith('Р') || worksheet[`P${i}`].v.toUpperCase().endsWith('Г'))) {
                let number = parseInt(worksheet[`P${i}`].v, 10)
                athlete.isReserve = worksheet[`P${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`Q${i}`] && worksheet[`Q${i}`].v.endsWith('С')) {
                tech['solo'].push(new Solo(athlete))
            }


            if (worksheet[`R${i}`] && (worksheet[`R${i}`].v.toUpperCase().endsWith('Д') || worksheet[`R${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`R${i}`].v, 10)
                athlete.isReserve = worksheet[`R${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`S${i}`] && (worksheet[`S${i}`].v.toUpperCase().endsWith('Д') || worksheet[`S${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`S${i}`].v, 10)
                athlete.isReserve = worksheet[`S${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }

            if (worksheet[`T${i}`] && (worksheet[`T${i}`].v.toUpperCase().endsWith('Г') || worksheet[`T${i}`].v.toUpperCase().endsWith('Р'))) {
                let number = parseInt(worksheet[`T${i}`].v, 10)
                athlete.isReserve = worksheet[`T${i}`].v.toUpperCase().endsWith('Р');
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
                    {
                        family: athlete.family,
                        name: athlete.name,
                        surname: athlete.surname,
                    },
                    athlete.dob,
                    athlete.discharge,
                    athlete.team,
                    athlete.organisation,
                    athlete.city,
                    athlete.coach,
                    athlete.isReserve
                ))
            }
        }
    }

    for (let i = 51; i < 59; i++) {
        if (worksheet[`B${i}`]) {
            if (!worksheet[`E${i}`] && !worksheet[`H${i}`] && !worksheet[`J${i}`])
                throw new HandledError(`Укажите как минимум одну роль у ${worksheet[`B${i}`].v}`)
            if (worksheet[`J${i}`] && !worksheet[`L${i}`])
                throw new HandledError(`Укажите категорию судьи ${worksheet[`B${i}`].v}`);
            if (worksheet[`J${i}`] && worksheet[`L${i}`].v !== 'б/к' && !worksheet[`P${i}`])
                throw new HandledError(`Укажите сведения о присвоении категории судье ${worksheet[`B${i}`].v}`);

            let staffMember = {
                name: worksheet[`B${i}`].v,
                team: teamName,
                coach: false,
                representative: false,
                judge: false
            }
            if (worksheet[`E${i}`] && worksheet[`E${i}`].v.toUpperCase() === "П") {
                if (isRepresentativeExists) throw new HandledError('В команде должен быть ровно один представитель')
                isRepresentativeExists = true;
                staffMember.representative = {role: 'представитель'}
            }
            if (worksheet[`H${i}`] && worksheet[`H${i}`].v.toUpperCase() === "Т") {
                staffMember.coach = {role: 'тренер'}
            }
            if (worksheet[`J${i}`] && worksheet[`J${i}`].v.toUpperCase() === "С") {
                staffMember.judge = {
                    role: 'судья',
                    category: worksheet[`L${i}`].v,
                    assignment: worksheet[`P${i}`]?.v,
                    renewal: worksheet[`U${i}`]?.v
                }
            }
            staff.push(
                new Staff(
                    staffMember.name,
                    staffMember.team,
                    staffMember.representative,
                    staffMember.coach,
                    staffMember.judge,
                )
            )
        }
    }

    if (!isRepresentativeExists) throw new HandledError('В команде должен быть ровно один представитель')

    const application = {
        teamName: teamName,
        athletes: athletes,
        staff: staff,
        figures: figures,
        free: free,
        tech: tech
    }
    return application;
};

export default parseXlApp
