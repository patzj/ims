import User from '../models/user';
import { error as e } from '../utils/response-utils';

export const register = (req, res) => {
    const data = req.body;
    const query = User.findOne({username: data.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            e.alreadyExists(res)('Username');
        } else {
            const user = new User({
                username: data.username,
                password: User.generateHash(data.password),
                name: data.name
            });

            user.save(err => {
                if(err) {
                    // TODO log error
                    e.serverErr(res);
                } else {
                    res.json({
                        username: user.username,
                        name: user.name,
                        role: user.role
                    });
                }
            });
        }
    }).catch(err => {
        // TODO log error
        e.serverErr(res);
    });
};

export default register;
