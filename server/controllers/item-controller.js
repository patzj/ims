import Item from '../models/item';
import { error as e, httpStatus as status } from '../utils/response-utils';

export const getOne = app => (req, res) => {
    const query = Item.findOne({slug: req.params.slug});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            res.json({
                name: doc.name,
                category: doc.category,
                quantity: doc.quantity,
                price: doc.price,
                slug: doc.slug,
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
    const query = Item.find();
    const promise = query.exec();

    promise.then(doc => {
        const data = [];
        doc.forEach(item => {
            data.push({
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
                slug: item.slug,
                created: item.created,
                modified: item.modified
            });
        });

        res.json({
            items: data
        });
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export const post = app => (req, res) => {
    const data = req.body;
    const item = new Item(data);

    try {
        item.generateSlug();
    } catch(err) {
        e.invalidInput(res, err);
        return;
    }

    item.save().then(() => {
        res.status(status.CREATED).json({
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            slug: item.slug,
            created: item.created,
            modified: item.modified
        });
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`)
        e.serverErr(res);
    });
};

export const patch = app => (req, res) => {
    const query = Item.findOne({slug: req.params.slug});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            const data = req.body;

            for(let key in data) {
                doc[key] = data[key]
            }

            doc.generateSlug();
            doc.modified = Date.now();
            doc.save().then(() => {
                res.json({
                    name: doc.name,
                    category: doc.category,
                    quantity: doc.quantity,
                    price: doc.price,
                    slug: doc.slug,
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
    const query = Item.remove({slug: req.params.slug});
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

export const itemIn = app => (req, res) => {
    const query = Item.findOne({slug: req.params.slug});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            doc.itemIn(req.body.quantity);
            doc.save().then(() => {
                res.json({
                    name: doc.name,
                    category: doc.category,
                    quantity: doc.quantity,
                    price: doc.price,
                    slug: doc.slug,
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
            app.get('logger').error(`${req.url} - ${err.toString()}`)
            e.serverErr(res);
        }
    });
};

export const itemOut = app => (req, res) => {
    const query = Item.findOne({slug: req.params.slug});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            doc.itemOut(req.body.quantity);
            doc.save().then(() => {
                res.json({
                    name: doc.name,
                    category: doc.category,
                    quantity: doc.quantity,
                    price: doc.price,
                    slug: doc.slug,
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
            app.get('logger').error(`${req.url} - ${err.toString()}`)
            e.serverErr(res);
        }
    });
};
