class HandledError extends Error {
    constructor(message){
        super(message);
        this.name = 'HandledError'
    }
}

export default HandledError;
