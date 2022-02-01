import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import deleteApplicationById from "#root/services/db/deleteApplication";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .delete('/application/:id', async (req, res, next) => {
            await deleteApplicationById(req.params.id);
            res.status(200).end()
        }
    );

export default Endpoint;

