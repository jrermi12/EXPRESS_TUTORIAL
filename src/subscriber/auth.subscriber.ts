import { sendMail } from "../utils/sendMail";

export const signUpSubscriber = async (data) => {
    await sendMail({
        email: data?.email,
        subject: "Email verification",
        template: "emailVerification.mails.ejs",
        data: {
            user: data.name,
            code: data?.code,
        },
    });
};


export const forgetPasswordSubscriber = async (data) => {
    await sendMail({
        email: data?.email,
        subject: "Password reset code",
        template: "passwordReset.mails.ejs",
        data: {
            user: data.name,
            code: data.code,
            link: data.link,
        },
    });
}
