import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import parseXlApp from "#root/services/xl/parseXlApp";
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const parseApplicationEndpoint = Router({mergeParams: true})
    .post('/application/parse', upload.single('application'), async (req, res, next) => {
            console.log(req.file);
            let competition = await parseXlApp(req.file.buffer);
            console.log(competition)
            res.status(200).json(competition);
        }
    );

export default parseApplicationEndpoint;

