import { index } from "@shared/validation/Universal.validation";
import { Router } from "express";

const cardRouter = Router();

cardRouter.get('/',index, function() {
    console.log('teste')
})

export default cardRouter