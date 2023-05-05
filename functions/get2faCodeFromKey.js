const speakeasy = require("speakeasy");

/**
 * This file exports two functions for generating 2FA codes using the Speakeasy library.
 * @function getTotpCode
 * @description Generates a 2FA code using the provided manual key and the TOTP algorithm.
 * @param {string} secret - The 2FA key used for generating codes.
 * @param {string} [encoding="base32"] - The encoding type of the key (default is "base32").
 * @returns {string|false} Returns the generated 2FA code as a string, or false if there was an error.
 *
 * @function getHotpCode
 * @description Generates a 2FA code using the provided manual key and the HOTP algorithm.
 * @param {string} secret - The 2FA key used for generating codes.
 * @param {string} [encoding="base32"] - The encoding type of the key (default is "base32").
 * @returns {string|false} Returns the generated 2FA code as a string, or false if there was an error.
 */

const getTotpCode = (key, encoding = "base32") => {
    try {
        // Generate code with given key and encoding type
        const code = speakeasy.totp({
            secret: key,
            encoding: encoding
        });

        // Return key
        return code;
    } catch (error) {
        // Return false for error handling
        return false;
    }
}

const getHotpCode = (key, encoding = "base32") => {
    try {
        // Generate code with given key and encoding type
        const code = speakeasy.hotp({
            secret: key,
            encoding: encoding
        });

        // Return key
        return code;
    } catch (error) {
        // Return false for error handling
        return false;
    }
}

module.exports = { getTotpCode, getHotpCode };
