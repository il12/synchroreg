import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getApplicationsByCompetitionId from "#root/services/db/getApplicationsByCompetitionId";
import getTeamSetup from "#root/services/xl/getTeamSetup"

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/:id/finalize', async (req, res, next) => {
            const applications = await getApplicationsByCompetitionId(req.params.id);
            const file = await getTeamSetup(applications)
            res.status(200).send(file)
        }
    );

export default Endpoint;

