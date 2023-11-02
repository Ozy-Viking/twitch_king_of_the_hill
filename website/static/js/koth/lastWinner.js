import { removeElement, sides } from "../util.js"
import { motionDown, riggedMotion, winnerMotion, winnerMotionExit } from "./playerMotion.js"
import { notify } from "./streamerBot.js";
import { winStreak } from "./urlParams.js";
import { weaponObjects, weaponObjectsTesting, weaponNames, weaponNamesTesting } from "./weapons.js"

const scaleLastWinner = 2;
const winStreakNumber = winStreak;
const storage = localStorage;
export var winnerHistory = getWinnerHistory()

export function lastWinner() {
    return JSON.parse(storage.getItem("koth"))
};

function addToWinnerHistory(username) {
    if (winnerHistory[username]) {
        winnerHistory[username] += 1
    } else {
        winnerHistory[username] = 1
    }
    saveWinnerHistory()
}

function saveWinnerHistory(key = "winnerHistory") {
    storage.setItem(key, JSON.stringify(winnerHistory))
}

function getWinnerHistory(key = "winnerHistory") {
    let tempWinnerHistory = JSON.parse(storage.getItem(key))
    return tempWinnerHistory ? tempWinnerHistory : {}
}

export function isLastWinner(key = "koth") {
    return storage.getItem(key) ? true : false
}

export function setLastWinner(username, weapon, side, rigged = false) {
    const winner = {
        "username": username,
        "weapon": weapon,
        "side": side,
        "rigged": rigged
    }
    addToWinnerHistory(username)
    storage.setItem("koth", JSON.stringify(winner))
}

export function lastWinnerDiv() {
    const currentKing = lastWinner()
    let weapon;
    if (weaponNames.includes(currentKing.weapon)) {
        weapon = weaponObjects[currentKing.weapon]
    } else if (weaponNamesTesting.includes(currentKing.weapon)) {
        weapon = weaponObjectsTesting[currentKing.weapon]
    }
    var winnerSide = currentKing.side;
    // if (sides.includes(winnerSide)) {
    //     winnerSide = "left"
    // }
    var username = currentKing.username.toLowerCase();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // get display image for the user
            // console.log("got a response back");
            //save this to cache between sessions too.
            //check for user being added already (or if already dead and ignore)
            if (document.getElementById("lastWinner")) {
                try {
                    removeElement("lastWinner")
                } catch (error) { }
            }
            var warp = document.getElementById("lastWinnerDiv"),
                innerWidth = window.innerWidth,
                innerHeight = window.innerHeight;
            // Load into page
            var Div = document.createElement('div');
            Div.id = "lastWinner";
            Div.setAttribute("user", currentKing.username);
            Div.style.background = `url(${xhttp.responseText})`;
            Div.style.backgroundSize = '100% 100%';
            Div.setAttribute("weapon", `${weapon.name}`)
            // deepcode ignore DOMXSS: Only ran clientside.
            Div.innerHTML = `<img style='${weapon[winnerSide]}' src='static/images/${weapon.file}'/>`;
            TweenLite.set(Div, { className: 'falling-element', x: (innerWidth / 2) - 45, y: (innerHeight - 150), z: 0, scale: 1.5 });
            warp.appendChild(Div);

            let div = document.createElement('div');
            div.id = "lastWinnerName"
            div.innerText = currentKing.username
            Div.appendChild(div)
            if (currentKing.rigged) {
                winnerMotion(Div, true, (scaleLastWinner + 0.25), true)
            } else {
                winnerMotion(Div, true, scaleLastWinner, false)
            }
        }
    };
    xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
    xhttp.send();
};

export function removeLastWinner(id = "lastWinner") {
    try {
        if (storage.koth) {
            let element = document.getElementById(id)
            winnerMotionExit(element, true)
            setTimeout(removeElement, (motionDown) * 1000, id)
        }
    } catch (error) {
        console.error(error)
    }
}

export function clearWinnerHistory() {
    storage.removeItem("koth")
    storage.removeItem("winnerHistory")
    winnerHistory = {}
}
function winStreakCondition(win) {
    if (win < winStreakNumber) {
        return false
    } else if ((win % winStreakNumber) === 0) {
        return true
    } else {
        return false
    }
}

export function winStreakNotify(ws, botID, username) {
    let wins = winnerHistory[username];
    if (winStreakCondition(wins)) {
        let winStreakMessage = `Well done @${username}, You have won ${wins} times this stream. If you keep this up, you will have to untangle this spaghetti on stream.`
        notify(ws, botID, winStreakMessage)
    }
}
