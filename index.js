const express = require("express");
const process = require("process");
const path = require("path");
const fs = require("fs");

// Change working directory to /public
process.chdir(path.join(__dirname, "public"));

// Set up the server
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.listen("8080");

// file system
class AppManager {
    constructor(path) {
        this.root = path;
    }
    readFile(relPath) {
        return fs.readFileSync(path.join(this.root, relPath), {encoding: "utf8"});
    }
    getFiles(relPath) {
        return fs.readdirSync(path.join(this.root, relPath)).filter(file => file != ".DS_Store");
    }
    getAppList() {
        return this.getFiles("/");
    }
    getInfo(id) {
        return JSON.parse(this.readFile(path.join(id, "/info.json")));
    }
    getDescription(id) {
        return this.readFile(path.join(id, "/description.html"));
    }
    getNumImgs(id) {
        return this.getFiles(path.join(id, "/carousel")).filter(file => file.endsWith(".jpg")).length;
    }
}

var appManager = new AppManager(path.join(__dirname, "/public/resources/app"));

// Deal with GET request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/views/home/index.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/views/home/index.html"));
});

app.get("/games", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/views/games/index.html"));
});

app.get("/games/app/:gameId", (req, res) => {
    res.render(path.join(__dirname, "/public/views/app/index.ejs"), data = {
        info: appManager.getInfo(req.params.gameId),
        numImgs: appManager.getNumImgs(req.params.gameId),
        description: appManager.getDescription(req.params.gameId)
    });
});

// Send data
app.get("/gamelist", (req, res) => {
    gameList = appManager.getAppList();
    data = gameList.map(gameId => {
        return appManager.getInfo(gameId);
    });
    res.send(data);
});

app.get("/games/download/:gameId/:platform", (req, res) => {
    gameName = appManager.getInfo(req.params.gameId)["name"];
    res.download(path.join(__dirname, "/public/resources/app", req.params.gameId, "/product", req.params.platform, gameName + ".zip"));
});
