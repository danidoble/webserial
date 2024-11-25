import { Relay } from '../serial/relay.js';

const relay = new Relay();
await relay.toggle();
