require("dotenv").config();
const axios = require("axios");
const { Client, AccountBalanceQuery } = require("@hashgraph/sdk");

async function checkBalance() {
  // This function will check the balance of your Hedera testnet account
  // This is a way to check if account connects successfully

  // Grab your Hedera testnet account ID and private key from the .env file
  const accountId = process.env.ACCOUNT_ID;
  const privateKey = process.env.PRIVATE_KEY;

  if (!accountId || !privateKey) {
    throw new Error(
      "Environment variables ACCOUNT_ID and PRIVATE_KEY must be present"
    );
  }

  // Create our connection to the Hedera network
  const client = Client.forTestnet();
  client.setOperator(accountId, privateKey);

  // Query the balance of your account
  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  console.log(`Your account balance is: ${balance.hbars.toString()}`);

  client.close();
}

async function getTransactions() {
  const mirrorNodeUrl =
    "https://testnet.mirrornode.hedera.com/api/v1/transactions";
  const queryParams = {
    result: "success",
    limit: 2,
    "account.id": "0.0.801",
    // order: "desc"
  };

  try {
    const response = await axios.get(mirrorNodeUrl, { params: queryParams });

    const transactions = response.data.transactions;

    transactions.forEach((transaction) => {
      // console.log(transaction);
      console.log(`Transaction ID: ${transaction.transaction_id}`);
      console.log(`Timestamp: ${transaction.consensus_timestamp}`);
      console.log(`Transaction Type: ${transaction.name}`);
      console.log(`Transaction Status: ${transaction.result}`);
      console.log(`Transaction Fee: ${transaction.charged_tx_fee}`);
      console.log("--------------------------------------------------");
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

checkBalance();
getTransactions();
