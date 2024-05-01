import { PLATFORM } from "../util.js";
import { botID } from "./urlParams.js";
import { ws } from "./websocket.js";

const TWITCH_PLATFORM = "FightMessageTwitch";
const YOUTUBE_PLATFORM = "FightMessageYouTube";

/**
 *
 * @param {string} message - The message to send.
 * @param {'all'|'Twitch'|'YouTube'} platform - The platform to send the message to.
 */
export function notify(message, platform = "all") {
  console.log(platform, message);
  let sendPlatforms = [];
  switch (platform) {
    case PLATFORM.Twitch:
      sendPlatforms.push(TWITCH_PLATFORM);
      break;
    case PLATFORM.YouTube:
      sendPlatforms.push(YOUTUBE_PLATFORM);
      break;
    case "all":
      sendPlatforms.push(TWITCH_PLATFORM);
      sendPlatforms.push(YOUTUBE_PLATFORM);
      break;
    default:
      console.error("Invalid platform");
      return;
  }
  for (const sendPlatform of sendPlatforms) {
    ws.send(
      JSON.stringify({
        request: "DoAction",
        action: {
          name: sendPlatform,
        },
        args: {
          rawInput: message,
        },
        id: botID,
      })
    );
  }
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
