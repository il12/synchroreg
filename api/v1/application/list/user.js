import express from 'express';
import passport from 'passport';
import {passportConfig} from "#root/authentification-config"
import getUserApplicationList from "#root/services/db/getUserApplicationList";
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/application/list/user', async (req, res, next) => {
            try {
                let applicationList = await getUserApplicationList(req.user.id);
                res.status(200).json({data: applicationList})
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

