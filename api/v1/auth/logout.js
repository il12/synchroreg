import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'

const Router = express.Router;
passportConfig(passport);

const login = Router({mergeParams: true})
    .post('/auth/login', (req, res, next) => {
            console.log(req.session);
            req.logout();
            console.log(req.session);
            res.status(200).clearCookie('cookie', {path: '/'}).end();
        }
    );

export default login;

