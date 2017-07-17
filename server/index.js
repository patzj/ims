import bodyParser from 'body-parser';
import Express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import winston from 'winston';
import config from './config';

import logInRoute from './routes/log-in-route';
import itemRoute from './routes/item-route';
import registrationRoute from './routes/registration-route';
import userRoute from './routes/user-route';

import accessChecker from './middlewares/access-checker';
import jsonChecker from './middlewares/json-checker';

const app = new Express();
const cfg = config();

// Configure logger
winston.configure({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({
            timestamp: () => Date.now()
        }),
        new (winston.transports.File)({
            timestamp: () => Date.now(),
            filename: 'logs/server.log'
        })
    ]
});

// Configure app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(Express.static(path.resolve(__dirname, '../build/assets')));
app.use(accessChecker(app));
app.use(jsonChecker);
app.set('logger', winston);

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Connect to database
mongoose.promise = global.Promise;
mongoose.connect(cfg.DATABASE, {useMongoClient: true});

// Add routes
logInRoute(app);
itemRoute(app);
registrationRoute(app);
userRoute(app);

// Run app
app.listen(cfg.PORT, () => {
    if(!fs.existsSync('logs/server.log')) {
        fs.mkdir('logs');
        fs.writeFile('logs/server.log', '', (err) => {
            if(err) {
                console.log(err.toString());
            }
        });
    }
    console.log(`Listening to port ${cfg.PORT}`);
});
