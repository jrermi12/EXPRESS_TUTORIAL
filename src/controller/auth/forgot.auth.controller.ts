import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import BadRequestError from "../../errors/badRequest.errors";
import { generateRandom6DigitString } from "../../utils/util";
import { forgotPasswordInput } from "../../validation/auth.validation";
import asyncHandler from "express-async-handler";
import { findUserByEmail } from "../../services/user.services";
import { EventEmitterInstance } from "../../config/event-emitter";
import { ErrorCode } from "../../errors/custom.errors";

//@desc forgot password for customer
//@method POST /customer-auth/forgetPassword
//@access public
export const forgotPassword = asyncHandler(async (req: Request<object, object, forgotPasswordInput>, res: Response) => {
    const { email } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
        throw new NotFoundError("User not found",  ErrorCode.NOT_FOUND);
    }

    // Check if the user is active
    if (!user.isActive) {
        throw new BadRequestError("Please verify your email first", ErrorCode.BAD_REQUEST);
    }

    // Generate password reset code
    const code = generateRandom6DigitString();
    const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60;

    // Update user's password reset code and expiration
    user.passwordResetCode = code;
    user.OTPCodeExpires = Date.now() + verificationExpires;
    await user.save();

    // Emit event for sending password reset email or SMS
    const link = `https://localhost:3000/auth/reset?passwordResetCode=${code}&email=${email}`;
    EventEmitterInstance.emit('forgot', { code, name: user.name, email: user.email, link });

    res.status(201).json({ message: "If a user with that email is registered, you will receive a password reset email or OTP code via SMS", email, success: true });
});
