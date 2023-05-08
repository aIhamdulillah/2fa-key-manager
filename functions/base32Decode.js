/**
 * This module exports a function for decoding a base32 string.
 * @function base32Decode
 * @param {string} base32String - The base32-encoded string to be decoded.
 * @returns {Buffer} Returns a Buffer object containing the decoded data.
 * @throws {Error} Throws an error if the provided string is not a valid base32 string.
*/

const base32Decode = (base32String) => {
    const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = 0;
    let value = 0;
    let output = Buffer.alloc(Math.ceil(base32String.length * 5 / 8));
    let outputIndex = 0;

    for (let i = 0; i < base32String.length; i++) {
        const char = base32String.charAt(i);
        const charIndex = base32Alphabet.indexOf(char.toUpperCase());
    
        if (charIndex === -1) {
            throw new Error('Invalid base32 string');
        }
    
        value = (value << 5) | charIndex;
        bits += 5;
    
        if (bits >= 8) {
            output[outputIndex++] = value >>> (bits - 8);
            bits -= 8;
        }
    }

    if (bits > 0) {
        output[outputIndex++] = (value << (8 - bits)) & 0xff;
    }

    return output.slice(0, outputIndex);
}

module.exports = { base32Decode }
