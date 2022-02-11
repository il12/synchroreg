import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import saveApplication from "#root/services/db/saveApplication";
import multer from 'multer';
import HandledError from "#root/classes/Errors/HandledError";

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const saveApplicationEndpoint = Router({mergeParams: true})
    .post('/application/save', upload.single('file'), async (req, res, next) => {
            try {
                req.body.author = req.user.id;
                let competition = await saveApplication(req.body, req.file);
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

export default saveApplicationEndpoint;

