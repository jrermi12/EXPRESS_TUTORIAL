import { Request, Response } from "express";
import TokenModel from "../../model/token.model";

//@desc logout
//@method GET /customer-auth/logout
//@access public
export const logout = async (req: Request, res: Response) => {
    const Jwt = req.cookies?.Jwt;
    if (!Jwt) return res.status(204).json({ message: "No JWT cookie found", success: true });
    
    // Clear the JWT cookie
    res.cookie("Jwt", "");

    // Clear the token from the token model
    await TokenModel.deleteOne({ token: Jwt });

    return res.json({ message: "Logged out successfully", success: true });
};
