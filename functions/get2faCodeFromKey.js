const crypto = require("crypto");
const { base32Decode } = require("./base32Decode")

/**
    @function getTotpCode
    @description Generates a 2FA code using the provided manual key and the Time-based One-time Password (TOTP) algorithm.
    @param {string} key - The 2FA key used for generating codes.
    @param {number} [timeStep=30] - The time step interval in seconds used for generating codes (default is 30 seconds).
    @param {number} [digits=6] - The number of digits in the generated code (default is 6).
    @param {string} [encoding="base32"] - The encoding type of the key (default is "base32").
    @returns {string} Returns the generated 2FA code as a string.
    
    @function getHotpCode
    @description Generates a 2FA code using the provided manual key and the HMAC-based One-time Password (HOTP) algorithm.
    @param {string} key - The 2FA key used for generating codes.
    @param {number} [counter=0] - The counter value used for generating the code (default is 0).
    @param {number} [digits=6] - The number of digits in the generated code (default is 6).
    @param {string} [encoding="base32"] - The encoding type of the key (default is "base32").
    @returns {string} Returns the generated 2FA code as a string.
*/

const getTotpCode = (key, timeStep = 30, digits = 6, encoding = 'base32') => {
    let decodedKey;
    
    if (encoding == 'base32') {
        decodedKey = base32Decode(key);
    } else {
        decodedKey = Buffer.from(secretKey, 'base64')
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const time = Math.floor(currentTime / timeStep);
    const message = Buffer.alloc(8);

    message.writeUInt32BE(0, 0);
    message.writeUInt32BE(time, 4);

    const hash = crypto.createHmac('sha1', decodedKey).update(message).digest();
    const offset = hash[hash.length - 1] & 0xf;
    const truncatedHash = (hash[offset] & 0x7f) << 24 | (hash[offset + 1] & 0xff) << 16 | (hash[offset + 2] & 0xff) << 8 | (hash[offset + 3] & 0xff);
    const otp = truncatedHash % (10 ** digits);

    return otp.toString().padStart(digits, '0');
}

const getHotpCode = (key, counter = 0, digits = 6, encoding = 'base32') => {
    let decodedKey;

    if (encoding == 'base32') {
        decodedKey = base32.decode(key);
    } else {
        decodedKey = Buffer.from(key, 'base64');
    }

    const message = Buffer.alloc(8);
    message.writeUIntBE(counter, 0, 8);

    const hash = crypto.createHmac('sha1', decodedKey).update(message).digest();
    const offset = hash[hash.length - 1] & 0xf;
    const truncatedHash = (hash[offset] & 0x7f) << 24 | (hash[offset + 1] & 0xff) << 16 | (hash[offset + 2] & 0xff) << 8 | (hash[offset + 3] & 0xff);
    const hotp = truncatedHash % (10 ** digits);

    return hotp.toString().padStart(digits, '0');
};

module.exports = { getTotpCode, getHotpCode };
