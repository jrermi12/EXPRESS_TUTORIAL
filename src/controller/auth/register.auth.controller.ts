import { Request, Response } from "express";
import BadRequestError from "../../errors/badRequest.errors";
import bcrypt from 'bcryptjs';
import { generateRandom6DigitString } from "../../utils/util";
import asyncHandler from 'express-async-handler';
import { createUser, findUserByEmail } from "../../services/user.services";
import { ErrorCode } from "../../errors/custom.errors";
import { getAllRole } from "../../services/role.services";
import { registerUserInput} from "../../validation/auth.validation"
import { sendMail } from "../../utils/sendMail";
//@desc signup
//@method POST  /auth/signup
//@access public
export const registerUser = asyncHandler(async (req: Request<object, object, registerUserInput>, res: Response) => {
    const { email, password, name, phoneNumber } = req.body;
  
    // Check if user already exists
  
    const userExists = await findUserByEmail(email);
  
    if (userExists) {
      throw new BadRequestError('User with this email already exists', ErrorCode.BAD_REQUEST);
    }
  
    const roles = await getAllRole()
    const role = roles.find(r => r.name === "SUPER_ADMIN")
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
  
    // Generate OTP code
    const code = generateRandom6DigitString();
    const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;
  
    // Create the user
    await createUser({
      ...req.body,
      role: role,
      password: hashPassword,
      OTPCode: code,
      OTPCodeExpires: Date.now() + verificationExpires,
    });
  
    await sendMail({
      email: email,
      subject: "Email verification",
      template: "emailVerification.mails.ejs",
      data: {
        user: req.body.name,
        code,
      },
    });
    res.status(201).json({ success: true, message: 'Verification email sent' })
  })