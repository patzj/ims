import Express from 'express';

const app = new Express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('listening to port 3000');
});
