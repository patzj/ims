import { getOne, getAll, post, patch, remove, itemIn, itemOut }
    from '../controllers/item-controller';

export const itemRoute = app => {
    app.get('/api/items', getAll(app));
    app.get('/api/items/:slug', getOne(app));
    app.post('/api/items', post(app));
    app.patch('/api/items/:slug', patch(app));
    app.delete('/api/items/:slug', remove(app));
    app.post('/api/items/:slug/in', itemIn(app));
    app.post('/api/items/:slug/out', itemOut(app));
};

export default itemRoute;
