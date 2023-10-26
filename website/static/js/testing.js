import { weaponObjects, weaponNames, weaponCount } from "./weapons.js"
const testingUser = "Ozy_Viking";


const urlParams = new URLSearchParams(window.location.search);

var divnumber = 0;
var weapon = urlParams.get("weapon")
if (weapon == null) {
    weapon = weaponNames[weaponCount - 1]
    console.log(weapon)
}

var side = urlParams.get("side")

function usersWeapon(choosenWeapon) {
    if (weapon) {
        return weaponObjects[weapon]
    }
    return weaponObjects[choosenWeapon];
}
function Randomizer(min, max) { return min + Math.floor(Math.random() * (max - min)); };

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


function removeElement(ID) { document.getElementById(ID).remove(); };

function weaponTest(annimationSide = side, inputWeapon = weapon) {
    removeElement(divnumber);
    if (annimationSide) {
        side = annimationSide
    }
    if (inputWeapon) {
        weapon = inputWeapon
    }
    addFighter(testingUser, weapon);
}

function addButtons() {
    const buttonDiv = document.getElementById("buttonDiv")
    const sideButtonDiv = document.getElementById("sideButtonDiv")
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
}

addButtons()


addFighter(testingUser, weapon)