import { error as e } from '../utils/response-utils';

export const jsonChecker = (req, res, next) => {
    if(Object.keys(req.body).length < 1) {
        e.invalidInput(res, 'Invalid input');
    } else {
        next();
    }
};

export default jsonChecker;
