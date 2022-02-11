import express from 'express';
import passport from 'passport';
import {passportConfig} from '#root/authentification-config'
import deleteApplicationById from "#root/services/db/deleteApplication";
import HandledError from "#root/classes/Errors/HandledError";

const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .delete('/application/:id', async (req, res, next) => {
            try {
                await deleteApplicationById(req.params.id);
                res.status(200).end()
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

