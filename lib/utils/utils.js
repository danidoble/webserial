export function wait(ms = 100) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export function supportWebSerial() {
    return 'serial' in navigator;
}

export function getSeconds(seconds = 1) {
    return seconds * 1000;
}