// Script for King of the Hill

var joinCommand = 'fight';

var weaponsObjects = {
    'the teapot': {
        'file': 'teapot.png',
        'left': 'transform: rotate(45deg) translate(30px,-30px)',
        'right': 'transform: rotate(-45deg) translate(-30px,-30px)',
        'command': ['teapot', 'tea', 'pot']
    },
    'the number 1 fan finger': {
        'file': 'no1.png',
        'left': 'transform: rotate(45deg) translate(35px,-50px)',
        'right': 'transform: rotate(-45deg) translate(-35px,-50px)',
        'command': ['1', 'one', 'num', 'finger']
    },
    'the plunger': {
        'file': 'plunger.png',
        'left': 'transform: rotate(10deg) translate(55px,-20px)',
        'right': 'transform: rotate(-10deg) translate(-55px,-20px) scaleX(-1)',
        'command': ['plunger', 'dunny', 'toilet']
    },
    'the doughnut': {
        'file': 'doughnut.png',
        'left': 'transform: rotate(30deg) translate(10px,-60px)',
        'right': 'transform: rotate(-30deg) translate(-10px,-60px)',
        'command': ['doughnut', 'donut', 'nut']
    },
    'the thong': {
        'file': 'thong.png',
        'left': 'transform: rotate(30deg) translate(10px,-60px);',
        'right': 'transform: rotate(-30deg) translate(-10px,-60px);',
        'command': ['thong', 'flip flop', 'formal thong', 'safety boot']
    },
    'the giant match': {
        'file': 'match.png',
        'left': 'transform: rotate(30deg) translate(40px,-20px)',
        'right': 'transform: rotate(-30deg) translate(-40px,-20px)',
        'command': ['fire', 'match', 'aussie summer']
    },
    'the frying pan': {
        'file': 'pan.png',
        'left': 'transform: rotate(0deg) translate(60px,-10px)',
        'right': 'transform: rotate(0deg) translate(-60px,-10px) scaleX(-1)',
        'command': ['pan', 'hot flat', 'pancake maker', 'skillet', 'iron']
    },
    'a murdered name':{
        'file': 'Name_Butcher_4000.png',
        'left': 'transform: rotate(10deg) translate(-30px,30px); width: 50px;', //'transform: rotate(-10deg) translate(50px,25px) scaleX(-1); width: 50px;',
        'right': 'transform: rotate(10deg) translate(-30px,30px); width: 50px;',
        'command': ['name', 'murder', 'kill']
    },
    'the boomerang':{
        'file': 'Boomerang.png',
        'left': 'transform: rotate(-10deg) translate(60px,-10px); width: 50px;',
        'right': 'transform: rotate(-10deg) translate(-40px,-10px) scaleX(-1); width: 50px;',
        'command': ['boom', 'rang']
    },
    'the didgerodoo': {
        'file': 'Didgerodoo.png',
        'left': 'transform: rotate(250deg) translate(-25px,35px)',
        'right': 'transform: rotate(10deg) translate(-35px,25px)',
        'command': ['didgerodoo', 'pipe', 'wind', 'doo']
    },
    'the sausage sanga':{
        'file': 'sausage_sanga.png',
        'left': 'transform: rotate(0deg) translate(50px,20px); width: 50px;',
        'right': 'transform: rotate(0deg) translate(-30px,20px) scaleX(-1); width: 50px;',
        'command': ['sausage', 'sandwich', 'sanga', 'snag', 'bunning']
    },
};

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams)
var gstringProb = Number(urlParams.get('gstringProb'));
if (gameLength === null) {
    gstringProb = 10000;
};

var gstring = {
    'name': "JD's Sexy Thong",
    'file': 'secret_thong.png',
    'left': 'transform: rotate(-30deg) translate(60px,20px);',
    'right': 'transform: rotate(30deg) translate(-35px,10px);',
    'command': ['thong', 'flip flop', 'formal thong', 'safety boot']
};



var gameLength = Number(urlParams.get('gameLength'));
if (gameLength === null) {
    gameLength = 60;
};
gameLength = 60;
var removeTimeoutTime = (gameLength + 30) * 1000;

