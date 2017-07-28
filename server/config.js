export const config = () => {
    const development = {
        DATABASE: 'mongodb://localhost:27017/ims-dev',
        JWT: {
            SECRET: 'super-secret',
            EXPIRATION: '1h'
        },
        PORT: 3000
    };

    const production = {
        DATABASE: 'mongodb://localhost:27017/ims',
        JWT: {
            SECRET: 'd4386bc6ebd8c194e75bdb875692da51',
            EXPIRATION: '1h'
        },
        PORT: process.env.PORT || 8080
    };

    switch(process.env.NODE_ENV) {
        case 'production':
            return production;
        case 'development':
        default:
            return development;
    }
};

export default config;
