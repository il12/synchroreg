import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const signup = Router({mergeParams: true})
    .post('/auth/signup', (req, res, next) => {
            try {
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
            } catch (e) {
                if (e instanceof HandledError) {
                    res.status(500).json({message: e.message})
                } else {
                    res.status(500).json({message: 'Неожиданная ошибка сервера. Обратитесь к разработчику'})
                    throw e;
                }
            }
        }
    );

export default signup;
