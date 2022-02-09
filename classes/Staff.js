import crypto from "crypto";

export default class Staff{
    constructor(name, team, representative=false, coach=false, judge=false) {
        if(!representative && !coach && !judge){
            throw new Error('Staff should have at least one role')
        }
        this.name = name;
        this.team = team;
        this.representative = representative;
        this.coach = coach;
        this.judge = judge;
    }
}
