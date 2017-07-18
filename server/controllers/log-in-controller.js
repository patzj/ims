import jwt from 'jsonwebtoken';
import config from '../config';
import { error as e } from '../utils/response-util';
import User from '../models/user';

const cfg = config();
const generateToken = user => {
    return jwt.sign(user, cfg.JWT.SECRET,
        {expiresIn: cfg.JWT.EXPIRATION});
};

export const logIn = app => (req, res) => {
    const data = req.body;
    const query = User.findOne({username: data.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc && doc.validatePassword(data.password)) {
            res.json({
                username: doc.username,
                name: doc.name,
                role: doc.role,
                token: generateToken(doc)
            });
        } else {
            e.incorrectCredentials(res);
        }
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export default logIn;
