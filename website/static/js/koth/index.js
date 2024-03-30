// Script for King of the Hill
// Maintainer: Ozy-Viking
// Repo: https://github.com/Ozy-Viking/twitch_king_of_the_hill
// Docker Container: ozyviking/twitch-king-of-the-hill
import * as param from "./urlParams.js";
import settings, {
  botID,
  gameLength,
  joinCommand,
  massTesting,
  reset,
  riggedUsers,
  showLastWinner,
  testing,
  winStreak,
} from "./urlParams.js";

import { weaponObjects, chooseRandomWeapon } from "./weapons.js";
// @ts-ignore
import {
  winnerMotion,
  yeet,
  winnerMotionExit,
  victorsClaimToFameTime,
  motionUp,
  randomSideMotion,
} from "./playerMotion.js";
import { modifyStyleSheet, Randomizer, removeElement } from "../util.js";
import { kothTestEvent as testEvent, randomPlayer } from "./test.js";
import {
  playSound,
  changeVolume,
  playBattleSound,
  soundplay,
  stopAllSound,
} from "./sound.js";
import { redirectBrowser } from "../util.js";
import { notify, setWinner } from "./streamerBot.js";
// @ts-ignore
import {
  LastWinner,
  clearWinnerHistory,
  lastWinnerDiv,
  removeLastWinner,
  winStreakHandler,
} from "./lastWinner.js";
import { ws, connectws } from "./websocket.js";
import hill from "./Hill.js";
import {
  delayToCeremony,
  endingMessage,
  fightDelay,
  hillAnimationLength,
  joinCommandRegex,
  noJoinMessage,
  postGameLength,
  totalGameLength,
  totalYeetTime,
  updateMessage,
  updateMessageRegex,
  winnerMessage,
} from "./constants.js";
import User, { UserList, divnumber } from "./user.js";

if (reset) {
  console.warn("Clearing History");
  clearWinnerHistory();
}

// deepcode ignore MissingClose: websocket is closed.
var weaponnumber = 0;
var riggedWinners = [];
let winner;
// Ending message set at end of code.
var battleActive = false;
const usernamesAdded = new Set();

modifyStyleSheet(".grassyhill", "--koth-length", `${totalGameLength}s`);

function userJoining() {
  ws.send(
    JSON.stringify({
      request: "Subscribe",
      events: {
        Twitch: ["ChatMessage"],
      },
      id: botID,
    })
  );

  ws.onmessage = function (event) {
    // grab message and parse JSON
    const msg = event.data;
    const wsdata = JSON.parse(msg);
    if (typeof wsdata.data != "undefined") {
      if (typeof wsdata.data.message != "undefined") {
        let lowerMessage = wsdata.data.message.message.toLowerCase();
        let username = wsdata.data.message.displayName;
        if (canUserJoin(username, lowerMessage)) {
          addFighter(username, lowerMessage);
        }
      }
    }
  };
}

function canUserJoin(username, lowerMessage) {
  if (!battleActive) {
    return false;
  } else if (testing) {
    return true;
  } else if (usernamesAdded.has(username)) {
    return false;
    // deepcode ignore DuplicateIfBody: Seperating out the logic for readability.
  } else if (joinCommandRegex.exec(lowerMessage) == null) {
    return false;
    // deepcode ignore DuplicateIfBody: Seperating out the logic for readability.
  } else if (updateMessageRegex.exec(lowerMessage) != null) {
    return false;
  }
  return true;
}

function addFighter(username, lowerMessage) {
  usernamesAdded.add(username);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var warp = document.getElementById("confetti-container");
      let user = new User(
        divnumber,
        username,
        lowerMessage,
        xhttp.responseText
      );
      // @ts-ignore
      warp.appendChild(user.div);
    }
  };
  xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
  xhttp.send();
}

function randomWeapon() {
  var warp = document.getElementById("confetti-container");
  var Div = document.createElement("div");
  Div.id = "weapon" + weaponnumber;
  weaponnumber++;
  var weapon = chooseRandomWeapon();
  Div.style.background = `url("static/images/${weapon.file}")`;
  Div.style.backgroundSize = "100% 100%";
  // @ts-ignore
  warp.appendChild(Div);
  randomSideMotion(Div);
}

/**
 *
 * @param {User} winner - The user who won.
 */
function winnerTime(winner) {
  playSound("horn.mp3", 0.4);
  // Play Sound and notify winner
  setTimeout(playSound, 1500, "cheer.mp3", 0.3);
  setTimeout(changeVolume, 24000, soundplay - 1, 0, 2000, 20);
  setTimeout(notify, 1000, winner.winMessage());

  let element = winner.getDiv();
  // @ts-ignore
  let rigged = riggedUsers.includes(winner.username);
  if (winStreak) {
    setTimeout(winStreakHandler, 2000, winner.username);
  }
  // @ts-ignore
  new LastWinner(
    winner.username,
    winner.weapon.name,
    winner.side,
    winner.rigged
  ).save();

  if (rigged) {
    winnerMotion(element, false, 4, true);
  } else {
    winnerMotion(element, false, 2.5, false);
  }
  setTimeout(winnerMotionExit, victorsClaimToFameTime * 1000, element);
}

function startFight() {
  battleActive = false;
  // deepcode ignore MissingClose: added close to end of onopen.
  connectws(fightSequence);
}

