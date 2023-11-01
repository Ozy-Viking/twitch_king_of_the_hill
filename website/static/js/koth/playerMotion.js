import { Randomizer, randomSide, removeElement } from "../util.js";
import { modifyStyleSheet } from "../util.js";
import { loseSound } from "./sound.js";

const startTime = 0;
const motionUp1 = 1.5;
const motionUp2 = 1;
const motionDown1 = motionUp2 / 2;
const motionDown2 = 3;
const growDuration = 1;

export const motionUp = motionUp1 + motionUp2;
export const motionDown = motionDown1 + motionDown2;
export const victorsClaimToFameTime = 10;
export const winnerMotionLength = (
    startTime +
    motionUp1 +
    motionUp2 +
    victorsClaimToFameTime +
    motionDown1 +
    motionDown2
);

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const moveLastWinner = "150"
const moveWinner = "35"

function winnerMoveByY(up = true, lastWinner = false) {

    if (up) {
        return lastWinner ? `-=${moveLastWinner}` : `-=${moveWinner}`
    } else {
        return lastWinner ? `+=${moveLastWinner}` : `+=${moveWinner}`
    }
}

export function riggedMotion(element, lastWinner = false) {
    winnerMotion(element, lastWinner, 4, true)
}

export function winnerMotion(element, lastWinner = false, scale = 2.5, rigged = false) {
    let riggedTitle;
    if (rigged) {
        riggedTitle = document.createElement("h1");
        riggedTitle.className = 'rigged'
        riggedTitle.innerText = '#RIGGED'
        element.appendChild(riggedTitle)
    }
    zIndex("-10", startTime * 1000, lastWinner)
    const disp = lastWinner ? document.getElementById("lastWinnerDiv") : document.getElementById("winnerDiv")
    disp.appendChild(element)
    try {
        TweenMax.set(element, { transformOrigin: "50% 100%" });
        TweenLite.set(element, { x: (innerWidth / 2) - 45, y: (innerHeight - 150), scale: 1.5 });
        TweenMax.to(element, growDuration, { scale: scale, delay: startTime });
        // TweenMax.to(element, 0.1, { x: '-=20', repeat: 0, ease: Sine.easeInOut, delay: 0 });
        TweenMax.to(element, motionUp1, { y: '-=220', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: startTime });
        zIndex("50", (motionUp1 + startTime) * 1000, lastWinner)
        if (rigged) {
            TweenMax.to(riggedTitle, 1, { y: '-=50', repeat: 0, ease: Sine.easeInOut, delay: motionUp1 / 2 });
        }
        TweenMax.to(element, motionUp2, { y: winnerMoveByY(false, lastWinner), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: (motionUp1 + startTime) });
    } catch (error) {
        console.error(error)
    }
}

function zIndex(value, delay = 0, lastWinner = false) {
    let divID;
    if (lastWinner) {
        divID = "#lastWinnerDiv"
    } else {
        divID = "#winnerDiv"
    }
    setTimeout(modifyStyleSheet, delay, divID, "z-index", value)
}

export function winnerMotionExit(element, lastWinner = false) {
    try {
        TweenMax.to(element, motionDown1, { y: winnerMoveByY(true, lastWinner), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
        zIndex("-50", motionDown1 * 1000, lastWinner)
        TweenMax.to(element, motionDown2, { y: '+=800', yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: motionDown1 });
    } catch (error) {
        console.error(error)
    }
}


export function fighterAnimation(element) {
    TweenMax.to(element, 0.1, { scale: 1.5 });
    TweenMax.to(element, 2, { x: (innerWidth / 2) - 45, yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0 });
    TweenMax.to(element, 0.9, { y: (innerHeight - 200), yoyo: true, repeat: 0, ease: Power2.easeIn, delay: 0 });
    TweenMax.to(element, 0.6, { y: (innerHeight - (300 + Randomizer(150, 350))), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .9 });
    TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });
};

export function yeet(id) {
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
    setTimeout(removeElement, 4000, element.id)
};

export function randomSideMotion(element, side = null) {
    if (side == null) {
        side = randomSide();
    }
    TweenLite.set(element, { className: 'falling-element', x: innerWidth / 2, y: innerHeight - 150, z: 100 });
    TweenMax.to(element, 0.01, { scale: 1.5 });
    if (side === 'left') {
        TweenMax.to(element, 7, { x: (innerWidth * 2), rotationZ: 180, repeat: 0, delay: 0 });
        //TweenMax.to(element, 1, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, repeat: 0, delay: 0 });
        //TweenMax.to(element, 1.5, { y: '+=200', repeat: 0,  ease: Power2.easeIn, delay: 1.2 });
        TweenMax.to(element, 2, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, ease: Back.easeOut, repeat: 0, delay: 0 });
    } else {
        TweenMax.to(element, 7, { x: -(innerWidth * 2), rotationZ: -180, repeat: 0, delay: 0 });
        //TweenMax.to(element, 1, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, repeat: 0,delay: 0 });
        //TweenMax.to(element, 1.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeOut, delay: 2 });
        //TweenMax.to(element, 1.5, { y: '+=200', repeat: 0,  ease: Power2.easeIn, delay: 1.2 });
        TweenMax.to(element, 2, { y: (innerHeight - (150 + Randomizer(400, 800))), yoyo: true, ease: Back.easeOut, repeat: 0, delay: 0 });
    }
}