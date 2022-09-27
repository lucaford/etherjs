const crypto = require("crypto").webcrypto;

const generateSalt = () => {
  const random = new Uint8Array(32);
  crypto.getRandomValues(random);
  let r = "";
  for (const b of random) {
    r += ("0" + b.toString(16)).slice(-2);
  }
  return "0x" + r;
};

module.exports = {
  generateSalt,
};
