import Item from '../models/item';
import { error as e, httpStatus as status } from '../utils/response-utils';

export const getOne = (req, res) => {
    const query = Item.findOne({slug: req.params.slug});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            res.json({
                name: doc.name,
                category: doc.category,
                count: doc.count,
                price: doc.price,
                slug: doc.slug,
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
    const query = Item.find();
    const promise = query.exec();

    promise.then(doc => {
        const data = [];
        doc.forEach(item => {
            data.push({
                name: item.name,
                category: item.category,
                count: item.count,
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
        // TODO log error
        console.log(err);
        e.serverErr(res);
    });
};

export const post = (req, res) => {
    const data = req.body;
    const item = new Item(data);
    item.generateSlug();
    item.save(err => {
        if(err) {
            // TODO log error
            e.serverErr(res);
        } else {
            res.status(status.CREATED).json({
                name: item.name,
                category: item.category,
                count: item.count,
                price: item.price,
                slug: item.slug,
                created: item.created,
                modified: item.modified
            });
        }
    });
};
