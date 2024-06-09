import { Request } from "express";

export const extractTokenfromHeader = (req: Request) => {
  const authHeader = req.headers.authorization || req.headers.Authorization as string;
  if (!authHeader?.startsWith("Bearer ")) {
      return false
  }
  return authHeader.split(" ")[1];
}



