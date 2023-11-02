export const urlParams = new URLSearchParams(window.location.search);

const classicNegation = ["false", "no"]

export const championName = urlParams.get('championName') ? urlParams.get('championName') : "King";
export const gameLength = Number(urlParams.get('gameLength')) ? Number(urlParams.get('gameLength')) : 60;
export const gstringProb = Number(urlParams.get('gstringProb')) ? Number(urlParams.get('gstringProb')) : 0;
export const hillName = urlParams.get('hillName') ? urlParams.get('hillName') : "Hill";
export const joinCommand = urlParams.get('joinCommand') ? urlParams.get('joinCommand').toLowerCase() : "king";
export const reset = ![null, ...classicNegation].includes(urlParams.get('reset'));
export const riggedUsers = ['Ozy_Viking', 'sassysarrah5', 'gotobedchild', ...urlParams.getAll('riggedUser')];
export const wsPort = urlParams.get('wsPort') ? urlParams.get('wsPort') : "8080";
export const server = urlParams.get('server') ? `ws://${urlParams.get('server')}:${wsPort}/` : `ws://localhost:${wsPort}/`;
export const showLastWinner = !(["false", "no"].includes(urlParams.get('lastWinner')))
export const testing = !([null, ...classicNegation].includes(urlParams.get('testing')));
export const winStreak = winStreakNumber()

function winStreakNumber(winStreakParam = null) {
    winStreakParam = winStreakParam ? winStreakParam : urlParams.get('winStreak');
    if (["false", "no", "0"].includes(winStreakParam)) {
        return null
    } else if (Number(winStreakParam) > 0) {
        return Number(winStreakParam)
    } else {
        return 2
    }
}
