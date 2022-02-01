import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import getApplicationFile from "../../services/xl/getApplicationFile.js";
const Router = express.Router;
passportConfig(passport);

const getApplicationFileEndpoint = Router({mergeParams: true})
    .get('/getApplicationFile/:id', async (req, res, next) => {
            let file = await getApplicationFile(req.params.id);
            console.log('file', file);
            res.status(200).send(file)
        }
    );

export default getApplicationFileEndpoint;

