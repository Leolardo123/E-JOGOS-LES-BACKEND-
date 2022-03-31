import { Router } from "express";

const brandRouter = Router();

brandRouter.get('/', function() {
    console.log('teste')
})

export default brandRouter