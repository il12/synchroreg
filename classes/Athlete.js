import crypto from "crypto";

export default class Athlete{
    constructor(name, dob, discharge, team, organisation, city, coach, isReserve=false) {
        this.family = name.family;
        this.name = name.name;
        this.surname = name.surname ? name.surname : null;
        this.dob = dob;
        this.discharge = discharge;
        this.team = team;
        this.organisation = organisation;
        this.city = city;
        this.coach = coach;
        this.isReserve = isReserve
        this.id = this.getID();
    }
    getID(){
        const hash = crypto.createHash('sha256')
        hash.update(`${this.family} ${this.name} ${this.surname}`);
        hash.update(this.dob.toString());
        hash.update(this.team);
        return hash.copy().digest('hex');
    }
}
