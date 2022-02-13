import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'

const Router = express.Router;
passportConfig(passport);

const logout = Router({mergeParams: true})
    .post('/auth/logout', (req, res, next) => {
            console.log(req.isAuthenticated());
            req.logout();
            console.log(req.isAuthenticated());
            res.status(200).end();
        }
    );

export default logout;

