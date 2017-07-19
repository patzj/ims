import { getOne, getAll, post } from '../controllers/transaction-controller';

export const transactionRoute = app => {
    app.get('/api/transactions', getAll(app));
    app.get('/api/transactions/:id', getOne(app));
    app.post('/api/transactions', post(app));
};

export default transactionRoute;
