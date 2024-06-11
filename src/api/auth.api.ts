import express from "express";
import validateSchema from "../middleware/valdiationSchema";
import {
    registerUserSchema,
} from "../validation/auth.validation";
import {
    registerUser,
} from '../controller/auth/index.auth.controller'

const router = express.Router();

router.post("/register", validateSchema(registerUserSchema), registerUser)

export default router;
