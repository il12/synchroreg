import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getApplicationById from "#root/services/db/getApplicationById";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/application/:id', async (req, res, next) => {
            let application = await getApplicationById(req.params.id);
            res.status(200).json({data: application})
        }
    );

export default Endpoint;

