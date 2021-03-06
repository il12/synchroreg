import logger from "#root/services/logger";

const isAuthenticated = function(req,res,next){
    "use strict";
    const freeAccess = [
        '/',
        '/favicon.ico',
        '/login',
        '/auth/login',
        '/auth/signup',
        '/auth/logout',
        '/signup',
        '/getCompetitionList',
    ]
    console.log(req.url);
    console.log(freeAccess.includes(req.url), req.isAuthenticated(), freeAccess.includes(req.url) || req.isAuthenticated())
    if(freeAccess.includes(req.url) || req.isAuthenticated() ){
        next();
    } else {
        res.status(401).end();
    }
};

const logRequest = (req)=>{
    logger.log({
        level: 'verbose',
        message: `${req.protocol} ${req.method} - ${req.url} from ${req.ip}`,
    })
    return true;
}

export { isAuthenticated, logRequest };
