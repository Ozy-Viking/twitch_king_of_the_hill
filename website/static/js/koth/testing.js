import {
  weaponObjects,
  weaponNames,
  weaponCount,
  weaponRegex,
} from "./weapons.js";
import { weaponNamesTesting, weaponObjectsTesting } from "./weapons.js";
import {
  modifyStyleSheet,
  boolSwitch,
  randomSide,
  sides,
  PLATFORM,
  SIDE,
} from "../util.js";
import {
  winnerMotion,
  winnerMotionExit,
  riggedMotion,
  fighterAnimation,
  motionUp,
  motionUp1,
} from "./playerMotion.js";
import {
  lastWinnerDiv,
  removeLastWinner,
  clearWinnerHistory,
  LastWinner,
} from "./lastWinner.js";
import settings, {
  championName,
  hillName,
  weaponName as requestWeaponName,
  side as requestSide,
  setSearchParam,
  platform as requestPlatform,
  joinCommand,
  platformBattle,
  PlatformSide,
  removeSearchParam,
} from "./urlParams.js";
import {
  Scoreboard,
  scoreboard,
  scoreboardMotion,
  twitchTitle,
  youtubeTitle,
} from "./platformBattle.js";
var testingUser = "Ozy_Viking";
var activeHill = null;
var side = requestSide;
const divnumber = 0;
const battleGround = `${championName} of the ${hillName}`;
const winnerMessage = `is the new ${battleGround}`;
let weaponName = requestWeaponName ? requestWeaponName : "tentacles";
var weapon = weaponObjects[weaponName];
var rigged = false;
let platform = requestPlatform;

function usersWeapon(choosenWeapon) {
  if (weapon) {
    return weapon;
  }
  return weaponObjects[choosenWeapon];
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
      var warp = document.getElementById("confetti-container"),
        innerWidth = window.innerWidth,
        innerHeight = window.innerHeight;

      // Load into page
      var Div = document.createElement("div");
      Div.id = divnumber.toString();
      Div.setAttribute("user", user);
      Div.setAttribute("state", "alive");
      Div.style.background = `url(${xhttp.responseText})`;
      Div.style.backgroundSize = "100% 100%";

      var weapon = usersWeapon(lowerMessage);
      side = randomSide(side);
      Div.setAttribute("side", side);
      Div.setAttribute("weapon", weapon.name);
      Div.setAttribute("platform", platform);

      Div.innerHTML = `<img style='${weapon[side]}' src='static/images/${weapon.file}'/><img class='${side} ${platform}' src='static/images/${platform}.png'/>`;
      fighterAnimation(side, Div);
      warp.appendChild(Div);
    }
  };
  xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
  xhttp.send();
}

function winnerNotification(
  user = testingUser,
  winweapon = weapon,
  winMessage = winnerMessage
) {
  return `${user} ${winMessage}, using ${winweapon["tense 1"]} ${winweapon.name}.`;
}

function platformChatMessages() {
  const left = document.getElementById("leftPlatformBattleChat");
  const right = document.getElementById("rightPlatformBattleChat");
  const center = document.getElementById("scorePlatformBattleChat");
  center.innerHTML = scoreboard.scoreChatMessage;
  left.innerHTML = scoreboard.chatMessage("Twitch");
  right.innerHTML = scoreboard.chatMessage("YouTube");
}

function removeElement(ID) {
  document.getElementById(ID).remove();
}

function weaponTest(annimationSide = null, inputWeapon = weaponName) {
  console.log(inputWeapon);
  try {
    while (document.getElementById(0)) {
      removeElement(divnumber);
    }
  } catch {}
  if (annimationSide) {
    console.log(annimationSide);
    side = annimationSide;
  }
  if (weaponNames.includes(inputWeapon)) {
    weapon = weaponObjects[inputWeapon];
  } else if (weaponNamesTesting.includes(inputWeapon)) {
    weapon = weaponObjectsTesting[inputWeapon];
  }
  addFighter(testingUser, weapon);
  document.getElementById("winnerNotification").innerText =
    winnerNotification();
}

function hill(hillID = "grassyhill_1") {
  if (activeHill) {
    modifyStyleSheet(`#${activeHill}`, "opacity", 0);
  }
  activeHill = hillID;
  if (!hillID) {
    return;
  } else {
    modifyStyleSheet(`#${activeHill}`, "opacity", 1);
  }
}

