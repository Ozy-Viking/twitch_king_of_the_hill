// Script for King of the Hill
// Maintainer: Ozy-Viking
// Repo: https://github.com/Ozy-Viking/twitch_king_of_the_hill
// Docker Container: ozyviking/twitch-king-of-the-hill

import { weaponObjects, weaponNames, gstring } from "./weapons.js";
import { winnerMotion, fighterAnimation, yeet, winnerMotionExit, victorsClaimToFameTime, winnerMotionLength, motionUp, motionDown, randomSideMotion } from "./playerMotion.js";
import { modifyStyleSheet, Randomizer, removeElement } from "../util.js";
import { kothTestEvent as testEvent, randomPlayer } from "./test.js";
import { playSound, changeVolume, playBattleSound, soundplay, stopAllSound } from "./sound.js";
import { redirectBrowser } from "../util.js";
import { randomSide } from "../util.js";
import { notify, setWinner, connectws } from "./streamerBot.js";
import { clearWinnerHistory, isLastWinner, lastWinnerDiv, removeLastWinner, setLastWinner, winStreakNotify, winnerHistory } from "./lastWinner.js";
import {
    championName,
    gameLength,
    gstringProb,
    hillName,
    joinCommand,
    reset,
    riggedUsers,
    server,
    showLastWinner,
    testing,
    winStreak
} from "./urlParams.js";

// file deepcode ignore reDOS: No code injection possible in file.
const joinCommandRegex = new RegExp(joinCommand, "i");
const totalYeetTime = 10
const delayToCeremony = 2.5
const fightDelay = 1;
const postGameLength = fightDelay + totalYeetTime + delayToCeremony + winnerMotionLength;
const GLPGL = gameLength + postGameLength
const hillAnimationCSS = 0.02 // 2%
const hillAnimationLength = (GLPGL / (1 - 2 * hillAnimationCSS) - GLPGL) / 2;
const totalGameLength = hillAnimationLength + gameLength + postGameLength + hillAnimationLength
const battleGround = `${championName} of the ${hillName}`;
const botID = "123";
const noJoinMessage = `No one joined, so no new ${battleGround}!`;
const winnerMessage = `is the new ${battleGround}`;
const updateMessage = `seconds left to join the fight! Type ${joinCommand} to see if you can take the title of ${battleGround}!`;

// deepcode ignore MissingClose: websocket is closed.
var ws = new WebSocket(server);
var weaponnumber = 0;
var riggedWinners = [];
var divnumber = 0;
var winner = 0;
// Ending message set at end of code.
var battleActive = false;
// Alternate endings messages.
var altEndingMessages = [
    // `This Is Your Life, and It's Ending One Minute at a Time`
];

if (reset) {
    console.warn("Clearing History");
    clearWinnerHistory()
}

modifyStyleSheet(".grassyhill", '--koth-length', `${totalGameLength}s`)

function chooseRandomWeapon() {
    return weaponObjects[weaponNames[Math.floor(Math.random() * weaponNames.length)]];
};

function userJoining() {
    ws.send(JSON.stringify(
        {
            "request": "Subscribe",
            "events": {
                "Twitch": [
                    "ChatMessage"
                ]
            },
            "id": botID
        }
    ));
    const updateMessageRegex = new RegExp(`${updateMessage.toLowerCase()}|${endingMessage.toLowerCase()}|${noJoinMessage.toLowerCase()}`, "i");
    ws.onmessage = function (event) {
        // grab message and parse JSON
        const msg = event.data;
        const wsdata = JSON.parse(msg);
        if (typeof wsdata.data != "undefined") {
            if (typeof wsdata.data.message != "undefined") {
                let lowerMessage = wsdata.data.message.message.toLowerCase();
                if ((joinCommandRegex.exec(lowerMessage) != null) && (updateMessageRegex.exec(lowerMessage) == null)) { //lowerMessage.startsWith(joinCommand)) {
                    addFighter(wsdata.data.message.displayName, lowerMessage);
                };
            }
        }
    };
};

function usersWeapon(lowerMessage) {
    var choosenWeapon = null;
    var weapon;

    for (let i = 0; i < weaponNames.length; i++) {
        weapon = weaponObjects[weaponNames[i]]
        if (weapon.regex.exec(lowerMessage) != null) {
            choosenWeapon = weapon
        }
    }
    if (choosenWeapon === null) {
        choosenWeapon = chooseRandomWeapon();
    }

    if (choosenWeapon.name == 'thong') {
        if (Randomizer(0, gstringProb) == 0) {
            return gstring;
        };
    };
    return choosenWeapon;
}

