import { botID } from "./urlParams.js";
import { ws } from "./websocket.js";

export function notify(message) {
  console.log(message);
  ws.send(
    JSON.stringify({
      request: "DoAction",
      action: {
        name: "FightMessage",
      },
      args: {
        rawInput: message,
      },
      id: botID,
    })
  );
}

export function setWinner(message) {
  ws.send(
    JSON.stringify({
      request: "DoAction",
      action: {
        name: "SetFightReward",
      },
      args: {
        rawInput: message,
      },
      id: botID,
    })
  );
}
