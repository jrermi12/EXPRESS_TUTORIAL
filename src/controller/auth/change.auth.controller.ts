import asyncHandler from "express-async-handler";
import { changeOldPasswordInput } from "../../validation/auth.validation";
import { Response } from "express";
import bcrypt from 'bcryptjs'
import { IUserMessage } from "../../middleware/authJWT.middleware";
import NotFoundError from "../../errors/notFound.errors";
import BadRequestError from "../../errors/badRequest.errors";
import { findUser } from "../../services/user.services";
import { ErrorCode } from "../../errors/custom.errors";

//@desc Change password of logged-in customer
//@method PATCH /cutomer-auth/changePassword
//@access protected
export const changePassword = asyncHandler(async (req: IUserMessage<object, object, changeOldPasswordInput>, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req?.userData.userId;

    // Find user by ID
    const user = await findUser({ _id: userId }, { select: "+password" });
    if (!user) {
        throw new NotFoundError("User not found",  ErrorCode.NOT_FOUND);
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new BadRequestError("Incorrect password",  ErrorCode.BAD_REQUEST);
    }

    // Generate a new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;

    // Save the updated password
    await user.save();

    res.status(200).json({ message: "Password changed successfully", success: true });
});
