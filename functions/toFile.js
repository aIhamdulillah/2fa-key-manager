const fs = require("fs");
const filePath = "accounts.json";

/**
 * This file exports two functions for writing and retrieving account information from a JSON file.
 * @function writeToFile
 * @description Adds a new account and its 2FA key to an existing JSON file or creates a new file if none exists. Returns a Promise that resolves when the operation is successful, and rejects with an error if there's a problem.
 * @param {string} account - The name of the account being added.
 * @param {string} key - The 2FA key associated with the account.
 * @returns {Promise<void>}
 * 
 * @function removeFromFile
 * @description Removes an account and its 2FA key from an existing JSON file. Returns a Promise that resolves when the operation is successful, and rejects with an error if the account is not found or there's a problem with the file.
 * @param {string} account - The name of the account being removed.
 * @returns {Promise<void>}
 *
 * @function getAllCodes
 * @description Retrieves all accounts and their associated 2FA keys from an existing JSON file, if one exists. Returns a JSON object containing all accounts and their associated 2FA keys.
 * @returns {Object}
 */

const writeToFile = (account, key) => {
    return new Promise((resolve, reject) => {
        // Load existing data, if any
        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath));
        }

        // Add new account to the existing data
        data[account] = key;

        // Save updated data to the given filePath
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                // Reject if error
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const removeFromFile = (account) => {
    return new Promise((resolve, reject) => {
        // Load existing data, if any
        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath));
        }

        // Check if account exists
        if (!data.hasOwnProperty(account)) {
            reject(`Account '${account}' not found`);
            return;
        }

        // Remove account from the existing data
        delete data[account]

        // Save updated data to the given filePath
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                // Reject if error
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const getAllCodes = () => {
    // Read data from the file, if it exists
    let data = {};

    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }

    // Return the data as a JSON object
    return data;
}

module.exports = { writeToFile, removeFromFile, getAllCodes };
