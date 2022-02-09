import crypto from "crypto";

export default class Athlete{
    constructor(name, year, discharge, team, organisation, city, coach, isReserve=false) {
        this.name = name;
        this.year = year;
        this.discharge = discharge;
        this.team = team;
        this.organisation = organisation;
        this.city = city;
        this.coach = coach;
        this.isReserve = isReserve
        this.id = this.getId();
    }
    getId(){
        const hash = crypto.createHash('sha256')
        hash.update(this.name);
        hash.update(this.year.toString());
        hash.update(this.team);
        return hash.copy().digest('hex');
    }
}
