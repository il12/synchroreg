import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getApplicationsByCompetitionId from "#root/services/db/getApplicationsByCompetitionId";
import getJudgesList from "#root/services/xl/getJudgesList"
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/:id/judges', async (req, res, next) => {
            try {
                const applications = await getApplicationsByCompetitionId(req.params.id);
                const file = await getJudgesList(applications)
                res.status(200).send(file)
            } catch (e) {
                if(e instanceof HandledError){
                    res.status(500).json({message: e.message})
                } else {
                    res.status(500).json({message: 'Неожиданная ошибка сервера. Обратитесь к разработчику'})
                    throw e;
                }
            }
        }
    );

export default Endpoint;

