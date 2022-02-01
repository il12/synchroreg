import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import createCompetition from "../../services/db/createCompetition.js";
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const createCompetitionEndpoint = Router({mergeParams: true})
    .post('/createCompetition', upload.single('file'), async (req, res, next) => {
            req.body.author = req.user.id;
            let competition = await createCompetition(req.body,req.file);
            res.status(200).end();
        }
    );

export default createCompetitionEndpoint;