var riggedUsers = ['Ozy_Viking', 'SassySararr5']; // Todo: Get sassy's username
var divnumber = 0;
var winner = 0;
var audio = [];
var soundplay = 0;

var weaponNames = Object.keys(weaponsObjects);
// adds the name of each weapon for code readabilty
for (let i = 0; i < weaponNames.length; i++) {
    let weapon = weaponsObjects[weaponNames[i]]
    weapon.name = weaponNames[i]
    weapon.regex = new RegExp(pattern = weapon.command.join('|'));
};
console.log(gstring);
console.log(weaponsObjects['thong']);

var sides = ['left', 'right'];

function removeelement(div) {
    document.getElementById(div).remove();
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
    server = `ws://${server}/`;
} else {
    server = `ws://localhost:${wsPort}/`;
};

var ws = new WebSocket(server);
var weaponnumber = 0;
var lowerMessage;

var altEndingMessages = [
    `This Is Your Life, and It's Ending One Minute at a Time`
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
            "id": "123"
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
            "id": "123"
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
                "id": "123"
            }
        ));

        ws.onmessage = function (event) {
            // grab message and parse JSON
            const msg = event.data;
            const wsdata = JSON.parse(msg);

            if (typeof wsdata.data != "undefined") {
                if (typeof wsdata.data.message != "undefined") {
                    var lowerMessage = wsdata.data.message.message.toLowerCase();
                    if (lowerMessage.startsWith(joinCommand)) {
                        addFighter(wsdata.data.message.displayName, lowerMessage);
                    };
                }
            }
        }
    }
};

function randomSide() {
    return sides[Math.floor(Math.random() * 2)];
    // return 'left'
    // return 'right'
};

function chooseRandomWeapon() {
    return weaponsObjects[weaponNames[Math.floor(Math.random() * weaponNames.length)]];
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

    if ( choosenWeapon.name == 'the thong'){
       if ( Randomizer(0, gstringProb) == 69 ){ // tehe
        return gstring;
       };
    };
    return choosenWeapon;
}

