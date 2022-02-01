import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import deleteCompetitionById from "#root/services/db/deleteCompetition";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .delete('/application/:id', async (req, res, next) => {
            await deleteCompetitionById(req.params.id);
            res.status(200).end()
        }
    );

export default Endpoint;

