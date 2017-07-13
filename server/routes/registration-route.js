import register from '../controllers/registration-controller';

export const registrationRoute = app => {
    app.post('/api/register', register);
};

export default registrationRoute;
