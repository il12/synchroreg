import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import getCompetitionById from "../../services/db/getCompetitionById.js";
const Router = express.Router;
passportConfig(passport);

const getCompetitionByIdEndpoint = Router({mergeParams: true})
    .get('/getCompetitionById/:id', async (req, res, next) => {
            let competition = await getCompetitionById(req.params.id);
            console.log(competition)
            res.status(200).json({data: competition})
        }
    );

export default getCompetitionByIdEndpoint;

