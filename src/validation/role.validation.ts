import { object, string, boolean, array, Schema } from "zod";

export const createRoleSchema = object({
    body: object({
        name: string({ required_error: "Name is required" }),
        permissions: array(string({ required_error: "At least one permission is required" })),
        grantAll: boolean().optional(),
    }),
});