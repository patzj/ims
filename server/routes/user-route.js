import jwt from 'jsonwebtoken';
import config from '../config';
import { error as e } from '../utils/response-utils';
import { getOne, getAll, post, patch, remove }
    from '../controllers/user-controller';

const userPatchMW = (req, res, next) => {
    jwt.verify(
        req.headers['x-access-token'],
        config().JWT.SECRET,
        (err, decoded) => {
            if(req.method === 'PATCH' &&
                (req.params.username === decoded._doc.username ||
                decoded._doc.role === 'SYSTEM ADMIN')
            ) {
                next();
            } else {
                e.forbidden(res);
            }
        }
    );
};

export const userRoute = app => {
    app.get('/api/users', getAll(app));
    app.get('/api/users/:username', getOne(app));
    app.post('/api/users', post(app));
    app.patch('/api/users/:username', userPatchMW, patch(app));
    app.delete('/api/users/:username', remove(app));
};

export default userRoute;
