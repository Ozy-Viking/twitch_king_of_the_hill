// import { winnerMessage } from "./koth.js"
import { weaponObjects, weaponNames, weaponCount } from "./weapons.js"
import { Randomizer, modifyStyleSheet } from "./util.js";
var testingUser = "Ozy_Viking";

const urlParams = new URLSearchParams(window.location.search);
var championName = urlParams.get('championName');
if (championName === null) {
    championName = "King";
};
var hillName = urlParams.get('hillName');
if (hillName === null) {
    hillName = "Hill";
};
var battleGround = `${championName} of the ${hillName}`;
var winnerMessage = `is the new ${battleGround}`;
var activeHill = null;

var divnumber = 0;
var weaponName = urlParams.get("weapon")
if (weaponName == null) {
    weaponName = weaponNames[weaponCount - 1]
}
var weapon = weaponObjects[weaponName]

var side = urlParams.get("side")

function usersWeapon(choosenWeapon) {
    if (weapon) {
        return weapon
    }
    return weaponObjects[choosenWeapon];
}
// function Randomizer(min, max) { return min + Math.floor(Math.random() * (max - min)); };

var sides = ['left', 'right'];
function randomSide() {
    if (side) { return side }
    return sides[Math.floor(Math.random() * 2)];
};

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
            var warp = document.getElementById("confetti-container"),
                innerWidth = window.innerWidth,
                innerHeight = window.innerHeight;

            // Load into page
            var Div = document.createElement('div');
            Div.id = divnumber;
            Div.setAttribute("user", user);
            Div.setAttribute("state", "alive");
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
                    fighter_animation(Div);
                    break;
                default:
                    TweenLite.set(Div, { className: 'falling-element', x: innerWidth, y: innerHeight - 110, z: 0 });
                    fighter_animation(Div);
                    break;
            }
            warp.appendChild(Div);

            // Run animation
            // setTimeout(removeelement, removalTimeoutTime, Div.id);

        }
    };
    xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
    xhttp.send();
};

function fighter_animation(element) {
    TweenMax.to(element, 0.1, { scale: 1.5 });
    TweenMax.to(element, 2, { x: (innerWidth / 2) - 45, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 0.9, { y: (innerHeight - 200), yoyo: true, repeat: 0, ease: Power2.easeIn, delay: 0 });
    TweenMax.to(element, 0.6, { y: (innerHeight - (300 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .9 });
    TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
};

function winnerNotification(user = testingUser, winweapon = weapon, winMessage = winnerMessage) {
    console.log(winweapon)
    return `${user} ${winMessage}, using ${winweapon["tense 1"]} ${winweapon.name}.`
}

function removeElement(ID) { document.getElementById(ID).remove(); };

function weaponTest(annimationSide = null, inputWeapon = null) {
    try {
        while (document.getElementById(0)) {
            removeElement(divnumber);
        }
    } catch { }
    if (annimationSide) {
        side = annimationSide
    }
    if (inputWeapon) {
        weapon = weaponObjects[inputWeapon]
    }
    addFighter(testingUser, weapon);
    document.getElementById("winnerNotification").innerText = winnerNotification()
}

function hill(hillID = null) {
    if (activeHill) {
        modifyStyleSheet(`#${activeHill}`, "opacity", 0)
    }
    activeHill = hillID;
    if (!hillID) {
        return
    } else {
        modifyStyleSheet(`#${activeHill}`, "opacity", 1)
    }
}

function winnerTime(id, winnerNotification) {
    console.log('winnerTime')
    console.log(id)
    // playSound('horn.mp3', 0.4)
    // Play Sound and notify winner 
    // setTimeout(playSound, 1500, 'cheer.mp3', 0.3)
    // setTimeout(changeVolume, 24000, soundplay - 1, 0, 2000, 20)
    // setTimeout(notify, 1000, winnerNotification)

    let element = document.getElementById(id);
    // var user = element.getAttribute("user");
    // if (riggedUsers.includes(user)) {
    //     rigged(element);
    // } else {
    TweenMax.set(element, { transformOrigin: "50% 100%" });
    TweenMax.to(element, 1, { scale: 2.5 });
    TweenMax.to(element, 0.1, { x: '-=20', repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 3, { y: '-=207', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 3, { y: '+=831', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 10 });
    element.style.z = "-1000";
    // };
};

function addButtons() {
    const buttonDiv = document.getElementById("buttonDiv")
    const sideButtonDiv = document.getElementById("sideButtonDiv")
    const hillButtonDiv = document.getElementById("hillButtonDiv")
    weaponNames.forEach(name => {
        var btn = document.createElement('button');
        btn.id = name;
        btn.onclick = () => { weaponTest(side, name) }
        btn.innerText = name;
        buttonDiv.appendChild(btn);
    })
    sides.forEach(element => {
        var btn = document.createElement('button');
        btn.id = element;
        btn.onclick = () => { weaponTest(element) }
        btn.innerText = element;
        sideButtonDiv.appendChild(btn);
    });
    var inputBox = document.createElement('input')
    inputBox.id = "testing_user";
    inputBox.setAttribute("autofocus", true)
    inputBox.placeholder = "Ozy_Viking"
    inputBox.title = "Twitch Username (press 'enter' to use username)"
    inputBox.addEventListener('keyup', function onEvent(e) {
        if (e.key == "Enter") {
            if (e.target.value) {
                console.log(e.target.value)
                testingUser = e.target.value
            }
            weaponTest()
        }
    });
    sideButtonDiv.appendChild(inputBox);
    

    ["grassyhill_1", "grassyhill_2", "grassyhill_3"].forEach(hillName => {
        var btn = document.createElement('button');
        // btn.id = hillName;
        btn.onclick = () => { hill(hillName) }
        btn.innerText = hillName;
        hillButtonDiv.appendChild(btn);
    })
    var btn = document.createElement('button');
    btn.id = 'winnerTest';
    btn.onclick = () => { winnerTime(0, winnerNotification()) }
    btn.innerText = 'Winner';
    sideButtonDiv.appendChild(btn);

    var btn = document.createElement('button');
    btn.id = "nullHill";
    btn.onclick = () => { hill() }
    btn.innerText = "No Hill";
    hillButtonDiv.appendChild(btn);
}
// http://localhost:28080/?testing&gameLength=%gameLength%&gameLength=%gameLength%&joinCommand=%joinCMD%&wsPort=29080&gstringProb=%gstringProb%
addButtons()
weaponTest()