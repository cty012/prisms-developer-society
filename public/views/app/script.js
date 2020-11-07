function loadGameTitle(title) {
    document.getElementById("game-title").innerHTML = title;
}

function loadGameCarousel(data, imgId, numImgs, isHidden={"l": false, "r": false}) {
    carousel = document.getElementById("game-carousel");
    leftClass = (isHidden["l"]? "hidden" : "") + " " + (imgId > 0? "active" : "");
    rightClass = (isHidden["r"]? "hidden" : "") + " " + (imgId < numImgs - 1? "active" : "");
    carousel.innerHTML = `<img id="game-img" onmouseover="removeHidden();" onmouseout="addHidden();" src="/resources/app/${data["id"]}/carousel/${imgId}.png">`;
    carousel.innerHTML += `<img id="game-carousel-arrow-left" class="${leftClass}" onclick="rotateCarousel(-1)" src="/resources/icons/arrow_left.svg">`;
    carousel.innerHTML += `<img id="game-carousel-arrow-right" class="${rightClass}" onclick="rotateCarousel(1)" src="/resources/icons/arrow_right.svg">`;
}

function loadGameDescription(description) {
    document.getElementById("game-description").innerHTML = description;
}

function loadGameInfo(data) {
    gameInfo = document.getElementById("game-info");
    gameInfo.innerHTML = `
        ${getAuthorHTML(data["authors"])}
        ${getTagHTML(data["tags"])}
        ${getPlatformHTML(data["platforms"])}
        ${getReleaseDate(data["release_date"])}
        ${getDownloadDropdown(data["platforms"], data["id"], data["source_code"])}
    `;
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

function getDownloadDropdown(platformList, gameId, source_code) {
    html = ``;
    downloadList = platformList.concat(source_code? ["Source Code"] : []);
    downloadList.forEach(platform => {
        html += `<a href="/games/download/${gameId}/${platform}"><div class="download-button">${platform}<img class="platform-img" src="/resources/icons/platforms/${platform}.svg"></div></a>`;
    });
    return `
        <div id="game-info-download"><div class="download-dropdown" onmouseover="showDropdown(this)"; onmouseout="hideDropdown(this);">
            <img width="25px" height="25px" src="/resources/icons/download.svg">&nbsp;&nbsp;Download<div class="download-dropdown-contents">${html}</div>
        </div></div>
    `;
}
