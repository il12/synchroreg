import express from 'express';
import passport from 'passport';
import multer from 'multer';
import {passportConfig} from '#root/authentification-config'
import Competition from "#root/classes/Competition";
import saveCompetition from "#root/services/db/saveCompetition";
import HandledError from "#root/classes/Errors/HandledError";

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .post('/competition/create', upload.single('file'), async (req, res, next) => {
            req.body.author = req.user.id;
            try {
                await saveCompetition(new Competition(req.body.name, req.body.dates, req.body.place, req.body.info, req.body.deadline, req.body.author, req.file));
                res.status(200).end();
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

export default Endpoint;

