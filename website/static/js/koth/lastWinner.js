import { removeElement, sides } from "../util.js"
import { motionDown, riggedMotion, winnerMotion, winnerMotionExit } from "./playerMotion.js"
import { notify } from "./streamerBot.js";
import { winStreak, winner, winStreakOrder } from "./urlParams.js";
import { weaponObjects, weaponObjectsTesting, weaponNames, weaponNamesTesting } from "./weapons.js"

const scaleLastWinner = 2;
const winStreakNumber = winStreak;
const storage = localStorage;
export var winnerHistory = getWinnerHistory()
const winStreakKey = "Win Streak Key Paid Out"
var currentWinStreakWinners = []


class ConsecutiveCounter {
    #username;
    #wins;
    #previousWinners;
    #history; // Todo: Have a running history.

    constructor(username = undefined, wins = 0, previousWinners = [], history = []) {
        this.#username = username;
        this.#wins = wins;
        this.#previousWinners = previousWinners
        this.#history = history
    }

    get wins() { return this.#wins }
    get username() { return this.#username }
    get previousWinners() { return this.#previousWinners }
    set wins(value) { this.#wins = value }
    set username(value) { this.#username = value }
    get previousWinnersTotal() {
        return this.#previousWinners.length
    }

    get toJSON() {
        return JSON.stringify({
            "username": this.#username,
            "wins": this.#wins,
            "prevWinner": this.#previousWinners
        })
    }

    save() { storage.setItem(winStreakKey, this.toJSON) }
    equal(username) { return username === this.#username }
    increase(username = this.#username) {
        if (this.equal(username)) {
            this.#wins += 1
        } else {
            this.#username = username
            this.#wins = 1
        }
        this.save()
    }

    checkIfWon(username) {
        if (this.#wins >= winStreakNumber) {
            this.#wins = 0
        }
        this.increase(username)
        if (!(winStreakNumber > 0)) {
            console.warn("!(winStreakNumber > 0):", !(winStreakNumber > 0))
            return false
        }
        if (!(winStreakNumber === this.#wins)) {
            console.warn("!(winStreakNumber === this.#wins):", !(winStreakNumber === this.#wins))
            return false
        }
        if (this.previousWinnersTotal >= winner) {
            console.warn("this.previousWinnersTotal >= winner:", this.previousWinnersTotal >= winner, this.previousWinnersTotal)
            return false
        }
        this.winner()
        return true
    }
    winner() {
        this.#previousWinners.push(this.#username)
        this.#wins = 0
        this.save()
    }
    previousWinnersCount() {
        var array = this.#previousWinners
        var obj = {};
        for (var i = 0; i < array.length; i++) {
            obj[array[i]] = (obj[array[i]] || 0) + 1;
        }
        return obj
    }
    static fromJSON(jsonString) {
        let jsonObj = JSON.parse(jsonString)
        let tempUser = jsonObj.username
        let tempWins = jsonObj.wins ? jsonObj.wins : 0
        let tempPrevWinner = jsonObj.prevWinner ? jsonObj.prevWinner : []
        return new ConsecutiveCounter(tempUser, tempWins, tempPrevWinner)
    }
    static init(key = winStreakKey) {
        if (storage.getItem(key)) {
            return ConsecutiveCounter.fromJSON(storage.getItem(key))
        }
        return new ConsecutiveCounter()
    }
}

const consecutiveCounter = ConsecutiveCounter.init(winStreakKey);

export function lastWinner() {
    return JSON.parse(storage.getItem("koth"))
};

function userWinCount(username) {
    return currentWinStreakWinners.filter(x => x == username).length
}

function addToWinnerHistory(username) {
    if (winnerHistory[username]) {
        winnerHistory[username] += 1
    } else {
        winnerHistory[username] = 1
    }
    saveWinnerHistory()
}

function saveWinnerHistory(key = "winnerHistory") {
    if (!Object.keys(winnerHistory).includes(winStreakKey)) {
        winnerHistory[winStreakKey] = currentWinStreakWinners
    }
    storage.setItem(key, JSON.stringify(winnerHistory))
}

function getWinnerHistory(key = "winnerHistory") {
    let tempWinnerHistory = JSON.parse(storage.getItem(key))
    return tempWinnerHistory ? tempWinnerHistory : { winStreakKey: currentWinStreakWinners }
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
        }
    } catch (error) {
        console.error(error)
    }
}

export function clearWinnerHistory() {
    storage.removeItem("koth")
    storage.removeItem("winnerHistory")
    storage.removeItem(winStreakKey)
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
    if (["any", "both"].includes(winStreakOrder) && winStreakCondition(wins)) {
        let winStreakMessage = `WOW @${username}, You have won ${wins} times this stream!`
        notify(ws, botID, winStreakMessage)
    }
    if (["consecutive", "both"].includes(winStreakOrder) && consecutiveCounter.checkIfWon(username)) {
        let winStreakMessage = `OMG @${username}, You have won ${winStreakNumber} times in a row and now you get a free game!`
        notify(ws, botID, winStreakMessage)
    }
    console.log(consecutiveCounter)
}
