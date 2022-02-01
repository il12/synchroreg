import express from 'express';
import passport from 'passport';
import {passportConfig} from '../../authentification-config.js'
import getFileCompetitionById from "../../services/db/getFileCompetitionById.js";
const Router = express.Router;
passportConfig(passport);

const getFileCompetitionByIdEndpoint = Router({mergeParams: true})
    .get('/getFileCompetitionById/:id', async (req, res, next) => {
            let file = await getFileCompetitionById(req.params.id);
            res.status(200).send(file)
        }
    );

export default getFileCompetitionByIdEndpoint;

