import jwt from "jsonwebtoken";


export function signJwt(
    object: object,
    signKey: string,
    options?: jwt.SignOptions | undefined
) {
    return jwt.sign(object, signKey, {
        ...(options && options),
    });
}
