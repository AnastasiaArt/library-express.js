import fs from 'fs';
import os from 'os';

function logError (error: string) {
    fs.appendFile("error-server.log", error + os.EOL, (err) => {if (err) throw err;});
}

export function logErrorMiddleware (err: any, req: any, res: any, next: any) {
    logError(err.stack)
    next(err)
}

export function returnError (err: any, req: any, res: any, next: any) {
    res.status(err.statusCode || 500).send(err.message)
}