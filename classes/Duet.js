import crypto from 'crypto';
import HandledError from "#root/classes/Errors/HandledError";

export default class Duet{
    constructor(number, team) {
        this.number = number;
        this.hash = crypto.createHash('sha256')
        this.hash.update(team);
        this.id = this.hash.copy().digest('hex');
        this.athletes = [];
        this.team = team;
    }

    add(athlete){
        if(this.athletes.length<3) {
            this.athletes.push(athlete);
            this.hash.update(athlete.name);
            this.id = this.hash.copy().digest('hex')
        } else {
            throw new HandledError(`Too much athletes for duet number ${this.number}`);
        }
    }
}