function addFighter(user, lowerMessage) {
    var username = user.toLowerCase();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var addToFight = true;
            if (battleActive) {
                if (!testing) {
                    for (let i = 0; i < divnumber; i++) {
                        let checkUser = document.getElementById(i).getAttribute("user");
                        if (user == checkUser) {
                            addToFight = false;
                        };
                    };
                };
            } else {
                addToFight = false;
            };
            if (addToFight) {
                var warp = document.getElementById("confetti-container"),
                    innerWidth = window.innerWidth,
                    innerHeight = window.innerHeight;

                // Load into page
                var Div = document.createElement('div');
                Div.id = divnumber;
                Div.setAttribute("user", user);
                Div.setAttribute("state", "alive");
                divnumber++;
                Div.style.background = `url(${xhttp.responseText})`;
                Div.style.backgroundSize = '100% 100%';

                var weapon = usersWeapon(lowerMessage);
                var side = randomSide();
                Div.setAttribute("side", side);
                if (weapon.name == gstring.name) {
                    riggedWinners.push(Div.id)
                }
                Div.setAttribute("weapon", `${weapon.name}`)
                Div.innerHTML = `<img style='${weapon[side]}' src='static/images/${weapon.file}'/>`;

                switch (side) {
                    case 'left':
                        // left - TweenLite.set(Div, { className: 'lurking-element', x: -600, y: Randomizer(0, innerHeight-600 ), z:0 });
                        TweenLite.set(Div, { className: 'falling-element', x: -75, y: innerHeight - 113, z: 0 });
                        fighterAnimation(Div);
                        break;
                    default:
                        TweenLite.set(Div, { className: 'falling-element', x: innerWidth, y: innerHeight - 110, z: 0 });
                        fighterAnimation(Div);
                        break;
                }
                warp.appendChild(Div);

                setTimeout(removeElement, totalGameLength * 1000, Div.id);
            }
        }
    };
    xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
    xhttp.send();
};

function randomWeapon() {
    var warp = document.getElementById("confetti-container");
    var Div = document.createElement('div');
    Div.id = "weapon" + weaponnumber;
    weaponnumber++;
    var weapon = chooseRandomWeapon();
    Div.style.background = `url("static/images/${weapon.file}")`;
    Div.style.backgroundSize = '100% 100%';
    warp.appendChild(Div);
    randomSideMotion(Div)
    setTimeout(removeElement, totalGameLength * 1000, Div.id);
};

function winnerTime(id, winNotification) {
    playSound('horn.mp3', 0.4)
    // Play Sound and notify winner 
    setTimeout(playSound, 1500, 'cheer.mp3', 0.3)
    setTimeout(changeVolume, 24000, soundplay - 1, 0, 2000, 20)
    setTimeout(notify, 1000, ws, botID, winNotification)

    let element = document.getElementById(id);
    const user = element.getAttribute("user");
    let rigged = riggedUsers.includes(user)
    if (winStreak) {
        setTimeout(winStreakNotify, 2000, ws, botID, user)
    }
    setLastWinner(user, element.getAttribute('weapon'), element.getAttribute('side'), rigged)

    if (rigged) {
        winnerMotion(element, false, 4, true);
    } else {
        winnerMotion(element, false, 2.5, false)
    };
    setTimeout(winnerMotionExit, victorsClaimToFameTime * 1000, element)
};

function winnerNotification(user, winweapon, winMessage = winnerMessage) {
    let winnerMsg;
    // console.log(winweapon)
    if (winweapon === null) {
        winnerMsg = `${user} ${winnerMessage}`;
    } else {
        winnerMsg = `${user} ${winMessage}, using ${winweapon["tense 1"]} ${winweapon.name}.`
    }
    return winnerMsg
}

function startFight() {
    battleActive = false;
    // deepcode ignore MissingClose: added close to end of onopen.
    ws = connectws(server, fightSequence)
};

function fightSequence() {
    // console.log('Start Fight: onopen')
    if (riggedWinners.length) {
        winner = riggedWinners[Randomizer(0, riggedWinners.length)]
    } else {
        winner = Math.floor(Math.random() * divnumber);
    }
    if (divnumber == 0) {
        // **** No users here - need to handle ****
        // file deepcode ignore UsageOfUndefinedReturnValue: Not an issue.
        // deepcode ignore CodeInjection: No code injection possible here.
        setTimeout(notify, 10000, ws, botID, noJoinMessage);
    } else {
        var user = document.getElementById(winner).getAttribute("user");
        var winweapon = document.getElementById(winner).getAttribute("weapon");
        yeetathon(winner);
        // 17000
        setTimeout(changeVolume, 0, 0, 0.1, 2500)
        setTimeout(changeVolume, totalYeetTime * 1000, 0, 0, 2500)
        setTimeout(winnerTime, (totalYeetTime + delayToCeremony) * 1000, winner, winnerNotification(user, weaponObjects[winweapon]));
        setTimeout(setWinner, (totalYeetTime + delayToCeremony + motionUp + victorsClaimToFameTime), ws, botID, user);
        // deepcode ignore CodeInjection: Code Injection is not possible.
        setTimeout(closeWS, postGameLength * 1000, ws)
    }
};