function addFighter(user, lowerMessage) {
    var username = user.toLowerCase();
    console.log("starting xmlhttp");
    var xhttp = new XMLHttpRequest();
    console.log("created xmlhttp object");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // get display image for the user
            console.log("got a response back");
            //save this to cache between sessions too.
            //check for user being added already (or if already dead and ignore)
            var addToFight = true;
            for (let i = 0; i < divnumber; i++) {
                checkUser = document.getElementById(i).getAttribute("user");
                if (user == checkUser) {
                    addToFight = false;
                };
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

                Div.setAttribute("weapon", weapon.name)
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
                setTimeout(`removeelement(${Div.id})`, removeTimeoutTime);
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
    setTimeout(`removeelement(${Div.id})`, removeTimeoutTime);
};

function loseSound() {
    var yeetNumber = Math.floor(Math.random() * 14) + 1;

    audio[soundplay] = new Audio(`static/sound/yeet${yeetNumber}.mp3`);
    audio[soundplay].volume = 0.4;
    audio[soundplay].play();

    if (soundplay > 9) {
        soundplay = 0;
    }
    else {
        soundplay++;
    }
};

function yeet(id) {
    element = document.getElementById(id);
    x = Randomizer(innerWidth * 2, innerWidth * 5);
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

function rigged(element){
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

function winnerTime(id) {
    audio[soundplay] = new Audio('static/sound/cheer.mp3');
    audio[soundplay].volume = 0.4;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    } else {
        soundplay++;
    }
    element = document.getElementById(id);
    console.log(element)
    var user = element.getAttribute("user");
    if ( riggedUsers.includes(user) ){
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
    ws = new WebSocket(server);
    ws.onopen = function () {
        winner = Math.floor(Math.random() * divnumber);
        var winnerNotification = noJoinMessage;
        if (divnumber == 0) {
            // **** No users here - need to handle ****
            setTimeout(notify(winnerNotification), 10000);
        } else {
            var user = document.getElementById(winner).getAttribute("user");
            var winweapon = document.getElementById(winner).getAttribute("weapon");
            if (winweapon === null) {
                winnerNotification = `notify('${user} ${winnerMessage}');`;
            } else {
                winnerNotification = `notify('${user} ${winnerMessage}, using ${winweapon}.');`;
            }
            var yeetUser;
            var yeetTime;
            var yeetId;
            var numbers = new Array(divnumber);
            
            for (i = 0; i < divnumber; i++) {
                numbers[i] = i;
            };
            numbers.sort(() => Math.random() - 0.5);
            
            for (let i = 0; i < divnumber; i++) {
                if (numbers[i] != (winner)) {
                    yeetUser = document.getElementById(numbers[i]);
                    yeetTime = (i * 10000) / divnumber;
                    yeetId = `yeet('${numbers[i]}')`
                    setTimeout(yeetId, yeetTime);
                    console.log(`yeeting ID (${i}): ${yeetUser.getAttribute("user")}`);
                }
            }
            setTimeout(`winnerTime(${winner})`, 12500);
            setTimeout(winnerNotification, 13000);
            setTimeout(`setWinner('${user}')`, 17000);
        }
    }
};

// Randomizer
function Randomizer(min, max) { return min + Math.floor(Math.random() * (max - min)); };

function battleSound() {
    audio[soundplay] = new Audio("static/sound/battle.mp3");
    audio[soundplay].volume = 0.2;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    } else {
        soundplay++;
    }
};

function hornSound() {
    audio[soundplay] = new Audio("static/sound/horn.mp3");
    audio[soundplay].volume = 0.4;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    } else {
        soundplay++;
    }
};

function generateEndingMessage() {
    let endingChoice = Randomizer(0, (weaponNames.length + altEndingMessages.length - 1))
    if ( endingChoice < altEndingMessages.length ) {
        return altEndingMessages[0]; //endingChoice - 1];
    } else {
        return `The fight is coming to an end! Get back, Back, no more people. OI!! Who threw ${chooseRandomWeapon().name}!?!`;
    }
};

//Main function

var noJoinMessage = `No one joined, so no new ${battleGround}!`;
var winnerMessage = `is the new ${battleGround}`;
var preupdateMessage = "";
var updateMessage = `seconds left to join the fight! Type ${joinCommand} to see if you can take the title of ${battleGround}!`;
var endingMessage = generateEndingMessage();

connectws();

var split = gameLength / 12;

setTimeout("battleSound()", 900);
setTimeout(`notify("${Math.floor(split*12)} ${updateMessage}!")`, 1000);
// setTimeout(`addFighter('Ozy_Viking', 'thong')`, 1200);
setTimeout(`notify("${Math.floor(split*9)} ${updateMessage}!")`, (gameLength - split * 9 + 1) * 1000);
setTimeout(`notify("${Math.floor(split*6)} ${updateMessage}!")`, (gameLength - split * 6 + 1) * 1000);
setTimeout(`notify("${Math.floor(split*3)} ${updateMessage}!")`, (gameLength - split * 3 + 1) * 1000);
setTimeout(`notify("${Math.floor(split*2)} ${updateMessage}!")`, (gameLength - split * 2 + 1) * 1000)
setTimeout(`notify("${Math.floor(split)} ${updateMessage}!")`, (gameLength - split + 1) * 1000);
setTimeout(`notify("${endingMessage}")`, (gameLength + 1) * 1000); // BUG: Getting undefined i.e. not a vaild ending message. 
setTimeout('ws.close()', (gameLength + 1) * 1000);
setTimeout('startFight()', (gameLength + 2) * 1000);
setTimeout('hornSound()', (gameLength + 3) * 1000);

var randomdelay;
var randomWeaponSplit = 2000;
for (let i = 0; i < 28; i++) {
    randomdelay = 3500 + (i * 2000) + Math.floor(Math.random() * 500) + 1;
    if ( randomdelay <= (gameLength + 1) * 1000 ) {
    setTimeout("randomWeapon()", randomdelay);
    };
};
