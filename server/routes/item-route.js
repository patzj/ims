import { getOne, getAll, post, patch, remove, itemIn, itemOut }
    from '../controllers/item-controller';

export const itemRoute = app => {
    app.get('/api/items', getAll);
    app.get('/api/items/:slug', getOne);
    app.post('/api/items', post);
    app.patch('/api/items/:slug', patch);
    app.delete('/api/items/:slug', remove);
    app.post('/api/items/:slug/in', itemIn);
    app.post('/api/items/:slug/out', itemOut);
};

export default itemRoute;
