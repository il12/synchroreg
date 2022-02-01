import express from 'express';
import passport from 'passport';
import {passportConfig} from "#root/authentification-config"
import getUserCompetitionsList from "#root/services/db/getUserCompetitionList";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/list/user', async (req, res, next) => {
            let competitionList = await getUserCompetitionsList(req.user.id);
            res.status(200).json({data: competitionList})
        }
    );

export default Endpoint;

