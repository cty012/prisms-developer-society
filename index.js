const express = require('express');
const path = require('path');

// set up the server
const app = express();
app.use(express.static(__dirname));
app.listen('8080');

// Deal with GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home/index.html'));
});

app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/games/index.html'));
});

// Send data
