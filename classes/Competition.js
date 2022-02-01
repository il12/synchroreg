import crypto from "crypto";

export default class Competition {
    constructor(name, dates, place, info, deadline, author, file) {
        this.name = name;
        this.dates = dates;
        this.place = place;
        this.info = info;
        this.file = file;
        this.deadline = deadline;
        this.author = author
        this.id = this.getID();
    }

    getID() {
        const hash = crypto.createHash('sha256')
        hash.update(this.name);
        hash.update(this.dates);
        hash.update(this.place);
        return hash.copy().digest('hex');
    }
}
