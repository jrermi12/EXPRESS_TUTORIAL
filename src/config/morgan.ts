import { createWriteStream } from 'fs';
import morgan from 'morgan';
import path from 'path';
import { validateEnv } from './env.config';

const nodeEnv = validateEnv()?.env
const getIPFormat = () =>
    nodeEnv === 'production' ? ':remote-addr - ' : '';

const accessLogStream = createWriteStream(
    path.join(__dirname, "..",  'logs/access.log'),
    { flags: 'a' }
);

const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const successHandler = morgan(successResponseFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode >= 400,
});

const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date `;
const errorHandler = morgan(errorResponseFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
});

export { errorHandler, successHandler }