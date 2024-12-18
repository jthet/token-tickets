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
  AccountAllowanceApproveTransaction,
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
  // change token name/symbol //
  //////////////////////////////

  const token_name = "New York Trip";
  const token_symbol = "NYC2024";

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

  ///////////////////////////////////////////////////////////////////////////
  // Token Tickets User info
  const tokenTicketsAccountId = process.env.REACT_APP_TOKEN_TICKETS_ACCOUNT_ID;
  const tokenTicketsPrivateKey =
    process.env.REACT_APP_TOKEN_TICKETS_PRIVATE_KEY;
  const tokenTicketsPublicKey = process.env.REACT_APP_TOKEN_TICKETS_PUBLIC_KEY;
  console.log("Token Tickets Account ID: " + tokenTicketsAccountId);
  console.log("Token Tickets Private Key: " + tokenTicketsPrivateKey);
  console.log("Token Tickets Public Key: " + tokenTicketsPublicKey);

  ///////////////////////////////////////////////////////////////////////////

  const newClient = Client.forTestnet();
  newClient.setOperator(newAccountId, newAccountPrivateKey);

  const supplyKey = PrivateKey.generate();
  console.log("Supply Key: " + supplyKey.toString());

  // Create token
  const tokenCreateTx = await new TokenCreateTransaction()
    .setTokenName(token_name)
    .setTokenSymbol(token_symbol)
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

  // Mint 10 NFTs and presign transactions
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
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  console.log(`\nSTEP 2 ===================================\n`);
  console.log(`- Treasury approving NFT allowance for Token Tickets...\n`);

  async function nftAllowanceFcn(tId, owner, spender, treasuryKey, client) {
    const allowanceTx = new AccountAllowanceApproveTransaction()
      .approveTokenNftAllowanceAllSerials(tId, owner, spender) // Can approve all serials under a NFT collection
      .freezeWith(client); // Freeze the transaction first
    const allowanceSign = await allowanceTx.sign(treasuryKey); // Sign with treasury key
    const allowanceSubmit = await allowanceSign.execute(client); // Submit the allowance transaction
    const allowanceRx = await allowanceSubmit.getReceipt(client); // Get the receipt

    return allowanceRx; // Return the receipt of the approval transaction
  }

  console.log(`- Token ID: ${tokenId}`);
  console.log(`- Owner Account ID: ${newAccountId}`);
  console.log(`- Spender Account ID: ${tokenTicketsAccountId}`);
  console.log(`- Treasury Key: ${supplyKey}`);

  // Approve the allowance for the Token Tickets account to manage all serials
  const allowanceApproveNftRx = await nftAllowanceFcn(
    tokenId,
    newAccountId, // Owner account
    tokenTicketsAccountId, // Spender account (Token Tickets account)
    supplyKey, // Supply key (for signing the transaction)
    newClient
  );

  console.log("Receipt:", allowanceApproveNftRx);

  console.log(
    `Account ${tokenTicketsAccountId} given allowance for ${tokenId}`
  );

  console.log(`- Allowance approval status: ${allowanceApproveNftRx.status}`);

  // Save Event to MongoDB
  const newEvent = new Event({
    tokenId: tokenId.toString(),
    supplyKey: supplyKey.toString(),
    tokenName: token_name,
    tokenSymbol: token_symbol,
    tokenMemo: "Some memo", // Customize as necessary
    maxSupply: 10,
    transactionStatus: "SUCCESS",
    serialNumbers: serialNumbers,
    organizerAccountId: newAccountId.toString(),
  });

  await newEvent.save();
  console.log("Event saved to database successfully.");

  // Save Tickets to MongoDB
  for (const serialNumber of serialNumbers) {
    const newTicket = new Ticket({
      tokenId: tokenId.toString(),
      tokenName: token_name,
      tokenSymbol: token_symbol,
      serialNumber: serialNumber,
      price: serialNumber, // Adjust price as necessary
      ownerAccount: newAccountId.toString(),
    });

    await newTicket.save();
    console.log(`Ticket #${serialNumber} saved to database.`);
  }
};

environmentSetup().catch((error) => console.error("Error:", error));
