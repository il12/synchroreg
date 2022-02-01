import express from 'express';
import passport from 'passport';
import {passportConfig} from "#root/authentification-config"
import getUserApplicationList from "#root/services/db/getUserApplicationList";
const Router = express.Router;
passportConfig(passport);

const Endpoint = Router({mergeParams: true})
    .get('/application/list/user', async (req, res, next) => {
            let applicationList = await getUserApplicationList(req.user.id);
            res.status(200).json({data: applicationList})
        }
    );

export default Endpoint;

