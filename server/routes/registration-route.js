import { post } from '../controllers/user-controller';

export const registrationRoute = app => {
    app.post('/api/register', post);
};

export default registrationRoute;
