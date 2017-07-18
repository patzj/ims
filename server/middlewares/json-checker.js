import { error as e } from '../utils/response-util';

export const jsonChecker = (req, res, next) => {
    if((req.method == 'POST' || req.method == 'PATCH') &&
        Object.keys(req.body).length < 1) {
        e.invalidInput(res, 'Invalid input');
    } else {
        next();
    }
};

export default jsonChecker;
