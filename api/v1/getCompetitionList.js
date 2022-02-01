import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import getCompetitionsList from "../../services/db/getCompetitionsList.js";
const Router = express.Router;
passportConfig(passport);

const getCompetitionListEndpoint = Router({mergeParams: true})
    .get('/getCompetitionList', async (req, res, next) => {
        let competitionList = await getCompetitionsList();
            res.status(200).json({data: competitionList})
        }
    );

export default getCompetitionListEndpoint;

