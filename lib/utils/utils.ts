export function wait(ms: number = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export function supportWebSerial(): boolean {
  return 'serial' in navigator;
}

export function supportGeolocation(): boolean {
  return 'geolocation' in navigator;
}

export function supportCrypto(): boolean {
  return 'crypto' in window;
}

export function getSeconds(seconds: number = 1): number {
  return seconds * 1000;
}

export function isEmpty(value: undefined | null | string | number | object): boolean {
  return value === undefined || value === null || value === '';
}
