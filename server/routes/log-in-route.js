import logIn from '../controllers/log-in-controller';

export const logInRoute = (app) => {
    app.post('/api/log-in', logIn);
};

export default logInRoute;
