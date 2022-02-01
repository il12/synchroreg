import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getCompetitionsList from "#root/services/db/getCompetitionsList";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/list/active', async (req, res, next) => {
            let competitionList = await getCompetitionsList();
            let activeCompetitionList = competitionList.filter((item)=>Date.parse(item.deadline)>Date.now())
            res.status(200).json({data: activeCompetitionList})
        }
    );

export default Endpoint;