function winnerTime(id, userSide = side) {
  try {
    removeLastWinner();
  } catch (error) {
    console.error(error);
  }
  let element = document.getElementById(id);
  element.innerHTML += `<div class='WinnerUsername'><div class="pretext">New ${
    joinCommand[0].toUpperCase() + joinCommand.slice(1)
  }</div><div>${element.getAttribute("user")}</div></div>`;
  new LastWinner(
    element.getAttribute("user"),
    element.getAttribute("weapon"),
    userSide,
    rigged
  ).save();
  if (platformBattle) {
    scoreboard.platformWonRound(element.getAttribute("platform"));
    scoreboard.displayWinnerPlatformMessage(motionUp1 * 1000);
    console.log("Twitch Chat: ", scoreboard.chatMessage("Twitch"));
    console.log("YouTube Chat: ", scoreboard.chatMessage("YouTube"));
    platformChatMessages();
  }
  if (rigged) {
    //riggedUsers.includes(user)) {
    riggedMotion(element, false);
  } else {
    winnerMotion(element, false);
  }
  let delay = 5000;
  setTimeout(winnerMotionExit, delay, element);
  if (platformBattle) {
    scoreboard.hideWinnerPlatformMessage(delay);
  }
}

function addButtons() {
  const buttonDiv = document.getElementById("buttonDiv");
  const testingWeaponButtonDiv = document.getElementById(
    "testingWeaponButtonDivCardBody"
  );
  const sideButtonDiv = document.getElementById("sideButtonDiv");
  const hillButtonDiv = document.getElementById("hillButtonDiv");
  const platformButtonDiv = document.getElementById("platformButtonDiv");

  weaponsButtons(buttonDiv, testingWeaponButtonDiv);
  platformButtons(platformButtonDiv);
  platformWinnerButtons(platformButtonDiv);
  sidesUserWinner(sideButtonDiv);
  grassyHillButtons(hillButtonDiv);
}

function grassyHillButtons(hillButtonDiv) {
  let btn;
  ["grassyhill_1", "grassyhill_2", "grassyhill_3"].forEach((hillName) => {
    btn = document.createElement("button");
    btn.id = `${hillName}Btn`;
    btn.onclick = () => {
      hill(hillName);
    };
    btn.innerText = hillName;
    btn.className = "btn btn-primary";
    hillButtonDiv.appendChild(btn);
  });

  btn = document.createElement("button");
  btn.id = "nullHill";
  btn.onclick = () => {
    hill();
  };
  btn.innerText = "No Hill";
  btn.className = "btn btn-primary";
  hillButtonDiv.appendChild(btn);
  clearChoice(hillButtonDiv, "hill", "Clear Hill Choice");
}

function sidesUserWinner(sideButtonDiv) {
  let btn;
  var div = document.createElement("div");
  div.className = "btn-group";
  sideButtonDiv.appendChild(div);
  sides.forEach((sideName) => {
    btn = document.createElement("button");
    btn.id = sideName;
    btn.onclick = () => {
      setSearchParam("side", sideName);
      weaponTest(sideName);
    };
    btn.innerText = sideName;
    btn.className = "btn btn-primary";
    div.appendChild(btn);
  });
  var inputBox = document.createElement("input");
  inputBox.id = "testing_user";
  inputBox.setAttribute("autofocus", true);
  inputBox.placeholder = "Ozy_Viking";
  inputBox.title = "Twitch Username (press 'enter' to use username)";
  inputBox.addEventListener("keyup", function onEvent(e) {
    if (e.key == "Enter") {
      if (e.target.value) {
        console.log(e.target.value);
        testingUser = e.target.value;
      }
      weaponTest();
    }
  });
  sideButtonDiv.appendChild(inputBox);
  div = document.createElement("div");
  div.className = "btn-group";
  sideButtonDiv.appendChild(div);
  btn = document.createElement("button");
  btn.id = "winnerTest";
  btn.onclick = () => {
    winnerTime(divnumber, side);
  };
  btn.innerText = "Winner";
  btn.className = "btn btn-primary";
  div.appendChild(btn);
  btn = document.createElement("button");
  btn.id = "riggedWinner";
  btn.onclick = () => {
    rigged = boolSwitch(rigged);
    let btn = document.getElementById("riggedWinner");
    btn.innerText = rigged ? "Rigged" : "Not Rigged";
  };
  btn.innerText = rigged ? "Rigged" : "Not Rigged";
  btn.className = "btn btn-warning";
  div.appendChild(btn);
  btn = document.createElement("button");
  btn.id = "displayLastWinner";
  btn.onclick = () => {
    lastWinnerDiv();
  };
  btn.innerText = "Last Winner";
  btn.className = "btn btn-primary";
  div.appendChild(btn);
  btn = document.createElement("button");
  btn.id = "hideLastWinner";
  btn.onclick = () => {
    removeLastWinner();
  };
  btn.innerText = "Hide Winner";
  btn.className = "btn btn-secondary";
  div.appendChild(btn);
  btn = document.createElement("button");
  btn.id = "resetHistory";
  btn.onclick = () => {
    clearWinnerHistory();
  };
  btn.innerText = "Clear Winner history";
  btn.className = "btn btn-danger";
  div.appendChild(btn);
}

