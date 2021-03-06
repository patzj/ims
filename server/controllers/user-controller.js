import User from '../models/user';
import { error as e, httpStatus as status } from '../utils/response-util';

export const getOne = app => (req, res) => {
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
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export const getAll = app => (req, res) => {
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
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export const post = app => (req, res) => {
    const data = req.body;
    const query = User.findOne({username: data.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            e.alreadyExists(res)(doc.username);
        } else {

            // Required fields
            if(!data.hasOwnProperty('username') ||
                !data.hasOwnProperty('password')) {
                e.invalidInput(res, 'Invalid input');
                return;
            }

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
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export const patch = app => (req, res) => {
    const query = User.findOne({username: req.params.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            const data = req.body;

            if(data.username) {
                const query2 = User.findOne({username: data.username});
                const promise2 = query.exec();

                promise2.then(user => {
                    if(user &&
                        user.username.toLowerCase() !==
                        doc.username.toLowerCase()) {
                        e.alreadyExists(res)(data.username);
                    }
                }).catch(err => {
                    app.get('logger')
                        .error(`${req.url} - ${err.toString()}`);
                    e.serverErr(res);
                });
            }

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
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export const remove = app => (req, res) => {
    const query = User.remove({username: req.params.username});
    const promise = query.exec();

    promise.then(doc => {
        if(doc.result.n > 0) {
            res.status(status.NOT_CONTENT).json();
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};
