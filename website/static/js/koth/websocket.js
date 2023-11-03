import { emptyFunction } from "../util.js";
import { server } from "./urlParams.js";

export var ws = newWebSocket(server)

export function newWebSocket(server) {
    return new WebSocket(server)
}

export function connectws(onopen = emptyFunction, onclose = emptyFunction) {
    ws = newWebSocket(server)
    if (onopen.toString() != emptyFunction.toString()) {
        ws.onopen = onopen
    }
    if (onclose.toString() != emptyFunction.toString()) {
        ws.onclose = onclose
    }
    return ws
};