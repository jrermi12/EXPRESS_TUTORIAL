import cors from 'cors'
const allowedOrigins: string[] =
    [
        "http://localhost:3000/",
        "http://localhost:3001/",
        "http://localhost:3002/",
        "http://localhost:3003/",

    ];

export const corsOptions: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 200,
};
