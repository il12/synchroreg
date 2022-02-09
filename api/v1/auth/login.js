import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'

const Router = express.Router;
passportConfig(passport);

const login = Router({mergeParams: true})
    .post('/auth/login', (req, res, next) => {
            console.log('login')
            passport.authenticate(
                'login',
                {session: true},
                (err, user, info) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res.status(401).json({'message': 'Имя пользователя или пароль указаны неверно'});
                    }
                    req.logIn(user, function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            res.cookie('userid', user.login, {maxAge: 2592000000});
                            return res.status(200).json({
                                'message': 'Success'
                            })
                        }
                    });

                }
            )(req, res, next)
        }
    );

export default login;

