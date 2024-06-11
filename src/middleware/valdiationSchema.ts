import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateSchema =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const message = e.errors.map((err: any) => err.message)
                return res.status(400).json({ message: message.join(','), sucess: false });
            }
        };

export default validateSchema;