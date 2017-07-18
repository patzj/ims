import Transaction from '../models/transaction';
import { error as e, httpStatus as status } from '../utils/response-util';
import { extractDate } from '../utils/extract-util';

export const getOne = app => (req, res) => {
    const query = Transaction.findOne({transactionId: req.params.id});
    const promise = query.exec();

    promise.then(doc => {
        if(doc) {
            res.json({
                transactionId: doc.transactionId,
                transactionType: doc.transactionType,
                itemCode: doc.itemCode,
                quantity: doc.quantity,
                price: doc.price,
                transactionDate: doc.transactionDate
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
    if(req.query.i && req.query.d) { // itemCode and transactionDate
        date = extractDate(req.query.d);
        query = Transaction.find().and([
            {itemCode: req.query.i},
            {
                transactionDate: {
                    '$gte': new Date(d[0], d[1], d[2]),
                    '$lt': new Date(d[0], d[1], d[2] + 1)
                }
            }
        ]);
    } else if(req.query.i) { // itemCode
        query = Transaction.find({itemCode: req.query.i});
    } else if(req.query.d) { // transactionDate
        date = extractDate(req.query.d);
        query = Transaction.find({
            transactionDate: {
                '$gte': new Date(d[0], d[1], d[2]),
                '$lt': new Date(d[0], d[1], d[2] + 1)
            }
        });
    } else {
        query = Transaction.find();
    }

    const promise = query.exec();
    promise.then(doc => {
        const data = [];
        doc.forEach(tx => {
            data.push({
                transactionId: tx.transactionId,
                transactionType: tx.transactionType,
                itemCode: tx.itemCode,
                quantity: tx.quantity,
                price: tx.price,
                transactionDate: tx.transactionDate
            });
        });

        res.json({
            transactions: data
        });
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};

export const post = app => (req, res) => {
    const data = req.body;
    delete data.transactionId;
    const transaction = new Transaction(data);

    transaction.isNew = true;
    transaction.save().then(() => {
        res.status(status.CREATED).json({
            transactionId: doc.transactionId,
            transactionType: doc.transactionType,
            itemCode: doc.itemCode,
            quantity: doc.quantity,
            price: doc.price,
            transactionDate: doc.transactionDate
        });
    }).catch(err => {
        app.get('logger').error(`${req.url} - ${err.toString()}`);
        e.serverErr(res);
    });
};
