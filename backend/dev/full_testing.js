#!/usr/bin/env node

const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
  TokenCreateTransaction,
  TokenType,
  TokenMintTransaction,
  TransferTransaction,
  NftId,
  TransactionId,
  AccountAllowanceApproveTransaction,
  AccountBalanceQuery,
} = require("@hashgraph/sdk");

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Utility function to validate account credentials
const checkAccountValidity = async (accountId, privateKey) => {
  try {
    const client = Client.forTestnet();
    client.setOperator(accountId, PrivateKey.fromStringDer(privateKey));

    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);

    console.log(
      `Account ${accountId} is valid with balance: ${balance.hbars.toString()}`
    );
    return true;
  } catch (err) {
    console.error(`Account validation failed: ${err.message}`);
    return false;
  }
};


// const mongoose = require("mongoose");
// const Event = require("../models/Event");
// const Ticket = require("../models/Ticket");

// // MongoDB connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully.");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

const environmentSetup = async () => {
  // await connectDB();

  const tokenNum = Math.floor(Math.random() * 10);
  const tokenName = `Test Token ${tokenNum}`;
  const tokenSymbol = `Test-${tokenNum}`;
  const memo = "test";


  console.log("\nCreating new account...");
  const myAccountId = process.env.OPERATOR_ACCOUNT_ID;
  const myPrivateKey = process.env.OPERATOR_ACCOUNT_PRIVATE_KEY_DER;

  if (!myAccountId || !myPrivateKey) {
    throw new Error("Environment variables not found");
  }

  const client = Client.forTestnet();
  client.setOperator(myAccountId, PrivateKey.fromStringDer(myPrivateKey));

  // Create a new account
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  const newAccountTransaction = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new Hbar(5))
    .execute(client);

  const newAccountReceipt = await newAccountTransaction.getReceipt(client);
  const newAccountId = newAccountReceipt.accountId;
  console.log(`New Account Created: ${newAccountId}`);

  const tokenTicketsAccountId = process.env.REACT_APP_TOKEN_TICKETS_ACCOUNT_ID;
  const tokenTicketsPrivateKey =
    process.env.REACT_APP_TOKEN_TICKETS_PRIVATE_KEY;

  console.log("\nCreating and minting new Token...");
  // Create and mint token
  const supplyKey = PrivateKey.generate();
  const newClient = Client.forTestnet();
  newClient.setOperator(newAccountId, newAccountPrivateKey);

  const tokenCreateTransaction = await new TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(newAccountId)
    .setSupplyKey(supplyKey)
    .freezeWith(newClient);

  const signedTokenCreateTransaction =
    await tokenCreateTransaction.sign(newAccountPrivateKey);
  const tokenCreateSubmit =
    await signedTokenCreateTransaction.execute(newClient);
  const tokenCreateReceipt = await tokenCreateSubmit.getReceipt(newClient);
  const tokenId = tokenCreateReceipt.tokenId;

  console.log(`Token Created: ${tokenId}`);

  const totalSupply = 5;
  console.log(`Minting ${totalSupply} tokens...`);

  for (let i = 1; i <= totalSupply; i++) {
    const metadata = `Token ${i} Metadata`;

    const tokenMintTransaction = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadata)])
      .freezeWith(newClient);

    const signedTokenMintTransaction =
      await tokenMintTransaction.sign(supplyKey);
    const tokenMintSubmit = await signedTokenMintTransaction.execute(newClient);
    const tokenMintReceipt = await tokenMintSubmit.getReceipt(newClient);
    const serialNumber = tokenMintReceipt.serials[0].toString();

    console.log(`Minted Token #${i} with Serial Number: ${serialNumber}`);
  }

  console.log(`Giving token ${tokenId} owned by ${newAccountId} allowance to ${tokenTicketsAccountId}...`);
  // Approve NFT allowance
  const nftAllowanceApprove = async (
    tId,
    owner,
    spender,
    treasuryKey,
    client
  ) => {
    const allowanceTransaction = new AccountAllowanceApproveTransaction()
      .approveTokenNftAllowanceAllSerials(tId, owner, spender)
      .freezeWith(client);

    const signedAllowanceTransaction =
      await allowanceTransaction.sign(treasuryKey);
    const allowanceSubmit = await signedAllowanceTransaction.execute(client);
    const allowanceReceipt = await allowanceSubmit.getReceipt(client);

    return allowanceReceipt;
  };

  const allowanceReceipt = await nftAllowanceApprove(
    tokenId,
    newAccountId,
    tokenTicketsAccountId,
    supplyKey,
    newClient
  );

  console.log(`Allowance approved. Status: ${allowanceReceipt.status}`);

  // Validate accounts
  console.log("\nValidating accounts...");
  await checkAccountValidity(newAccountId, newAccountPrivateKey.toString());
  await checkAccountValidity(tokenTicketsAccountId, tokenTicketsPrivateKey);
  await checkAccountValidity(myAccountId, myPrivateKey);

  console.log("Accounts validated successfully.");

  console.log(`\nTransfering NFT via allowance...`);
  // Transfer NFT using allowance
  const nftAllowanceTransfer = async (
    owner,
    receiver,
    nft,
    spender,
    spenderPrivateKey,
    client
  ) => {
    const transferTransaction = new TransferTransaction()
      .addApprovedNftTransfer(nft, owner, receiver)
      .setTransactionId(TransactionId.generate(spender))
      .freezeWith(client);

    const signedTransferTransaction =
      await transferTransaction.sign(spenderPrivateKey);
    const transferSubmit = await signedTransferTransaction.execute(client);
    const transferReceipt = await transferSubmit.getReceipt(client);

    return transferReceipt;
  };

  const nftToSend = new NftId(tokenId, 1);
  const transferReceipt = await nftAllowanceTransfer(
    newAccountId,
    myAccountId,
    nftToSend,
    tokenTicketsAccountId,
    PrivateKey.fromStringDer(tokenTicketsPrivateKey),
    client
  );


  console.log(
    `Attempted to transfer ${nftToSend} from ${newAccountId} to ${myAccountId} by allowance of ${tokenTicketsAccountId}`
  );
  console.log(`Allowance transfer status: ${transferReceipt.status}`);
};

environmentSetup().catch((error) => console.error("Error:", error));
