import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import saveApplication from "../../services/db/saveApplication.js";
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Router = express.Router;
passportConfig(passport);

const saveApplicationEndpoint = Router({mergeParams: true})
    .post('/saveApplication', upload.single('file'), async (req, res, next) => {
            req.body.author = req.user.id;
            let competition = await saveApplication(req.body,req.file);
            res.status(200).end();
        }
    );

export default saveApplicationEndpoint;

