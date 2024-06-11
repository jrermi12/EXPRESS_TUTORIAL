import { Request, Response } from "express";
import { activateUserInput } from "../../validation/auth.validation";
import BadRequestError from "../../errors/badRequest.errors";
import asyncHandler from 'express-async-handler';
import { findUser } from "../../services/user.services";
import { createProfile } from "../../services/profile.services";
import { ErrorCode } from "../../errors/custom.errors";

//@desc  Activate email for customer
//@method POST  /customer-auth/activate
//@access public
export const activateUser = asyncHandler(async (req: Request<object, object, activateUserInput>, res: Response) => {
    const { OTPCode, email } = req.body;

    // Find user by email
    const user = await findUser({ email }, { select: "+password +OTPCode +OTPCodeExpires" });
    if (!user) throw new BadRequestError('User does not exist', ErrorCode.BAD_REQUEST);
    if (user.isActive) throw new BadRequestError('User has already been verified',  ErrorCode.BAD_REQUEST);

    // Validate OTP code
    if (user.OTPCode !== OTPCode || user.OTPCodeExpires < Date.now()) {
        throw new BadRequestError('Invalid or expired OTP code',  ErrorCode.BAD_REQUEST);
    }

    // Update user as active and clear OTP code
    user.OTPCode = "";
    user.OTPCodeExpires = 0;
    user.isActive = true;
    const userId = user._id
    // Create profile for the user
    await createProfile(userId);

    // Save updated user
    await user.save();

    res.status(201).json({ message: 'Verified successfully', success: true });
});
