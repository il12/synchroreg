const isAuthenticated = function(req,res,next){
    "use strict";
    const freeAccess = [
        '/',
        '/favicon.ico',
        '/login',
        '/api/login',
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

export { isAuthenticated };
