import { getOne, getAll, post, patch, remove, itemIn, itemOut }
    from '../controllers/item-controller';

export const itemRoute = app => {
    app.get('/api/items', getAll(app));
    app.get('/api/items/:code', getOne(app));
    app.post('/api/items', post(app));
    app.patch('/api/items/:code', patch(app));
    app.delete('/api/items/:code', remove(app));
    app.post('/api/items/:code/in', itemIn(app));
    app.post('/api/items/:code/out', itemOut(app));
};

export default itemRoute;
