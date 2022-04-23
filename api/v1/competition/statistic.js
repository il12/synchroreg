import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getApplicationsByCompetitionId from "#root/services/db/getApplicationsByCompetitionId";
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/:id/statistic', async (req, res, next) => {
            try {
                const applications = await getApplicationsByCompetitionId(req.params.id);
                const data = applications.map((application)=>{
                    return JSON.parse(application.json);
                })
                res.status(200).json(data)
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

