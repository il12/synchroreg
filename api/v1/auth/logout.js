import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'

const Router = express.Router;
passportConfig(passport);

const login = Router({mergeParams: true})
    .post('/auth/login', (req, res, next) => {
            req.logout();
            console.log(res.cookies);
            res.status(200).clearCookie('cookie', {path: '/'}).end();
        }
    );

export default login;

