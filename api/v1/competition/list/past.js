import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getCompetitionsList from "#root/services/db/getCompetitionsList";
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/list/past', async (req, res, next) => {
            try {
                let competitionList = await getCompetitionsList();
                let pastCompetitionList = competitionList.filter((item) => Date.parse(item.deadline) < Date.now())
                res.status(200).json({data: pastCompetitionList})
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

