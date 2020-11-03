const express = require('express');
const process = require('process');
const path = require('path');

// Change working directory to /public
process.chdir(path.join(__dirname, 'public'));

// Set up the server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.listen('8080');

// Deal with GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/home/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/home/index.html'));
});

app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/games/index.html'));
});

app.get('/games/app/:gameId', (req, res) => {
    res.render(path.join(__dirname, '/public/views/app/index.ejs'), data = {data: {
        'id': "sample_game",
        "name": "Sample Game",
        "authors": [
            {"id": "daniel_cao", "name": "Daniel Cao"},
            {"id": "steven_lu", "name": "Steven Lu"}
        ],
        "tags": ["multiplayer", "platformer"],
        "platforms": ["Windows10", "MacOS", "Linux"],
        "release_date": [2020, 12, 31]
    }});
});

// Send data
app.get('/gamelist', (req, res) => {
    data = Array(5).fill(
        {
            "id": "sample_game",
            "name": "Sample Game",
            "authors": [
                {"id": "daniel_cao", "name": "Daniel Cao"},
                {"id": "steven_lu", "name": "Steven Lu"}
            ],
            "tags": ["multiplayer", "platformer"],
            "platforms": ["Windows10", "MacOS", "Linux"],
            "release_date": [2020, 12, 31]
        }
    );
    res.send(data);
});

app.get('/games/download/:gameId/:platform', (req, res) => {
    res.download(path.join(__dirname, '/public/resources/app', req.params.gameId, '/product', req.params.platform + '.zip'));
});
