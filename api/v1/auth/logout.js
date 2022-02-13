import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'

const Router = express.Router;
passportConfig(passport);

const login = Router({mergeParams: true})
    .post('/auth/login', (req, res, next) => {
            req.session.destroy(()=>{
                res.end();
            });
        }
    );

export default login;

