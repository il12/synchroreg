import passportLocal from 'passport-local'
import registerUser from "./services/db/authentication/registerUser.js";
import getUser from "./services/db/authentication/getUser.js";
import crypto from "crypto";
const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        let result = await getUser(user);
        return done(null, result);
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        async function (req, login, password, done) { // callback with email and password from our form
            console.log(login,password);
            console.log(req.body)
            const hash = crypto.createHash('sha256')
            hash.update(password);
            hash.update('itismymostreliablesalt');
            let queryResult = await getUser({
                login: login,
                password: hash.copy().digest('hex')
            });
            console.log(queryResult);
            if (queryResult) {
                let result = {
                    login: queryResult['login'],
                    password: queryResult['password'],
                    access: queryResult['access']
                }
                return done(null, result);
            } else {
                return done(null, false);
            }

        })
    );
    passport.use('signup', new LocalStrategy({
                usernameField: 'login',
                passwordField: 'password',
                passReqToCallback: true
            },
            async function (req, login, password, done) {
                const hash = crypto.createHash('sha256')
                hash.update(password);
                hash.update('itismymostreliablesalt');
                let queryResult = await registerUser({
                    login: login,
                    password: hash.copy().digest('hex'),
                    email: req.body.email,
                    name: req.body.name
                });
                if (queryResult) {
                    return done(null);
                } else {
                    return done(null, false);
                }

            })
    );
};

export { passportConfig };
