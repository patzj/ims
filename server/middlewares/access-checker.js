import jwt from 'jsonwebtoken';
import config from '../config';
import { error as e } from '../utils/response-utils';

const logAccess = (app, req, decoded) => {
    app.get('logger')
        .info(`${req.url} - ${req.method} - ${decoded._doc.username}`);
};

const logUnauthorized = (app, req) => {
    app.get('logger').warn(`${req.url} - ${req.method} - unauthorized`);
};

export const accessChecker = app => (req, res, next) => {
    if(req.url.indexOf('api') > -1 && req.url !== '/api/log-in') {
        if(req.headers['x-access-token']) {
            jwt.verify(
                req.headers['x-access-token'],
                config().JWT.SECRET,
                (err, decoded) => {
                    if(err) {
                        app.get('winston')
                            .error(`${req.url} - ${err.toString()}`);
                        e.serverErr(res);
                    } else if(decoded) {
                        // only system admin have full access User APIs
                        if((req.url.indexOf('users') > -1 ||
                            req.url.indexOf('register') > -1) &&
                            req.method !== 'PATCH' &&
                            decoded._doc.role !== 'SYSTEM ADMIN') {
                            logUnauthorized(app, req);
                            e.forbidden(res);
                        } else {
                            logAccess(app, req, decoded);
                            next();
                        }
                    } else {
                        logUnauthorized(app, req);
                        e.forbidden(res);
                    }
                }
            );
        } else {
            logUnauthorized(app, req);
            e.forbidden(res);
        }
    } else {
        app.get('logger').info(`${req.url} - ${req.method}`);
        next(); // log in api
    }
};

export default accessChecker;
