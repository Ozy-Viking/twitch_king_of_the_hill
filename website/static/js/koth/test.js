export const testingPeople = [
  "Naval_Warlord",
  "Ozy_Viking",
  "JDPlays",
  "the_rubble",
  "steveo0938",
];

export function randomPlayer(player = null) {
  if (player) {
    return player;
  }
  return testingPeople[Math.floor(Math.random() * testingPeople.length)];
}

export function kothTestEvent(
  ws,
  joinCommand,
  user = "ozy_viking",
  weapon = ""
) {
  class TestEvent {
    constructor(data) {
      this.data = JSON.stringify(data);
    }
  }
  ws.onmessage(
    new TestEvent({
      timeStamp: "2022-01-30T21:32:04.4588947-05:00",
      event: {
        source: "Twitch",
        type: "ChatMessage",
      },
      data: {
        message: {
          msgId: "a0d32df1-d3ca-4fd7-87fb-6c4e958550f0",
          userId: 1231453,
          username: user,
          role: 1,
          subscriber: true,
          displayName: user,
          channel: "<broadcaster's channel name>",
          message: `${joinCommand} ${weapon}` /* The message the user sent */,
          isHighlighted: false,
          isMe: false,
          isCustomReward: false,
          isAnonymous: false,
          isReply: false,
          bits: 0,
          hasBits: false,
          emotes: [
            {
              id: "300400304",
              type: "Twitch",
              name: "nate121Raid",
              startIndex: 5,
              endIndex: 15,
              imageUrl:
                "https://static-cdn.jtvnw.net/emoticons/v2/300400304/default/dark/2.0",
            },
          ],
          cheerEmotes: [],
        },
      },
    })
  );
}
