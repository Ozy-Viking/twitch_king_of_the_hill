// Script for King of the Hill
// Maintainer: Ozy-Viking
// Repo: https://github.com/Ozy-Viking/twitch_king_of_the_hill
// Docker Container: ozyviking/twitch-king-of-the-hill

var weaponsObjects = {
    'teapot': {
        'file': 'teapot.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(45deg) translate(30px,-30px)',
        'right': 'transform: rotate(-45deg) translate(-30px,-30px)',
        'command': ['teapot', 'tea', 'pot']
    },
    'number 1 fan finger': {
        'file': 'no1.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(45deg) translate(35px,-50px)',
        'right': 'transform: rotate(-45deg) translate(-35px,-50px)',
        'command': ['1', 'one', 'num', 'finger']
    },
    'plunger': {
        'file': 'plunger.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(10deg) translate(55px,-20px)',
        'right': 'transform: rotate(-10deg) translate(-55px,-20px) scaleX(-1)',
        'command': ['plunger', 'dunny', 'toilet']
    },
    'doughnut': {
        'file': 'doughnut.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(30deg) translate(10px,-60px)',
        'right': 'transform: rotate(-30deg) translate(-10px,-60px)',
        'command': ['doughnut', 'donut', 'nut']
    },
    'thong': {
        'file': 'thong.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(30deg) translate(10px,-60px);',
        'right': 'transform: rotate(-30deg) translate(-10px,-60px);',
        'command': ['thong', 'flip flop', 'formal thong', 'safety boot']
    },
    'giant match': {
        'file': 'match.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(30deg) translate(40px,-20px)',
        'right': 'transform: rotate(-30deg) translate(-40px,-20px)',
        'command': ['fire', 'match', 'aussie summer']
    },
    'frying pan': {
        'file': 'pan.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(0deg) translate(60px,-10px)',
        'right': 'transform: rotate(0deg) translate(-60px,-10px) scaleX(-1)',
        'command': ['pan', 'hot flat', 'pancake maker', 'skillet', 'iron']
    },
    'butchered name': {
        'file': 'Name_Butcher_4000.png',
        'tense 1': 'a',
        'tense 2': 'that', // Todo: Implement this!
        'left': 'transform: rotate(10deg) translate(-30px,30px); width: 50px;', //'transform: rotate(-10deg) translate(50px,25px) scaleX(-1); width: 50px;',
        'right': 'transform: rotate(10deg) translate(-30px,30px); width: 50px;',
        'command': ['name', 'murder', 'butcher', 'kill']
    },
    'boomerang': {
        'file': 'Boomerang.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(-10deg) translate(60px,-10px); width: 50px;',
        'right': 'transform: rotate(-10deg) translate(-40px,-10px) scaleX(-1); width: 50px;',
        'command': ['boom', 'rang']
    },
    'didgeridoo': {
        'file': 'didgeridoo.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(250deg) translate(-25px,35px)',
        'right': 'transform: rotate(10deg) translate(-35px,25px)',
        'command': ['didgeridoo', 'pipe', 'wind', 'doo', 'didg']
    },
    'sausage sanga': {
        'file': 'sausage_sanga.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(0deg) translate(50px,20px); width: 50px;',
        'right': 'transform: rotate(0deg) translate(-30px,20px) scaleX(-1); width: 50px;',
        'command': ['sausage', 'sandwich', 'sanga', 'snag', 'bunning']
    },
    'goon sack': {
        'file': 'Goon_Sack.png',
        'tense 1': 'the',
        'tense 2': 'that',
        'left': 'transform: rotate(0deg) translate(55px,-20px) scaleX(-1); width: 50px;',
        'right': 'transform: rotate(0deg) translate(-30px,-20px); width: 50px;',
        'command': ['goon', 'sack', 'goon of fortune', 'fancy', 'fine dinning', 'pillow']
    },
};

const urlParams = new URLSearchParams(window.location.search);
var gstringProb = Number(urlParams.get('gstringProb'));
if (gameLength in [null, 0]) { gstringProb = 10000; };

