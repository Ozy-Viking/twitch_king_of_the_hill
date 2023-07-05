// Inspired as a birthday gift for Ostrogothia (https://twitch.tv/Ostrogothia)
// Check out the awesome pillow fight version on her stream!
// This game uses these sounds from freesound.org:
//   Battle sounds mixed from:
//     https://freesound.org/people/madmanmusic/sounds/347981/
//     https://freesound.org/people/freefire66/sounds/175950/
//     https://freesound.org/people/klavo1985/sounds/349382/
//   War horn from:
//     https://freesound.org/people/DeVern/sounds/512490/
//   Yeet sounds from:
//     https://freesound.org/people/unfa/sounds/588557/
//     https://freesound.org/people/Alivvie/sounds/555627/
//     https://freesound.org/people/hisoul/sounds/520275/
//     https://freesound.org/people/hisoul/sounds/520268/
//   Cheer from:
//      https://freesound.org/people/BeeProductive/sounds/430046/
//
//  Credit to: https://vrflad.com/champion

var language;
var port = 8080;
var maxemotes = 20;
var divnumber = 0;
var winner = 0;
var audio = [];
var soundplay = 0;
var weaponTransform = {
    'teapot': {'file': 'teapot.png', 'left': 'transform: rotate(45deg) translate(30px,-30px)', 'right': 'transform: rotate(-45deg) translate(-30px,-30px)'}, 
    'number 1 fan finger': {'file': 'no1.png', 'left': 'transform: rotate(45deg) translate(35px,-50px)', 'right': 'transform: rotate(-45deg) translate(-35px,-50px)'}, 
    'plunger':{'file': 'plunger.png', 'left': 'transform: rotate(10deg) translate(55px,-20px)','right': 'transform: rotate(-10deg) translate(-55px,-20px)'},
    'doughnut': {'file': 'doughnut.png', 'left': 'transform: rotate(30deg) translate(10px,-60px)', 'right': 'transform: rotate(-30deg) translate(-10px,-60px)'},
    'thong':{'file': 'thong.png', 'left': 'transform: rotate(30deg) translate(10px,-60px)', 'right': 'transform: rotate(-30deg) translate(-10px,-60px)'},
    'giant match': {'file': 'match.png', 'left': 'transform: rotate(30deg) translate(40px,-20px)', 'right': 'transform: rotate(-30deg) translate(-40px,-20px)'},
    'frying pan': {'file': 'pan.png', 'left': 'transform: rotate(0deg) translate(60px,-10px)', 'right': 'transform: rotate(0deg) translate(-60px,-10px)'}
}
var weapons = Object.keys(weaponTransform)

const urlParams = new URLSearchParams(window.location.search);

var championName = urlParams.get('championName');
if (championName === null) {
    championName = "King";
}
var hillName = urlParams.get('hillName');
if (hillName === null) {
    hillName = "Hill";
}

var battleGround = `${championName} of the ${hillName}`;

var server = urlParams.get('server');
if (!(server === null)) {
    server = `ws://${server}/`;
}
else {
    server = `ws://localhost:${port}/`;
}
var ws = new WebSocket(server);
var weaponnumber = 0;


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

                    var lowermessage = wsdata.data.message.message.toLowerCase();

                    if (lowermessage.startsWith("!join")) {
                        addFighter(wsdata.data.message.displayName);
                    };
                }
            }
        }
    }
}

function addFighter(user) {
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
                }
            }

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
                Div.style.background = 'url(' + xhttp.responseText + ')';
                Div.style.backgroundSize = '100% 100%';
                var randomSide = Math.floor(Math.random() * 2) + 1;
                var randomWeapon = Math.floor(Math.random() * length(weapons));
                let weapon = weapons[randomWeapon];
                              
                                
                Div.setAttribute("weapon", weapon)
                Div.innerHTML = `<img style=${weaponTransform[weapon]} src='static/images/${weapon.file}'/>`;

                switch (randomSide) {
                    case 1:
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

                setTimeout(`removeelement(${Div.id})`, 120000);
            }

        }
    };
    xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
    xhttp.send();

}

