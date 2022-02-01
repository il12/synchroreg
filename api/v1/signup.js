import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'

const Router = express.Router;
passportConfig(passport);

const signup = Router({mergeParams: true})
    .post('/signup', (req, res, next) => {
            passport.authenticate(
                'signup',
                {session: true},
                (err) => {
                    if (err) {
                        throw next(err);
                    }
                    res.redirect('/');
                }
            )(req, res, next)
        }
    );

export default signup;