function yeetathon(winner) {
    // var yeetUser;
    var yeetTime;
    var numbers = new Array(divnumber);
    for (let i = 0; i < divnumber; i++) {
        numbers[i] = i;
    };
    numbers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < divnumber; i++) {
        if (numbers[i] != (winner)) {
            // yeetUser = document.getElementById(numbers[i]);
            yeetTime = (i * (totalYeetTime * 1000)) / divnumber;
            setTimeout(yeet, yeetTime, numbers[i]);
            // console.log(`yeeting ID (${i}): ${yeetUser.getAttribute("user")}`);
        }
    }
}

function generateEndingMessage() {
    let endingChoice = Randomizer(0, (weaponNames.length + altEndingMessages.length - 1));
    if (endingChoice < altEndingMessages.length) {
        return altEndingMessages[endingChoice];
    } else {
        let randWeapon = chooseRandomWeapon()
        return `The fight is coming to an end! Get back, Back, no more people. OI! Who threw ${randWeapon['tense 2']} ${randWeapon.name}!?!`;
    }
};
var endingMessage = generateEndingMessage();

function addTestingPeople(totalGameLength, numberPeople = 10) {
    for (let i = 0; i < numberPeople; i++) {
        let randomdelay = (totalGameLength * Math.random()) * 1000;
        setTimeout(testEvent, randomdelay, ws, joinCommand, randomPlayer(), chooseRandomWeapon().command[0]);
    };
};

function gameLengthSplit(m = 1, c = 0, floor = false) {
    var split = gameLength / 12;
    let length = m * split + c
    if (floor) {
        length = Math.floor(length)
    }
    return length
};

function randomWeaponSetup() {
    var randomWeaponSplit = 2000;
    for (let i = 0; i < 60; i++) {
        let randomdelay = 3500 + (i * randomWeaponSplit) + Math.floor(Math.random() * 500) + 1;
        if (randomdelay <= (gameLength + 1) * 1000) {
            setTimeout(randomWeapon, randomdelay);
        };
    };
}

function displayLastWinner() {
    lastWinnerDiv()
    setTimeout(removeLastWinner, gameLength * 1000)
}

function closeWS(ws) {
    try {
        ws.close()
    } catch (error) {
        console.error(error)
    }
}

//Main function
function main() {
    ws = connectws(server, userJoining);
    battleActive = true
    setTimeout(playBattleSound, hillAnimationLength * 1000, 0.2, gameLength);
    if (isLastWinner() && showLastWinner) {
        setTimeout(displayLastWinner, hillAnimationLength * 1000);
    }
    setTimeout(notify, gameLengthSplit(0, hillAnimationLength) * 1000, ws, botID, `${gameLengthSplit(12, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-9, hillAnimationLength + gameLength) * 1000, ws, botID, `${gameLengthSplit(9, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-6, hillAnimationLength + gameLength) * 1000, ws, botID, `${gameLengthSplit(6, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-3, hillAnimationLength + gameLength) * 1000, ws, botID, `${gameLengthSplit(3, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-2, hillAnimationLength + gameLength) * 1000, ws, botID, `${gameLengthSplit(2, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-1, hillAnimationLength + gameLength) * 1000, ws, botID, `${gameLengthSplit(1, 0, true)} ${updateMessage}!`);
    setTimeout(notify, (gameLength + hillAnimationLength) * 1000, ws, botID, endingMessage);
    setTimeout('battleActive = false', (gameLength + hillAnimationLength) * 1000);
    // deepcode ignore CodeInjection: No code inject 
    setTimeout(closeWS, (gameLength + hillAnimationLength) * 1000, ws);
    setTimeout(startFight, (gameLength + hillAnimationLength + fightDelay) * 1000);
    setTimeout(removeElement, (totalGameLength - 0.5) * 1000, "grassyhill_id")
    setTimeout(stopAllSound, (totalGameLength) * 1000)
    setTimeout(redirectBrowser, (totalGameLength) * 1000);
    randomWeaponSetup();
    if (testing) { setTimeout(addTestingPeople, 1000, gameLength, gameLength / 2) }
};

main();
