
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min)) + min);
}

export function isGamepadSupported(): boolean {
    if ('getGamepads' in navigator) return true;
    if ('onconnectedgamepad' in window) return true;
    return false;
}
