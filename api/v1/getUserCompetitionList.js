import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import getUserCompetitionsList from "../../services/db/getUserCompetitionList.js";
const Router = express.Router;
passportConfig(passport);

const getUserCompetitionListEndpoint = Router({mergeParams: true})
    .get('/getUserCompetitionList', async (req, res, next) => {
            let competitionList = await getUserCompetitionsList(req.user.id);
            res.status(200).json({data: competitionList})
        }
    );

export default getUserCompetitionListEndpoint;

