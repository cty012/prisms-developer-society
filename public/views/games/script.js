var xhttp = null;
if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
} else {
    xhttp = new ActiveXObject();
}

function requestGameList(url) {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            updateGameList(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function updateGameList(gameList) {
    /*
     * gameList = List<Dict{
     *     "id": String,
     *     "name": String,
     *     "authors": Dict{"id": String, "name": String},
     *     "tags": List<String>,
     *     "platforms": List<String>
     * }>
     */
    element = document.getElementById("game-list");
    element.innerHTML = "";
    gameList.forEach(gameInfo => {
        element.innerHTML += `
            <div class="game-block">
                <a href="/games/app/${gameInfo["id"]}">
                    <img class="game-img" src="/resources/app/${gameInfo["id"]}/cover.jpg">
                </a>
                <div class="game-info">
                    <div class="game-info-name"><a class="link" href="/games/app/${gameInfo["id"]}">${gameInfo["name"]}</a></div>
                    ${getAuthorHTML(gameInfo["authors"])}
                    ${getTagHTML(gameInfo["tags"])}
                    ${getPlatformHTML(gameInfo["platforms"])}
                    ${getReleaseDate(gameInfo['release_date'])}
                </div>
            </div>
        `;
    });
}

function getAuthorHTML(authorList) {
    html = ``;
    authorList.forEach(author => {
        html += `<a class="tag" href="/games/search/?authors=${author["id"]}">${author["name"]}</a> `;
    });
    return `<div class="game-info-item">Authors:${html}</div>`;
}

function getTagHTML(tagList) {
    html = ``;
    tagList.forEach(tag => {
        html += `<a class="tag" href="/games/search/?tags=${tag}">${tag}</a> `;
    });
    return `<div class="game-info-item">Tags:${html}</div>`;
}

function getPlatformHTML(platformList) {
    html = ``;
    platformList.forEach(platform => {
        html += `<a href="/games/search/?platforms=${platform}"><img class="platform-img" src="/resources/icons/platforms/${platform}.svg"></a>`;
    });
    return `<div class="game-info-item">Platforms:${html}</div>`;
}

function getReleaseDate(release_date) {
    monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `<div class="game-info-item">Released on: ${release_date[2]} ${monthList[release_date[1] - 1]} ${release_date[0]}</div>`;
}

window.onload = () => {
    requestGameList("/gamelist");
}
