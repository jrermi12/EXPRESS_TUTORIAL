import { Request, Response } from "express";
import { loginUserInput } from "../../validation/auth.validation";
import BadRequestError from "../../errors/badRequest.errors";
import ForbiddenError from "../../errors/forbidden.errors";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { signJwt } from "../../utils/jwt";
import { findUser } from "../../services/user.services";
import TokenModel from "../../model/token.model";
import { ErrorCode } from "../../errors/custom.errors";
import { validateEnv } from "../../config/env.config";

//@desc  Login customer
//@method POST  /customer-auth/login
//@access public
export const login = asyncHandler(async (req: Request<object, object, loginUserInput>, res: Response) => {
    
    const { password, email } = req.body;

    // Find user by email
    const user = await findUser({ email }, { select: "+password", lean: true });
    if (!user) throw new ForbiddenError('User does not exist', ErrorCode.FORBIDDEN);
    if (!user.isActive) throw new BadRequestError('Please verify your email first', ErrorCode.BAD_REQUEST);
    

    // Determine user's role (you may have different logic here)
    const role = user.role; // Assuming role is stored in the user object
    


    // Define a function to get the secret key based on the role
    const secretKey = validateEnv()?.jwtconfig.accessSecret
    

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ForbiddenError("Invalid credentials", ErrorCode.FORBIDDEN);

    // Generate and store access token
    const accessToken = signJwt({ userId: user._id }, secretKey as string, { expiresIn: "3d" });
    await TokenModel.create({ token: accessToken, userId: user._id, expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });

    // Remove sensitive data from user object
    delete user.password;

    // Send response with user data and access token
    res.status(200).json({
        success: true,
        user: user,
        message: "Logged in successfully",
        accessToken
    });
});
