import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getFileCompetitionById from "#root/services/db/getFileCompetitionById";
import HandledError from "#root/classes/Errors/HandledError";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/competition/:id/file', async (req, res, next) => {
            try {
                let file = await getFileCompetitionById(req.params.id);
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

