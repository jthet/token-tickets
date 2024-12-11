import dotenv from 'dotenv'

dotenv.config()

const accountId = process.env.ACCOUNT_ID
const privateKey = process.env.PRIVATE_KEY

export { accountId, privateKey }
