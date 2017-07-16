import { getOne, getAll, post, patch, remove, itemIn, itemOut }
    from '../controllers/item-controller';

export const itemRoute = app => {
    app.get('/api/item', getAll);
    app.get('/api/item/:slug', getOne);
    app.post('/api/item', post);
    app.patch('/api/item/:slug', patch);
    app.delete('/api/item/:slug', remove);
    app.post('/api/item/:slug/in', itemIn);
    app.post('/api/item/:slug/out', itemOut);
};

export default itemRoute;
