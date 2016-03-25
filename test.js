'use strict';

const jwt = require('jsonwebtoken');

function sign(userId) {
  //console.log('UID', userId);
  //console.log('PLoad', getPayload(userId));
  //return jwt.sign(getPayload(userId), 'test', { algorithm: 'RS256'});
  return jwt.sign({ uid: userId }, 'shhhhh');

}
const tok = sign(123);
console.log(tok);