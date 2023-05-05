# 2fa-key-manager
A simple nodejs 2fa authentication console app.

Functionality:
- Add accounts (account name and a manual 2fa key) 
- Remove accounts
- Generate either TOTP or HOTP codes with a given encoding type using the account

Uses speakeasy library - https://www.npmjs.com/package/speakeasy
