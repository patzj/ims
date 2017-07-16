import User from '../models/user';
import { error as e, httpStatus as status } from '../utils/response-utils';

export const getOne = (req, res) => {
    const query = User.findOne({username: req.params.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            res.json({
                username: doc.username,
                name: doc.name,
                role: doc.role,
                created: doc.created,
                modified: doc.modified
            });
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        // TODO log error
        e.serverErr(res);
    });
};

export const getAll = (req, res) => {
    const query = User.find();
    const promise = query.exec();

    promise.then(doc => {
        const data = [];
        doc.forEach(item => {
            data.push({
                username: item.username,
                name: item.name,
                role: item.role,
                created: item.created,
                modified: item.modified
            });
        });

        res.json({
            users: data
        });
    }).catch(err => {
        // TODO log error
        e.serverErr(res);
    });
};

export const post = (req, res) => {
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
                name: data.name || ''
            });

            if(data.role) {
                user.role = data.role;
            }

            user.save().then(() => {
                res.status(status.CREATED).json({
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    created: user.created,
                    modified: user.modified
                });
            });
        }
    }).catch(err => {
        // TODO log error
        e.serverErr(res);
    });
};

export const patch = (req, res) => {
    const query = User.findOne({username: req.params.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            const data = req.body;

            for(let key in data) {
                if(key !== 'password') {
                    doc[key] = data[key]
                } else {
                    doc[key] = User.generateHash(data[key])
                }
            }

            doc.modified = Date.now();
            doc.save().then(() => {
                res.json({
                    username: doc.username,
                    name: doc.name,
                    role: doc.role,
                    created: doc.created,
                    modified: doc.modified
                });
            });
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        // TODO log error
        e.serverErr(res);
    });
};

export const remove = (req, res) => {
    const query = User.remove({username: req.params.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc.result.n > 0) {
            res.status(status.NOT_CONTENT).json();
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        // TODO log error
        e.serverErr(res);
    });
};
