import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import getApplicationFile from "#root/services/xl/getApplicationFile";
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const getApplicationFileEndpoint = Router({mergeParams: true})
    .get('/application/template/get/:id', async (req, res, next) => {
            try {
                let file = await getApplicationFile(req.params.id);
                res.status(200).send(file)
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

export default getApplicationFileEndpoint;