var gstring = {
    'name': "JD's Sexy Thong",
    'file': 'secret_thong.png',
    'tense 1': '',
    'tense 2': '',
    'left': 'transform: rotate(-30deg) translate(60px,20px);',
    'right': 'transform: rotate(30deg) translate(-35px,10px);',
    'command': ['thong', 'flip flop', 'formal thong', 'safety boot']
};

var joinCommand = urlParams.get('joinCommand');
if (joinCommand == null) { joinCommand = "king"; };
joinCommand = joinCommand.toLowerCase()
// file deepcode ignore reDOS: No code injection possible in file.
var joinCommandRegex = new RegExp(joinCommand, "i");

var gameLength = Number(urlParams.get('gameLength'));
if (gameLength in [null, 0]) { gameLength = 60; };
var removalTimeoutTime = (gameLength + 60) * 1000;

var riggedUsers = ['Ozy_Viking', 'sassysarrah5', 'gotobedchild'];
riggedUsers = riggedUsers.concat(urlParams.getAll('riggedUser'));


var divnumber = 0;
var winner = 0;
var audio = [];
var soundplay = 0;

var weaponNames = Object.keys(weaponsObjects);
// adds the name of each weapon for code readabilty
for (let i = 0; i < weaponNames.length; i++) {
    let weapon = weaponsObjects[weaponNames[i]];
    weapon.name = weaponNames[i];
    weapon.regex = new RegExp(weapon.command.join('|'), "i");
};

var sides = ['left', 'right'];

// Randomisers
function Randomizer(min, max) { return min + Math.floor(Math.random() * (max - min)); };

function removeelement(div) { document.getElementById(div).remove(); };

function randomSide() {
    // return 'left';
    // return 'right';
    return sides[Math.floor(Math.random() * 2)];
};

function chooseRandomWeapon() {
    return weaponsObjects[weaponNames[Math.floor(Math.random() * weaponNames.length)]];
};

var championName = urlParams.get('championName');
if (championName === null) {
    championName = "King";
};
var hillName = urlParams.get('hillName');
if (hillName === null) {
    hillName = "Hill";
};

var battleGround = `${championName} of the ${hillName}`;

var wsPort = urlParams.get('wsPort');
if (wsPort === null) {
    wsPort = 8080;
};


var server = urlParams.get('server');
if (!(server === null)) {
    server = `ws://${server}:${wsPort}/`;
} else {
    server = `ws://localhost:${wsPort}/`;
};

var testing = urlParams.get('testing');
if ((testing != null) & (testing != 'false')) {
    testing = true;
} else {
    testing = false;
};

// deepcode ignore MissingClose: websocket is closed.
var ws = new WebSocket(server);
const botID = "123";
var weaponnumber = 0;
var lowerMessage;
var noJoinMessage = `No one joined, so no new ${battleGround}!`;
var winnerMessage = `is the new ${battleGround}`;
var preupdateMessage = "";
var updateMessage = `seconds left to join the fight! Type ${joinCommand} to see if you can take the title of ${battleGround}!`;
// Ending message set at end of code.
var battleActive = false;

// Alternate endings.
var altEndingMessages = [
    // `This Is Your Life, and It's Ending One Minute at a Time`
];

function notify(message) {
    console.log(message);
    ws.send(JSON.stringify(
        {
            "request": "DoAction",
            "action": {
                "name": "FightMessage"
            },
            "args": {
                "rawInput": message
            },
            "id": botID
        }));
};

function setWinner(message) {
    ws.send(JSON.stringify(
        {
            "request": "DoAction",
            "action": {
                "name": "SetFightReward"
            },
            "args": {
                "rawInput": message

            },
            "id": botID
        }));
};

function connectws() {
    //check options - if we have first words:
    ws.onopen = function () {
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
        var updateMessageRegex = new RegExp(`${updateMessage.toLowerCase()}|${endingMessage.toLowerCase()}|${noJoinMessage.toLowerCase()}`, "i");

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
        }
    }
};

function usersWeapon(lowerMessage) {
    var choosenWeapon = null;
    var weapon;

    for (let i = 0; i < weaponNames.length; i++) {
        weapon = weaponsObjects[weaponNames[i]]
        if (weapon.regex.exec(lowerMessage) != null) {
            choosenWeapon = weapon
        }
    }
    if (choosenWeapon === null) {
        choosenWeapon = chooseRandomWeapon();
    }

    if (choosenWeapon.name == 'the thong') {
        if (Randomizer(0, gstringProb) == 69) { // tehe
            return gstring;
        };
    };
    return choosenWeapon;
}

