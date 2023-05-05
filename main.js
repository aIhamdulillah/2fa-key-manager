const readline = require("readline");
const { getTotpCode, getHotpCode } = require("./functions/get2faCodeFromKey.js");
const { getAllCodes, writeToFile, removeFromFile } = require("./functions/toFile.js");

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dataTable = {}
dataTable = getAllCodes();

const commandTable = {
    // display all commands
    'help': () => {
        console.log(`- gtc <account> (gets account totp code)\n- ghc <account> (gets account hotp code)\n- save <account> <key> (saves key under that account name)\n- remove <account> (removes account and key from file)\n- view (displays all accounts)\n- help (this command)`)
    },
    // get totp code
    'gtc': (args) => {
        if (!dataTable.hasOwnProperty(args)) {
            return console.log(`- Account '${args}' not found`);
        }

        const key = dataTable[args]

        const code = getTotpCode(key);

        if (!code) return console.log("- Error while generating Totp code");

        return console.log(`- ${code}`);
    },
    // get key code
    'ghc': (args) => {
        if (!dataTable.hasOwnProperty(args)) {
            return console.log(`- Account '${args}' not found`);
        }

        const key = dataTable[args]

        const code = getHotpCode(key);

        if (!code) return console.log("- Error while generating Hotp code");

        return console.log(`- ${code}`);
    },
    // save manual key as account
    'save': async (args) => {
        const [account, key] = args.split(' ')

        try {
            await writeToFile(account, key)
            console.log(`- Successfully added account '${account}'`)
            dataTable = getAllCodes();
            
            const code = getTotpCode(key);
        } catch (error) {
            console.log(`- There was an error while writing to file. ${err}`)
        }
    },
    // remove account
    'remove': async (args) => {
        try {
            await removeFromFile(args);
            console.log(`- Successfully removed account '${args}'`);
            dataTable = getAllCodes();
        } catch (error) {
            console.log(`- There was an error while removing from file. ${error}`);
        }
    },
    'view': () => {
        const accounts = Object.keys(dataTable);
        if (accounts.length === 0) {
            console.log('- No accounts found');
        } else {
            accounts.forEach((account) => {
                console.log(`- ${account}`);
            });
        }
    }
}

r1.prompt();
console.log(`Type help to display all commands.`);
r1.on('line', (input) => {
    const [command, ...args] = input.split(' ');
    const callback = commandTable[command];
    if (callback) {
        callback(args.join(' '));
    } else {
        console.log('Invalid command');
    }
});