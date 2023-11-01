
export function notify(ws, botID, message) {
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
            "id": botID
        }));
}

export function setWinner(ws, botID, message) {
    ws.send(JSON.stringify(
        {
            "request": "DoAction",
            "action": {
                "name": "SetFightReward"
            },
            "args": {
                "rawInput": message
            },
            "id": botID
        }));
}
;

function emptyFunction() { }


export function connectws(server, onopen = emptyFunction, onclose = emptyFunction) {
    const ws = new WebSocket(server)
    if (onopen.toString() != emptyFunction.toString()) {
        ws.onopen = onopen
    }
    if (onclose.toString() != emptyFunction.toString()) {
        ws.onclose = onclose
    }
    return ws
};