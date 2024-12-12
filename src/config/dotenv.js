import dotenv from 'dotenv';

dotenv.config();

const defaultAccountId = process.env.ACCOUNT_ID;
const defaultPrivateKey = process.env.PRIVATE_KEY;

export { defaultAccountId, defaultPrivateKey };
