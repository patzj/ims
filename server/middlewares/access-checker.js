import jwt from 'jsonwebtoken';
import config from '../config';
import { error as e } from '../utils/response-utils';

export const accessChecker = app => (req, res, next) => {
    if(req.url !== '/api/log-in') {
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
                        // only system admin can access User APIs
                        if((req.url.indexOf('users') > -1 ||
                            req.url.indexOf('register') > -1) &&
                            decoded._doc.role !== 'SYSTEM ADMIN') {
                            e.forbidden(res);
                        } else {
                            next();
                        }
                    } else {
                        e.forbidden(res);
                    }
                }
            );
        } else {
            e.forbidden(res);
        }
    } else {
        next(); // log in api
    }
};

export default accessChecker;
