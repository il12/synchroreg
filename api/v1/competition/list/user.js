import express from 'express';
import passport from 'passport';
import {passportConfig} from "#root/authentification-config"
import getUserCompetitionsList from "#root/services/db/getUserCompetitionList";
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/list/user', async (req, res, next) => {
            try {
                let competitionList = await getUserCompetitionsList(req.user.id);
                res.status(200).json({data: competitionList})
            } catch (e) {
                if (e instanceof HandledError) {
                    res.status(500).json({message: e.message})
                } else {
                    res.status(500).json({message: 'Неожиданная ошибка сервера. Обратитесь к разработчику'})
                    throw e;
                }
            }
        }
    );

export default Endpoint;

