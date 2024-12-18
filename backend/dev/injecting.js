#!/usr/bin/env node


// This script makes a new account and injects database with 1 event and 10 tickets
const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
  TokenCreateTransaction,
  TokenType,
  TokenMintTransaction,
} = require("@hashgraph/sdk");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const environmentSetup = async () => {
  await connectDB();

  //////////////////////////////
  // change token symbol here //
  //////////////////////////////

  const token_name = "Art Expo 2025";
  const token_symbol = "ARTEXPO";

  //////////////////////////////
  // change token symbol here //
  //////////////////////////////

  const myAccountId = process.env.OPERATOR_ACCOUNT_ID;
  const myPrivateKey = process.env.OPERATOR_ACCOUNT_PRIVATE_KEY_DER;

  if (!myAccountId || !myPrivateKey) {
    throw new Error("Environment variables not found");
  }

  const client = Client.forTestnet();
  client.setOperator(myAccountId, PrivateKey.fromString(myPrivateKey));

  // Create a new account with 5 HBAR
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new Hbar(5))
    .execute(client);

  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  console.log("The new account ID is: " + newAccountId);
  console.log(
    "The new account private key is: " + newAccountPrivateKey.toString()
  );
  console.log(
    "The new account public key is: " + newAccountPublicKey.toString()
  );

  const newClient = Client.forTestnet();
  newClient.setOperator(newAccountId, newAccountPrivateKey);

  const supplyKey = PrivateKey.generate();
  console.log("Supply Key: " + supplyKey.toString());

  const tokenCreateTx = await new TokenCreateTransaction()
    .setTokenName("Art Expo 2025")
    .setTokenSymbol("ARTEXPO")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(newAccountId)
    .setSupplyKey(supplyKey)
    .freezeWith(newClient);

  const tokenCreateSign = await tokenCreateTx.sign(newAccountPrivateKey);
  const tokenCreateSubmit = await tokenCreateSign.execute(newClient);
  const tokenCreateRx = await tokenCreateSubmit.getReceipt(newClient);
  const tokenId = tokenCreateRx.tokenId;

  console.log("Token ID: " + tokenId);

  // mint 10 nfts
  console.log("Minting 10 tokens...");
  const serialNumbers = [];

  for (let i = 1; i <= 10; i++) {
    const metadata = `Token ${i} Metadata`;
    const tokenMintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadata)])
      .freezeWith(newClient)
      .sign(supplyKey);

    const tokenMintSubmit = await tokenMintTx.execute(newClient);
    const tokenMintRx = await tokenMintSubmit.getReceipt(newClient);
    const serialNumber = tokenMintRx.serials[0].toString();

    serialNumbers.push(Number(serialNumber));
    console.log(`Minted Token #${i} with Serial Number: ${serialNumber}`);

    const newTicket = new Ticket({
      tokenId: tokenId.toString(),
      tokenName: token_name,
      tokenSymbol: token_symbol,
      serialNumber: Number(serialNumber),
      price: 100 + i, // Example price in HBAR
      ownerAccount: newAccountId.toString(),
    });

    await newTicket.save();
    console.log(`Ticket with Serial #${serialNumber} saved to database.`);
  }
  const newEvent = new Event({
    tokenId: tokenId.toString(),
    supplyKey: supplyKey.toString(),
    tokenName: token_name,
    tokenSymbol: token_symbol,
    maxSupply: 10,
    transactionStatus: "SUCCESS",
    serialNumbers: serialNumbers,
    organizerAccountId: newAccountId.toString(),
  });

  await newEvent.save();
  console.log("Event saved to database successfully.");

  client.close();
};

environmentSetup().catch((error) => console.error("Error:", error));
