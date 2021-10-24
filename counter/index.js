// подключение express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'redis';

const client = redis.createClient(`redis://${REDIS_URL}`);
// создаем объект приложения
const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// COUNTER API
app.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;

    if(!bookId) {
        res.status(404).json('Code: 404');
        return;
    }

    client.get(bookId, (err, counter) => {
        if(err) return res.status(500).json({error: 'Redis error'});

        res.json({
            counter,
            bookId
        });
    });
});

app.post('/counter/:bookId/cnt', (req, res) => {
    const { bookId } = req.params;

    if(!bookId) {
        res.status(404).json('Code: 404');
        return;
    }

    client.incr(bookId, (err, counter) => {
        if(err) return res.status(500).json({error: 'Redis error'});

        res.json({
            counter,
            bookId
        });
    });
});

const PORT = process.env.COUNTER_PORT || 9000;

app.listen(PORT, () => {
    console.log(`=== Counter start server on PORT ${PORT} ===`)
});