function addFighter(user, lowerMessage) {
    var username = user.toLowerCase();
    // console.log("starting xmlhttp");
    var xhttp = new XMLHttpRequest();
    // console.log("created xmlhttp object");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // get display image for the user
            // console.log("got a response back");
            //save this to cache between sessions too.
            //check for user being added already (or if already dead and ignore)
            var addToFight = true;
            if (battleActive) {
                if (!testing) {
                    for (let i = 0; i < divnumber; i++) {
                        checkUser = document.getElementById(i).getAttribute("user");
                        if ((user == checkUser)) {
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

                Div.setAttribute("weapon", `${weapon['tense 1']} ${weapon.name}`)
                Div.innerHTML = `<img style='${weapon[side]}' src='static/images/${weapon.file}'/>`;

                switch (side) {
                    case 'left':
                        // left - TweenLite.set(Div, { className: 'lurking-element', x: -600, y: Randomizer(0, innerHeight-600 ), z:0 });
                        TweenLite.set(Div, { className: 'falling-element', x: -75, y: innerHeight - 113, z: 0 });
                        fighter_animation_left(Div);
                        break;
                    default:
                        TweenLite.set(Div, { className: 'falling-element', x: innerWidth, y: innerHeight - 110, z: 0 });
                        fighter_animation_right(Div);
                        break;
                }
                warp.appendChild(Div);

                // Run animation
                setTimeout(removeelement, removalTimeoutTime, Div.id);
            }
        }
    };
    xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
    xhttp.send();
};

function fighter_animation_left(element) {
    TweenMax.to(element, 0.1, { scale: 1.5 });
    TweenMax.to(element, 2, { x: (innerWidth / 2) - 45, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 0.9, { y: (innerHeight - 200), yoyo: true, repeat: 0, ease: Power2.easeIn, delay: 0 });
    TweenMax.to(element, 0.6, { y: (innerHeight - (300 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .9 });
    TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
};

function fighter_animation_right(element) {
    TweenMax.to(element, 0.1, { scale: 1.5 });
    TweenMax.to(element, 2, { x: (innerWidth / 2) - 45, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 0.9, { y: (innerHeight - 200), yoyo: true, repeat: 0, ease: Power2.easeIn, delay: 0 });
    TweenMax.to(element, 0.6, { y: (innerHeight - (300 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .9 });
    TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
    //TweenMax.to(element, 0.75, { y: (innerHeight - (150 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .75 });
    //TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
};

function randomWeapon() {
    var warp = document.getElementById("confetti-container"),
        innerWidth = window.innerWidth,
        innerHeight = window.innerHeight;

    // Load into page
    var Div = document.createElement('div');
    Div.id = "weapon" + weaponnumber;
    weaponnumber++;
    var weapon = chooseRandomWeapon();
    Div.style.background = `url("static/images/${weapon.file}")`;

    Div.style.backgroundSize = '100% 100%';
    TweenLite.set(Div, { className: 'falling-element', x: innerWidth / 2, y: innerHeight - 150, z: 100 });
    warp.appendChild(Div);

    var side = randomSide();
    TweenMax.to(Div, 0.01, { scale: 1.5 });
    if (side === 'left') {
        TweenMax.to(Div, 7, { x: (innerWidth * 2), rotationZ: 180, repeat: 0, delay: 0 });
        //TweenMax.to(Div, 1, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, repeat: 0, delay: 0 });
        //TweenMax.to(Div, 1.5, { y: '+=200', repeat: 0,  ease: Power2.easeIn, delay: 1.2 });
        TweenMax.to(Div, 2, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, ease: Back.easeOut, repeat: 0, delay: 0 });
    } else {
        TweenMax.to(Div, 7, { x: -(innerWidth * 2), rotationZ: -180, repeat: 0, delay: 0 });
        //TweenMax.to(Div, 1, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, repeat: 0,delay: 0 });
        //TweenMax.to(Div, 1.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeOut, delay: 2 });
        //TweenMax.to(Div, 1.5, { y: '+=200', repeat: 0,  ease: Power2.easeIn, delay: 1.2 });
        TweenMax.to(Div, 2, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, ease: Back.easeOut, repeat: 0, delay: 0 });
    }
    setTimeout(`removeelement(${Div.id})`, removalTimeoutTime);
};

function loseSound() {
    var yeetNumber = Math.floor(Math.random() * 14) + 1;
    playSound(`yeet${yeetNumber}.mp3`, 0.4);
};

function yeet(id) {
    let element = document.getElementById(id);
    let x = Randomizer(innerWidth * 2, innerWidth * 5);
    var random = Math.floor(Math.random() * 2) + 1;
    var rotZ = 180;
    switch (random) {
        case 1:
            rotZ = -180;
            x = x * -1;
            break;
        default:
            break;
    };
    TweenMax.to(element, 4, { x: x, y: -700, rotationZ: rotZ, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 1.5, { y: '-=500', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    loseSound();
};

function rigged(element) {
    // Set Rigged text middle of portrait, Have weapon set.
    element.innerHTML = element.innerHTML + "<h1 id='rigged' class='rigged'>#RIGGED</h1>";
    let riggedTitle = document.getElementById('rigged');
    TweenMax.set(element, { transformOrigin: "50% 100%" });
    TweenMax.to(element, 1, { scale: 5 });
    TweenMax.to(element, 0.1, { x: '-=20', repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 3, { y: '-=207', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 }); // -=207
    TweenMax.to(riggedTitle, 0.1, { x: '-=40', repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(riggedTitle, 1, { y: '-=50', repeat: 0, ease: Sine.easeInOut, delay: 2 });
    TweenMax.to(element, 3, { y: '+=1200', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 10 });
    element.style.z = "-1000";
    riggedTitle.style.z = "-1000";
}

function winnerTime(id, winnerNotification) {
    console.log('winnerTime')
    console.log(id)
    playSound('horn.mp3', 0.4)
    // Play Sound and notify winner 
    setTimeout(playSound, 1500, 'cheer.mp3', 0.3)
    setTimeout(notify, 1000, winnerNotification)

    let element = document.getElementById(id);
    var user = element.getAttribute("user");
    if (riggedUsers.includes(user)) {
        rigged(element);
    } else {
        TweenMax.set(element, { transformOrigin: "50% 100%" });
        TweenMax.to(element, 1, { scale: 2.5 });
        TweenMax.to(element, 0.1, { x: '-=20', repeat: 0, ease: Sine.easeInOut, delay: 0 });
        TweenMax.to(element, 3, { y: '-=207', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
        TweenMax.to(element, 3, { y: '+=831', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 10 });
        element.style.z = "-1000";
    };
};

function startFight() {
    console.log('Start Fight')
    battleActive = false;
    // deepcode ignore MissingClose: added close to end of onopen.
    ws = new WebSocket(server);
    ws.onopen = function () {
        console.log('Start Fight: onopen')
        winner = Math.floor(Math.random() * divnumber);
        var winnerNotification;
        if (divnumber == 0) {
            // **** No users here - need to handle ****
            // file deepcode ignore UsageOfUndefinedReturnValue: Not an issue.
            // deepcode ignore CodeInjection: No code injection possible here.
            setTimeout(notify(noJoinMessage), 10000);
        } else {
            console.log('Start Fight: onopen - is winner')
            var user = document.getElementById(winner).getAttribute("user");
            var winweapon = document.getElementById(winner).getAttribute("weapon");
            if (winweapon === null) {
                winnerNotification = `${user} ${winnerMessage}`;
            } else {
                winnerNotification = `${user} ${winnerMessage}, using ${winweapon}.`;
            }
            var yeetUser;
            var yeetTime;
            var yeetId;
            var numbers = new Array(divnumber);
            // console.log(numbers)
            for (let i = 0; i < divnumber; i++) {
                numbers[i] = i;
            };
            numbers.sort(() => Math.random() - 0.5);

            for (let i = 0; i < divnumber; i++) {
                if (numbers[i] != (winner)) {
                    yeetUser = document.getElementById(numbers[i]);
                    yeetTime = (i * 10000) / divnumber;
                    yeetId = numbers[i]
                    setTimeout(yeet, yeetTime, yeetId);
                    console.log(`yeeting ID (${i}): ${yeetUser.getAttribute("user")}`);
                }
            }
            setTimeout(changeVolume, 0, 0, 0.1, 2500)
            setTimeout(changeVolume, 10000, 0, 0, 2500)
            setTimeout(winnerTime, 12500, winner, winnerNotification);
            setTimeout(setWinner, 17000, user);
            // deepcode ignore CodeInjection: Code Injection is not possible.
            setTimeout(ws.close, 25000)
        }
    };
};

function playSound(filename, volume = 0.4) {
    audio[soundplay] = new Audio(`static/sound/${filename}`);
    audio[soundplay].volume = volume;
    if (filename === 'battle.mp3') {
        audio[soundplay].loop = true;
    }
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    } else {
        soundplay++;
    }
};

function setVolume(localSound, localdiff) {
    localSound.volume += localdiff;
    localSound.play();
}

function changeVolume(audioID, newVolume, timeSpan) {
    let sections = 10;
    let localSplit = timeSpan / sections;
    let currentVolume = audio[audioID].volume;
    let diff = (newVolume - currentVolume) / sections;
    for (let i = 0; i < sections; i++) {
        setTimeout(setVolume, localSplit * i, audio[audioID], diff);
    }
}

function stopAllSound() {
    for (let i = 0; i < audio.length; i++) {
        let sound = audio[i]
        try {
            sound.volume = 0.2;
            sound.pause();
            sound = null;
        } catch { }
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

function addTestingPeople(totalGameLength, numberPeople = 10) {
    var testingPeople = ['Ozy_Viking', 'JDPlays', 'the_rubble', 'Naval_Warlord']
    function randomPlayer() {
        return testingPeople[Math.floor(Math.random() * testingPeople.length)]
    }
    for (let i = 0; i < numberPeople; i++) {
        let randomdelay = (totalGameLength * Math.random()) * 1000;
        setTimeout(addFighter, randomdelay, randomPlayer(), chooseRandomWeapon().command[0]);
    };
}

var split = gameLength / 12;
function gameLengthSplit(m = 1, c = 0, floor = false) {
    let length = m * split + c
    if (floor) {
        length = Math.floor(length)
    }
    return length
}


function randomWeaponSetup() {
    var randomWeaponSplit = 2000;
    for (let i = 0; i < 60; i++) {
        let randomdelay = 3500 + (i * randomWeaponSplit) + Math.floor(Math.random() * 500) + 1;
        if (randomdelay <= (gameLength + 1) * 1000) {
            setTimeout(randomWeapon, randomdelay);
        };
    };
}
var endingMessage = generateEndingMessage();

function hillDecay() {
    // BUG: Not selecting the hill image.
    let hill = document.getElementById("grassyhill_id");
    console.log(hill)
    hill.style.animation = `hillanimation ${gameLength + 28}s`
}

//Main function
function main() {
    connectws();
    hillDecay();
    if (testing) { setTimeout(addTestingPeople, 1000, gameLength, gameLength / 2) }
    battleActive = true
    setTimeout(playSound, 900, 'battle.mp3', 0.2);
    setTimeout(notify, gameLengthSplit(0, 1) * 1000, `${gameLengthSplit(12, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-9, 1 + gameLength) * 1000, `${gameLengthSplit(9, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-6, 1 + gameLength) * 1000, `${gameLengthSplit(6, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-3, 1 + gameLength) * 1000, `${gameLengthSplit(3, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-2, 1 + gameLength) * 1000, `${gameLengthSplit(2, 0, true)} ${updateMessage}!`);
    setTimeout(notify, gameLengthSplit(-1, 1 + gameLength) * 1000, `${gameLengthSplit(1, 0, true)} ${updateMessage}!`);
    setTimeout(notify, (gameLength + 1) * 1000, endingMessage);
    setTimeout('battleActive = false', (gameLength + 1) * 1000);
    // deepcode ignore CodeInjection: No code inject 
    setTimeout(ws.close, (gameLength + 1) * 1000);
    setTimeout(startFight, (gameLength + 2) * 1000);

    randomWeaponSetup();
};

main();

