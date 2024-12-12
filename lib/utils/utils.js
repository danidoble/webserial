export function wait(ms = 100) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export function supportWebSerial() {
  return 'serial' in navigator;
}

export function supportGeolocation() {
  return 'geolocation' in navigator;
}

export function supportCrypto() {
  return 'crypto' in window;
}

export function getSeconds(seconds = 1) {
  return seconds * 1000;
}

export function isEmpty(value) {
  return value === undefined || value === null || value === '';
}
