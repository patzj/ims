export const httpStatus = {
    OK: 200,
    CREATED: 201,
    NOT_CONTENT: 204,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNP_ENTITY: 422,
    SERVER_ERR: 500
};

export const error = {
    badRequest: res => {
        res.status(httpStatus.BAD_REQUEST).json({
            message: 'Bad request'
        });
    },
    notFound: res => {
        res.status(httpStatus.NOT_FOUND).json({
            message: 'Not found'
        });
    },
    serverErr: res => {
        res.status(httpStatus.SERVER_ERR).json({
            message: 'Something went wrong'
        });
    },
    alreadyExists: res => item => {
        res.status(httpStatus.CONFLICT).json({
            message: `${item} already exists`
        });
    },
    incorrectCredentials: res => {
        res.status(httpStatus.BAD_REQUEST).json({
            message: 'Incorrect username or password'
        });
    },
    invalidInput: (res, msg) => {
        res.status(httpStatus.UNP_ENTITY).json({
            message: msg
        });
    },
    forbidden: (res) => {
        res.status(httpStatus.FORBIDDEN).json({
            message: 'Forbidden'
        });
    }
};
