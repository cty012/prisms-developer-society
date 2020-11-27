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
        return this.getFiles(path.join(id, "/carousel")).filter(file => file.toLowerCase().endsWith(".png")).length;
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

app.get("/games/search", (req, res) => {
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
    extensions = {
        "Windows": ".win.zip",
        "MacOS": ".mac.zip",
        "Source Code": ".src.zip",
        all: ["Windows", "MacOS", "Source Code"],
        default: ".zip"
    }
    var platform = req.params.platform;
    var gameId = req.params.gameId;
    var fileName = appManager.getInfo(gameId)["name"] + (extensions.all.includes(platform)? extensions[platform] : extensions.default);
    res.download(path.join(__dirname, "/public/resources/app", gameId, "/product", platform, fileName));
});
