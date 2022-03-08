import crypto from "crypto";

export default class Competition {
    constructor(name, dates, place, info = null, deadline, author, file = null) {
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
        return crypto.randomUUID()
    }
}