function fighter_animation_left(element) {
    TweenMax.to(element, 0.1, { scale: 1.5 });
    TweenMax.to(element, 2, { x: (innerWidth / 2) - 45, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 0.9, { y: (innerHeight - 200), yoyo: true, repeat: 0, ease: Power2.easeIn, delay: 0 });
    TweenMax.to(element, 0.6, { y: (innerHeight - (300 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .9 });
    TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });

}
function fighter_animation_right(element) {
    TweenMax.to(element, 0.1, { scale: 1.5 });
    TweenMax.to(element, 2, { x: (innerWidth / 2) - 45, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 0.9, { y: (innerHeight - 200), yoyo: true, repeat: 0, ease: Power2.easeIn, delay: 0 });
    TweenMax.to(element, 0.6, { y: (innerHeight - (300 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .9 });
    TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
    //TweenMax.to(element, 0.75, { y: (innerHeight - (150 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .75 });
    //TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
}

function randomWeapon() {
    var warp = document.getElementById("confetti-container"),
        innerWidth = window.innerWidth,
        innerHeight = window.innerHeight;

    // Load into page

    var Div = document.createElement('div');
    Div.id = "weapon" + weaponnumber;
    weaponnumber++;
    var random = Math.floor(Math.random() * length(weapons)) + 1;
    switch (random) {
        case 1:
            Div.style.background = 'url("static/images/Weapon1.png")';
            break;
        case 2:
            Div.style.background = 'url("static/images/Weapon2.png")';
            break;
        case 3:
            Div.style.background = 'url("static/images/Weapon3.png")';
            break;
        case 4:
            Div.style.background = 'url("static/images/Weapon4.png")';
            break;
        case 5:
            Div.style.background = 'url("static/images/Weapon5.png")';
            break;
        case 6:
            Div.style.background = 'url("static/images/Weapon6.png")';
            break;
        default:
            Div.style.background = 'url("static/images/Weapon7.png")';

            break;
    }
    Div.style.backgroundSize = '100% 100%';



    TweenLite.set(Div, { className: 'falling-element', x: innerWidth / 2, y: innerHeight - 150, z: 100 });
    warp.appendChild(Div);
    var random = Math.floor(Math.random() * 2) + 1;
    TweenMax.to(Div, 0.01, { scale: 1.5 });
    if (random == 1) {
        TweenMax.to(Div, 7, { x: (innerWidth * 2), rotationZ: 180, repeat: 0, delay: 0 });
        //TweenMax.to(Div, 1, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, repeat: 0, delay: 0 });
        //TweenMax.to(Div, 1.5, { y: '+=200', repeat: 0,  ease: Power2.easeIn, delay: 1.2 });
        TweenMax.to(Div, 2, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, ease: Back.easeOut, repeat: 0, delay: 0 });
    }
    else {
        TweenMax.to(Div, 7, { x: -(innerWidth * 2), rotationZ: -180, repeat: 0, delay: 0 });
        //TweenMax.to(Div, 1, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, repeat: 0,delay: 0 });
        //TweenMax.to(Div, 1.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeOut, delay: 2 });
        //TweenMax.to(Div, 1.5, { y: '+=200', repeat: 0,  ease: Power2.easeIn, delay: 1.2 });
        TweenMax.to(Div, 2, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, ease: Back.easeOut, repeat: 0, delay: 0 });
    }
    setTimeout(`removeelement(${Div.id})`, 120000);
}

function loseSound() {
    var yeetNumber = Math.floor(Math.random() * 14) + 1;
    var losesound;

    audio[soundplay] = new Audio(`static/sound/yeet${yeetNumber}.mp3`);
    audio[soundplay].volume = 0.4;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    }
    else {
        soundplay++;
    }
}

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
    }
    TweenMax.to(element, 4, { x: x, y: -700, rotationZ: rotZ, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 1.5, { y: '-=500', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    loseSound();
}

function winnerTime(id) {
    audio[soundplay] = new Audio('static/sound/cheer.mp3');
    audio[soundplay].volume = 0.4;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    }
    else {
        soundplay++;
    }
    element = document.getElementById(id);
    var user = element.getAttribute("user");
    TweenMax.set(element, { transformOrigin: "50% 100%" });
    TweenMax.to(element, 1, { scale: 2.5 });
    TweenMax.to(element, 0.1, { x: '-=40', repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 3, { y: '-=231', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 3, { y: '+=831', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 10 });
    element.style.z = "-1000";
}

function removeelement(div) {
    document.getElementById(div).remove();
}

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
}

function startFight() {
    ws = new WebSocket(server);
    ws.onopen = function () {
        winner = Math.floor(Math.random() * divnumber) + 1;
        var message = noJoinMessage;
        if (divnumber == 0) {
            // **** No users here - need to handle ****
            setTimeout(notify(message), 10000);
        }
        else {
            var user = document.getElementById((winner - 1)).getAttribute("user");
            var winweapon = document.getElementById((winner - 1)).getAttribute("weapon");
            if (winweapon === null) {
                message = `notify('${user} ${winnerMessage}');`;
            }
            else {
                message = `notify('${user} ${winnerMessage}, using the ${winweapon}.');`;

            }
            setTimeout(message, 16000);
            var yeetUser;
            var yeetTime;
            var yeetId;
            var numbers = new Array(divnumber);

            for (i = 0; i < divnumber; i = i + 1) {
                numbers[i] = i;
            }
            numbers.sort(() => Math.random() - 0.5);

            for (let i = 0; i < divnumber; i++) {
                if (numbers[i] != (winner - 1)) {
                    yeetUser = document.getElementById(numbers[i]);
                    yeetTime = (i * 10000) / divnumber;
                    yeetId = `yeet('${numbers[i]}')`
                    setTimeout(yeetId, yeetTime);
                    console.log(`yeeting ID (${i}): ${yeetUser.getAttribute("user")}`);
                }
            }
            var winnerCommand = `winnerTime(${winner - 1})`;
            setTimeout(winnerCommand, 12500);
            var rewardCommand = `setWinner('${user}')`;
            setTimeout(rewardCommand, 17000);

        }
    }
}

function notify(message) {
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
}

//alert("sending this to streamer bot: " + message);

// Randomizer
function Randomizer(min, max) { return min + Math.random() * (max - min); }

function battleSound() {
    audio[soundplay] = new Audio("static/sound/battle.mp3");

    audio[soundplay].volume = 0.2;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    }
    else {
        soundplay++;
    }
}
function hornSound() {
    audio[soundplay] = new Audio("static/sound/horn.mp3");

    audio[soundplay].volume = 0.4;
    audio[soundplay].play();
    if (soundplay > 9) {
        soundplay = 0;
    }
    else {
        soundplay++;
    }
}

//Main function

var noJoinMessage = `No one joined, so no new ${battleGround}!`;
var winnerMessage = ` is the new ${battleGround}`;
var preupdateMessage = "";
var updateMessage = `seconds left to join the fight! Type !join to see if you can take the title of ${battleGround}!`;
var endingMessage = `The fight is coming to an end! No more people, stay back, stay back. Was that a flying thong!?!`;

connectws();

setTimeout(`notify("60 ${updateMessage}!")`, 1000);
setTimeout(`notify("45 ${updateMessage}!")`, 16000);
setTimeout(`notify("30 ${updateMessage}!")`, 31000);
setTimeout(`notify("15 ${updateMessage}!")`, 46000);
setTimeout(`notify("10 ${updateMessage}!")`, 51000)
setTimeout(`notify("5 ${updateMessage}!")`, 56000);
setTimeout(`notify("${endingMessage}")`, 61000);
setTimeout('ws.close()', 61000);
setTimeout('startFight()', 62000);
setTimeout('hornSound()', 73000);
setTimeout("battleSound()", 900);
var randomdelay;
for (let i = 0; i < 28; i++) {
    randomdelay = 3500 + (i * 2000) + Math.floor(Math.random() * 500) + 1;
    setTimeout("randomWeapon()", randomdelay);
}
