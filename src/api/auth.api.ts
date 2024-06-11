import express from "express";
import validateSchema from "../middleware/valdiationSchema";
import {
    registerUserSchema,
    activateUserSchema, 
    ForgotPasswordSchema, 
    ResetPasswordSchema, 
    loginUserSchema,
    changeOldPasswordSchema
    
} from "../validation/auth.validation";
import {
    registerUser,
    activateUser, 
    forgotPassword, 
    resetPasswordHandler, 
    login,
    changePassword

    
} from '../controller/auth/index.auth.controller'
import { AuthJWT } from "../middleware/authJWT.middleware";

const router = express.Router();

router.post("/register", validateSchema(registerUserSchema), registerUser)
router.post("/activate", validateSchema(activateUserSchema), activateUser)
router.post("/forgotPassword", validateSchema(ForgotPasswordSchema), forgotPassword)
router.post("/resetPassword", validateSchema(ResetPasswordSchema), resetPasswordHandler)
router.post("/login",  validateSchema(loginUserSchema), login);
router.post("/changePassword", AuthJWT, validateSchema(changeOldPasswordSchema), changePassword);

export default router;

