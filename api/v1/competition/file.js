import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getFileCompetitionById from "#root/services/db/getFileCompetitionById";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/:id/file', async (req, res, next) => {
            let file = await getFileCompetitionById(req.params.id);
            res.status(200).send(file)
        }
    );

export default Endpoint;

