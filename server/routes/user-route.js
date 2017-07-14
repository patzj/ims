import { getOne, getAll, post, patch, remove }
    from '../controllers/user-controller';

export const userRoute = app => {
    app.get('/api/users', getAll);
    app.get('/api/users/:username', getOne);
    app.post('/api/users', post);
    app.patch('/api/users/:username', patch);
    app.delete('/api/users/:username', remove);
};

export default userRoute;
