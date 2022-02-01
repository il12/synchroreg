import saveCompetition from "./saveCompetition.js";
import Competition from "../../classes/Competition.js";

async function createCompetition(data,file) {
    let competition = new Competition(data.name,data.dates,data.place,data.info, data.deadline, data.author, file);
    return await saveCompetition(competition)
}

export default createCompetition;
