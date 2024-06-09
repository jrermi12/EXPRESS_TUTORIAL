import { object, string, array, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }).email("Invalid email format"),
        password: string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
        name: string({ required_error: "Name is required" }),
        phoneNumber: string().regex(/\d{3}-\d{3}-\d{4}/, "Invalid phone number format").optional(),
        role: string({ required_error: "Role is required" }),
        branchIds: array(string()).optional(),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
