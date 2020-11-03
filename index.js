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
    console.log("data: " + JSON.stringify(data));
    res.send(data);
})
