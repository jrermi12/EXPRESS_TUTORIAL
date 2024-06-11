import { object, string, TypeOf, date } from "zod";
export const registerUserSchema = object({
    body: object({
        name: string({ required_error: "Should have name" }).min(1, { message: 'name should have at least 1 character' }).max(20, { message: 'First name should have at most 20 characters' }),
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }),
        password: string({ required_error: "Should have password" }).min(6, { message: 'Password should have at least 6 characters' }),
        confirmPassword: string({ required_error: "Should have confirm password" }).min(6, { message: 'confirmPassword should have at least 6 characters' }),
        phoneNumber: string({ required_error: "Should have phone number" }).min(1, { message: 'Phone number should have at least 1 character' }),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    }),
});

export const activateUserSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }).optional(),
        OTPCode: string({ required_error: "Should have verification code" }),
        phoneNumber:string({ required_error: "Should have password" }).optional()
   
    })
});
export const loginUserSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }).optional(),
        password: string({ required_error: "Should have password" }),
        phoneNumber:string({ required_error: "Should have phoneNumber" }).optional()
    })
});
export const ForgotPasswordSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }).optional(),
        phoneNumber:string({ required_error: "Should have password" }).optional()

    })
});
export const ResetPasswordSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }).optional(),
        passwordResetCode: string({ required_error: "Should have password reset code" }),
        password: string({ required_error: "Should have password" }),
        phoneNumber:string({ required_error: "Should have password" }).optional()
    })
});
export const changePasswordSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }),
        password: string({ required_error: "Should have password" }),

    })
});
export const changeOldPasswordSchema = object({
    body: object({

        newPassword: string({ required_error: "Should have new password" }),
        oldPassword: string({ required_error: "Should have old password" }),


    })
});
export const updateProfileSchema = object({
    body: object({
        firstName: string().min(1, { message: 'First name should have at least 1 character' }).max(20, { message: 'First name should have at most 20 characters' }).optional(),
        lastName: string().min(1, { message: 'Last name should have at least 1 character' }).max(20, { message: 'Last name should have at most 20 characters' }).optional(),
        phoneNumber: string().min(1, { message: 'Phone number should have at least 1 character' }).optional(),
    })
})
export const updateCustomerProfileSchema = object({
    body: object({
        firstName: string().min(1, { message: 'First name should have at least 1 character' }).max(20, { message: 'First name should have at most 20 characters' }).optional(),
        lastName: string().min(1, { message: 'Last name should have at least 1 character' }).max(20, { message: 'Last name should have at most 20 characters' }).optional(),
        phoneNumber: string().min(1, { message: 'Phone number should have at least 1 character' }).optional(),
        birthDate: date().optional(),
        city: string().optional()
    })
})

export type registerUserInput = TypeOf<typeof registerUserSchema>["body"];
export type activateUserInput = TypeOf<typeof activateUserSchema>["body"];
export type loginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type forgotPasswordInput = TypeOf<typeof ForgotPasswordSchema>["body"];
export type resetPasswordInput = TypeOf<typeof ResetPasswordSchema>["body"];
export type changePasswordInput = TypeOf<typeof changePasswordSchema>["body"];
export type changeOldPasswordInput = TypeOf<typeof changeOldPasswordSchema>["body"];
export type updateProfileInput = TypeOf<typeof updateProfileSchema>["body"];
export type updateCustomerProfileInput = TypeOf<typeof updateCustomerProfileSchema>["body"];






