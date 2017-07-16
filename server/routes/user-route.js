import { getOne, getAll, post, patch, remove }
    from '../controllers/user-controller';

export const userRoute = app => {
    app.get('/api/users', getAll(app));
    app.get('/api/users/:username', getOne(app));
    app.post('/api/users', post(app));
    app.patch('/api/users/:username', patch(app));
    app.delete('/api/users/:username', remove(app));
};

export default userRoute;
