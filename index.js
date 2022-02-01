import express from "express";
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {resolve} from 'path';
import createRouter from './api/createApiRouter.js';
import {passportConfig} from './authentification-config.js';
import {isAuthenticated} from './middleware.js'

passportConfig(passport);

const CORS = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
    'Access-Control-Allow-Credentials': "true"
};

const app = express();
const apiRouter = await createRouter()

app.use((req, res, next) => {
    res.set(CORS) && next()
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'itismymostreliablesalt',
    name: 'cookie',
    cookie: {
        "expires": 1209600000,
        "secure": false,
    },
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', isAuthenticated, apiRouter);

app.all('*', (req, res, next) => {
    if (req.url.startsWith('/api/')) {
        next()
    } else {
        res.sendFile(`${resolve()}/static/index.html`);
    }
});

app.listen(8080, console.log('Server Started'));
