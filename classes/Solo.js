import crypto from 'crypto';

export default class Solo{
    constructor(athlete) {
        this.athlete = athlete;
        this.id = this.getId();
    }
    getId(){
        const hash = crypto.createHash('sha256')
        hash.update(this.athlete.name);
        hash.update(this.athlete.team);
        return hash.copy().digest('hex');
    }
}
