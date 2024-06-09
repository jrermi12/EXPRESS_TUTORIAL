import { object, string, number, Schema } from "zod";

export const createProfileSchema = object({
    body: object({
        firstName: string().optional(),
        lastName: string().optional(),
        age: number().min(0, { message: "Age cannot be negative" }).optional(),
        addresses: string().optional(),
        email: string({ required_error: "Email is required" }).email("Invalid email format"),
        phoneNumber: string().regex(/\d{3}-\d{3}-\d{4}/, { message: "Invalid phone number format" }).optional(),
        userId: string({ required_error: "User ID is required" }),
    }),
});