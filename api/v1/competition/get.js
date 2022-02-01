import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getCompetitionById from "#root/services/db/getCompetitionById";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/:id', async (req, res, next) => {
            let competition = await getCompetitionById(req.params.id);
            res.status(200).json({data: competition})
        }
    );

export default Endpoint;

