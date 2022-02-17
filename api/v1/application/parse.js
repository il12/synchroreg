import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import parseXlApp from "#root/services/xl/parseXlApp";
import multer from 'multer';
import HandledError from "#root/classes/Errors/HandledError";

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const parseApplicationEndpoint = Router({mergeParams: true})
    .post('/application/parse', upload.single('file'), async (req, res, next) => {
            try {
                let application = parseXlApp(req.file.buffer);
                res.status(200).json(application);
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

export default parseApplicationEndpoint;

