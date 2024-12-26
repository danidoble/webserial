import { PinPad } from '../serial/pinpad.js';

const pp = new PinPad();

await pp.sendCustomCode({ code: '' });
await pp.login({ force: false });
await pp.checkPositionPermission();
await pp.cancelReadCard();
await pp.print('client'); // client, commerce
await pp.consult({ reference: 'TEST' });
await pp.rePrint({ folio: 123456789 });
await pp.cancelPurchase({ amount: 0, authorization: '123456789', folio: '123456789' });
await pp.makeSale({ amount: 1, reference: 'TEST' });

pp.clearSession();
pp.getClientVoucher();
pp.getCommerceVoucher();

pp.username = 'test';
pp.password = 'password';
pp.amount = 1;
pp.reference = 'test-001';
pp.environment = 'production';
pp.timeoutPinPad = 100;

console.log(pp.username);
console.log(pp.password);
console.log(pp.amount);
console.log(pp.reference);
console.log(pp.url);
console.log(pp.version);
console.log(pp.defaultEnvironment);
console.log(pp.environment);
console.log(pp.latitudeLongitude);
console.log(pp.timeoutPinPad);
