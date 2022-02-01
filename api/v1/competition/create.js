import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import createCompetition from "#root/services/db/createCompetition";
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .post('/competition/create', upload.single('file'), async (req, res, next) => {
            req.body.author = req.user.id;
            let competition = await createCompetition(req.body,req.file);
            res.status(200).end();
        }
    );

export default Endpoint;

