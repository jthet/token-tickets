const dotenv = require("dotenv");

dotenv.config();

const defaultAccountId = process.env.ACCOUNT_ID;
const defaultPrivateKey = process.env.PRIVATE_KEY;

module.exports = { defaultAccountId, defaultPrivateKey };
