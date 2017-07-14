import { getOne, getAll, post } from '../controllers/item-controller';

export const itemRoute = app => {
    app.get('/api/item', getAll);
    app.get('/api/item/:slug', getOne);
    app.post('/api/item', post);
};

export default itemRoute;
