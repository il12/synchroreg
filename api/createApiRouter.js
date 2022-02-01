import glob from "glob";
import express from 'express'
import {resolve} from 'path';

const {Router} = express

const createRouter = async ()=>{
    let files = glob.sync('**/*.js', {cwd: `${resolve()}/api/v1`})
    console.log(files)
    let routers = await Promise.all(files.map(async filename => await import(`./v1/${filename}`)));
    let filteredRouters = routers.filter(router => router.default);
    return filteredRouters.reduce((rootRouter, router) => rootRouter.use(router.default), Router({mergeParams: true}));
}

export default createRouter;