function fightSequence() {
  // console.log('Start Fight: onopen')
  if (riggedWinners.length) {
    winner = riggedWinners[Randomizer(0, riggedWinners.length)];
  } else {
    winner = Math.floor(Math.random() * divnumber);
  }
  if (divnumber == 0) {
    // **** No users here - need to handle ****
    // file deepcode ignore UsageOfUndefinedReturnValue: Not an issue.
    // deepcode ignore CodeInjection: No code injection possible here.
    setTimeout(notify, 10000, noJoinMessage);
  } else {
    // @ts-ignore
    let user = UserList.getUserByID(winner);
    console.log(user);
    yeetathon(winner);
    // 17000
    setTimeout(changeVolume, 0, 0, 0.1, 2500);
    setTimeout(changeVolume, totalYeetTime * 1000, 0, 0, 2500);
    setTimeout(winnerTime, (totalYeetTime + delayToCeremony) * 1000, user);
    setTimeout(
      setWinner,
      totalYeetTime + delayToCeremony + motionUp + victorsClaimToFameTime,
      user.username
    );
    // deepcode ignore CodeInjection: Code Injection is not possible.
    setTimeout(closeWS, postGameLength * 1000, ws);
  }
}

function yeetathon(winner) {
  // var yeetUser;
  var yeetTime;
  var numbers = new Array(divnumber);
  for (let i = 0; i < divnumber; i++) {
    numbers[i] = i;
  }
  numbers.sort(() => Math.random() - 0.5);
  for (let i = 0; i < divnumber; i++) {
    if (numbers[i] != winner) {
      // yeetUser = document.getElementById(numbers[i]);
      yeetTime = (i * (totalYeetTime * 1000)) / divnumber;
      setTimeout(yeet, yeetTime, numbers[i]);
      // console.log(`yeeting ID (${i}): ${yeetUser.getAttribute("user")}`);
    }
  }
}

function addTestingPeople(totalGameLength, numberPeople = 20) {
  for (let i = 0; i < numberPeople; i++) {
    let randomdelay = totalGameLength * Math.random() * 1000;
    setTimeout(testEvent, randomdelay, ws, joinCommand, randomPlayer());
  }
}

function gameLengthSplit(m = 1, c = 0, floor = false) {
  var split = gameLength / 12;
  let length = m * split + c;
  if (floor) {
    length = Math.floor(length);
  }
  return length;
}

function randomWeaponSetup() {
  var randomWeaponSplit = 2000;
  for (let i = 0; i < 60; i++) {
    let randomdelay =
      3500 + i * randomWeaponSplit + Math.floor(Math.random() * 500) + 1;
    if (randomdelay <= (gameLength + 1) * 1000) {
      setTimeout(randomWeapon, randomdelay);
    }
  }
}

function displayLastWinner() {
  lastWinnerDiv();
  setTimeout(removeLastWinner, gameLength * 1000);
}

function closeWS(ws) {
  try {
    ws.close();
  } catch (error) {
    console.error(error);
  }
}

//Main function
function main() {
  console.log(settings());
  connectws(userJoining);
  hill();
  battleActive = true;
  setTimeout(playBattleSound, hillAnimationLength * 1000, 0.2, gameLength);
  if (LastWinner.exists() && showLastWinner) {
    setTimeout(displayLastWinner, hillAnimationLength * 1000);
  }
  setTimeout(
    notify,
    gameLengthSplit(0, hillAnimationLength) * 1000,
    `${gameLengthSplit(12, 0, true)} ${updateMessage}!`
  );
  setTimeout(
    notify,
    gameLengthSplit(-9, hillAnimationLength + gameLength) * 1000,
    `${gameLengthSplit(9, 0, true)} ${updateMessage}!`
  );
  setTimeout(
    notify,
    gameLengthSplit(-6, hillAnimationLength + gameLength) * 1000,
    `${gameLengthSplit(6, 0, true)} ${updateMessage}!`
  );
  setTimeout(
    notify,
    gameLengthSplit(-3, hillAnimationLength + gameLength) * 1000,
    `${gameLengthSplit(3, 0, true)} ${updateMessage}!`
  );
  setTimeout(
    notify,
    gameLengthSplit(-2, hillAnimationLength + gameLength) * 1000,
    `${gameLengthSplit(2, 0, true)} ${updateMessage}!`
  );
  setTimeout(
    notify,
    gameLengthSplit(-1, hillAnimationLength + gameLength) * 1000,
    `${gameLengthSplit(1, 0, true)} ${updateMessage}!`
  );
  setTimeout(notify, (gameLength + hillAnimationLength) * 1000, endingMessage);
  setTimeout("battleActive = false", (gameLength + hillAnimationLength) * 1000);
  // deepcode ignore CodeInjection: No code inject
  setTimeout(closeWS, (gameLength + hillAnimationLength) * 1000, ws);
  setTimeout(
    startFight,
    (gameLength + hillAnimationLength + fightDelay) * 1000
  );
  setTimeout(removeElement, (totalGameLength - 0.5) * 1000, "grassyhill_id");
  setTimeout(stopAllSound, totalGameLength * 1000);

  if (!testing) {
    setTimeout(redirectBrowser, totalGameLength * 1000);
  }
  if (massTesting) {
    setTimeout(
      redirectBrowser,
      (totalGameLength + 1) * 1000,
      document.location.href
    );
  }
  randomWeaponSetup();
  if (testing) {
    setTimeout(
      addTestingPeople,
      hillAnimationLength * 1000,
      gameLength,
      gameLength / 2
    );
  }
}

main();
