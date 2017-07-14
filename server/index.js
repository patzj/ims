import bodyParser from 'body-parser';
import Express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import config from './config';
import logInRoute from './routes/log-in-route';
import itemRoute from './routes/item-route';
import registrationRoute from './routes/registration-route';
import userRoute from './routes/user-route';

const app = new Express();
const cfg = config();

// Configure app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(Express.static(path.resolve(__dirname, '../build/assets')));

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
    console.log(`listening to port ${cfg.PORT}`);
});