function clearChoice(Div, searchParam, name) {
  let btn = document.createElement("button");
  btn.id = `clear${searchParam}`;
  btn.onclick = () => {
    removeSearchParam(searchParam);
    weaponTest(side, name);
  };
  btn.innerText = name;
  btn.className = "btn btn-danger";
  Div.appendChild(btn);
}

function weaponsButtons(buttonDiv, testingWeaponButtonDiv) {
  let btn;
  weaponNames.forEach((name) => {
    btn = document.createElement("button");
    btn.id = name;
    btn.onclick = () => {
      setSearchParam("weapon", name);
      weaponTest(side, name);
    };
    btn.innerText = name;
    btn.className = "btn btn-primary";
    buttonDiv.appendChild(btn);
  });
  weaponNamesTesting.forEach((name) => {
    btn = document.createElement("button");
    btn.id = name;
    btn.onclick = () => {
      setSearchParam("weapon", name);
      weaponTest(side, name);
    };
    btn.innerText = name;
    btn.className = "btn btn-primary";
    testingWeaponButtonDiv.appendChild(btn);
  });
  clearChoice(buttonDiv, "weapon", "Clear Weapon Choice");
}

function sortSides(a, b) {
  console.log({a,b, PlatformSide})
  if (PlatformSide.Twitch === SIDE.left) {
    if (a == PLATFORM.Twitch) return -1;
    else return 1;
  } else if (PlatformSide.Twitch == SIDE.right) {
    if (a == PLATFORM.Twitch) return 1;
    else return -1;
  }
}

function setPlatformSides(){
  let ytBorder = "var(--yt-primary) solid"
  let twitchBorder = "var(--twitch-primary) solid"
  let left = PlatformSide.Twitch === SIDE.left ? twitchBorder : ytBorder
  let right = PlatformSide.Twitch === SIDE.right ? twitchBorder : ytBorder

  modifyStyleSheet('#leftPlatformBattleChat', 'border', left)
  modifyStyleSheet('#rightPlatformBattleChat', 'border', right)
}

function platformButtons(platformButtonDiv) {
  let btn;
  Object.keys(PLATFORM)
    .sort(sortSides)
    .forEach((platformChoice) => {
      btn = document.createElement("button");
      btn.id = platformChoice;
      btn.onclick = () => {
        setSearchParam("platform", platformChoice);
        platform = platformChoice;
        weaponTest();
      };
      btn.innerText = platformChoice;
      btn.className = `btn btn-${platformChoice}`;
      platformButtonDiv.appendChild(btn);
    });
}

function platformWinnerButtons(platformButtonDiv) {
  let btn;
  Object.keys(PLATFORM)
    .sort(sortSides)
    .forEach((platformChoice) => {
      btn = document.createElement("button");
      btn.id = platformChoice;
      btn.onclick = () => {
        scoreboard.platformWonRound(platformChoice);
        scoreboard.displayWinnerPlatformMessage();
        platformChatMessages();
      };
      btn.innerText = platformChoice + " Winner";
      btn.className = `btn btn-${platformChoice}`;
      platformButtonDiv.appendChild(btn);
    });

  btn = document.createElement("button");
  btn.id = "togglePlatformBattle";
  btn.innerText = "Toggle Platform Battle";
  btn.onclick = () => {
    if (platformBattle) {
      setSearchParam("platformBattle", "false");
    } else {
      setSearchParam("platformBattle", "true");
    }
  };
  btn.className = `btn btn-${platformBattle ? "success" : "danger"}`;
  platformButtonDiv.appendChild(btn);
  btn = document.createElement("button");
  btn.id = "HidePlatformBattleHistory";
  btn.innerText = "Hide Platform History";
  btn.onclick = () => {
    scoreboard.hideWinnerPlatformMessage(true);
    platformChatMessages();
  };
  btn.className = "btn btn-success";
  platformButtonDiv.appendChild(btn);
  btn = document.createElement("button");
  btn.id = "clearPlatformBattleHistory";
  btn.innerText = "Clear Platform History";
  btn.onclick = () => {
    scoreboard.hideWinnerPlatformMessage(true);
    scoreboard.reset();
    platformChatMessages();
  };
  btn.className = "btn btn-danger";
  platformButtonDiv.appendChild(btn);
}
setPlatformSides()
addButtons();
weaponTest();
platformChatMessages();
// hill();
// lastWinnerDiv();
// console.log(JSON.stringify(weaponRegex(), null, 1));
