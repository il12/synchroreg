import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getApplicationFile from "#root/services/xl/getApplicationFile";
const Router = express.Router;
passportConfig(passport);

const getApplicationFileEndpoint = Router({mergeParams: true})
    .get('/application/template/get/:id', async (req, res, next) => {
            let file = await getApplicationFile(req.params.id);
            console.log('file', file);
            res.status(200).send(file)
        }
    );

export default getApplicationFileEndpoint;

