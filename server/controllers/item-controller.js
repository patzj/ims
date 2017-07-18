import Item from '../models/item';
import { error as e, httpStatus as status } from '../utils/response-util';

export const getOne = app => (req, res) => {
    const query = Item.findOne({code: req.params.code});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            res.json({
                code: doc.code,
                name: doc.name,
                category: doc.category,
                quantity: doc.quantity,
                price: doc.price,
                created: doc.created,
                modified: doc.modified
            });
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};

export const getAll = app => (req, res) => {
    let query = null;
    if (req.query.s && req.query.c) {
        query = Item.find().and([
            {name: new RegExp(res.query.s, 'i')},
            {category: new RegExp(res.query.c, 'i')}
        ]);
    } else if(req.query.s) {
        query = Item.find({name: new RegExp(req.query.s, 'i')});
    } else if(req.query.c) {
        query = Item.find({category: new RegExp(req.query.c, 'i')});
    } else {
        query = Item.find();
    }

    const promise = query.exec();

    promise.then(doc => {
        const data = [];
        doc.forEach(item => {
            data.push({
                code: item.code,
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
                created: item.created,
                modified: item.modified
            });
        });

        res.json({
            items: data
        });
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};

export const post = app => (req, res) => {
    const data = req.body;
    delete data.code;
    const query = Item.findOne({name: data.name});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            e.alreadyExists(res)(doc.name);
        } else {
            const item = new Item(data);

            item.isNew = true;
            item.save().then(() => {
                res.status(status.CREATED).json({
                    code: item.code,
                    name: item.name,
                    category: item.category,
                    quantity: item.quantity,
                    price: item.price,
                    created: item.created,
                    modified: item.modified
                });
            }).catch(err => {
                app.get('logger').error(`${req.url} - ${err.toString()}`);
                e.serverErr(res);
            });
        }
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};

export const patch = app => (req, res) => {
    const query = Item.findOne({code: req.params.code});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            const data = req.body;
            delete  data.code;

            if(data.name) {
                const query2 = Item.findOne({name: data.name});
                const promise2 = query.exec();

                promise2.then(item => {
                    if(item &&
                        item.name.toLowerCase() !== doc.name.toLowerCase()) {
                        e.alreadyExists(res)(data.name);
                    }
                }).catch(err => {
                    app.get('logger')
                        .error(`${req.url} - ${err.toString()}`);
                    e.serverErr(res);
                });
            }

            for(let key in data) {
                doc[key] = data[key]
            }

            doc.modified = Date.now();
            doc.save().then(() => {
                res.json({
                    code: doc.code,
                    name: doc.name,
                    category: doc.category,
                    quantity: doc.quantity,
                    price: doc.price,
                    created: doc.created,
                    modified: doc.modified
                });
            });
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};


export const remove = app => (req, res) => {
    const query = Item.remove({code: req.params.code});
    const promise = query.exec();

    promise.then(doc => {
        if(doc.result.n > 0) {
            res.status(status.NOT_CONTENT).json();
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};

export const itemIn = app => (req, res) => {
    const query = Item.findOne({code: req.params.code});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            doc.itemIn(req.body.quantity);
            doc.save().then(() => {
                res.json({
                    code: doc.code,
                    name: doc.name,
                    category: doc.category,
                    quantity: doc.quantity,
                    price: doc.price,
                    created: doc.created,
                    modified: doc.modified
                });
            });
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        if(err === 'Invalid input') {
            e.invalidInput(res, err);
        } else {
            app.get('logger').error(`${req.url} - ${err.toString()}`);
            e.serverErr(res);
        }
    });
};

export const itemOut = app => (req, res) => {
    const query = Item.findOne({code: req.params.code});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            doc.itemOut(req.body.quantity);
            doc.save().then(() => {
                res.json({
                    code: doc.code,
                    name: doc.name,
                    category: doc.category,
                    quantity: doc.quantity,
                    price: doc.price,
                    created: doc.created,
                    modified: doc.modified
                });
            });
        } else {
            e.notFound(res);
        }
    }).catch(err => {
        if(err === 'Invalid input') {
            e.invalidInput(res, err);
        } else {
            app.get('logger').error(`${req.url} - ${err.toString()}`);
            e.serverErr(res);
        }
    });
};
