import {
  TokenAssociateTransaction,
  TransferTransaction,
  PrivateKey,
  AccountId,
  Hbar,
  NftId,
  TransactionId,
  Client,
  Status,
} from "@hashgraph/sdk";
import { executeTransaction, hc } from "../wallet/hashconnect.ts";

/**
 * Handles purchasing a ticket by associating the token and executing a dynamic transfer.
 * @param tokenId - The ID of the NFT ticket token.
 * @param serialNumber - The serial number of the NFT.
 * @param buyerAccountId - The account ID of the buyer.
 * @param price - The price of the ticket in HBAR.
 * @param ownerAccountId - The account ID of the current ticket owner (seller).
 */
export const handleBuyTicket = async (
  tokenId: string,
  serialNumber: number,
  fromAccountId: string,
  price: number,
  ownerAccountId: string // The seller's account ID
) => {
  try {
    if (!fromAccountId) {
      throw new Error("Buyer account is missing.");
    }

    console.log(`Starting purchase for Ticket #${serialNumber}...`);
    const signer = hc.getSigner(AccountId.fromString(fromAccountId));

    // Fetch the credentials from environment variables
    const tokenTicketsAccountId =
      process.env.REACT_APP_TOKEN_TICKETS_ACCOUNT_ID;
    const tokenTicketsPrivateKey =
      process.env.REACT_APP_TOKEN_TICKETS_PRIVATE_KEY;

    if (!tokenTicketsAccountId || !tokenTicketsPrivateKey) {
      throw new Error("Token Tickets credentials are missing.");
    }

    const sellerPrivateKey = PrivateKey.fromStringDer(tokenTicketsPrivateKey);

    // Associate Buyer account
    console.log("Associating buyer account with token...");
    try {
      const associateTx = await new TokenAssociateTransaction()
        .setAccountId(fromAccountId)
        .setTokenIds([tokenId])
        .freezeWithSigner(signer);

      await executeTransaction(
        AccountId.fromString(fromAccountId),
        associateTx
      );
      console.log("Token association successful.");
    } catch (err) {
      console.warn(
        "Token may already be associated with the buyer's account:",
        err.message
      );
    }

    // Create transfer transaction
    console.log("Creating transfer transaction...");
    const nftId = new NftId(tokenId, serialNumber);
    console.log(
      `Attempting to sell tokenId: ${tokenId} with serial number: ${serialNumber}`
    );

    // Set up the Hedera client with Token Tickets account as operator
    const client = Client.forTestnet();
    client.setOperator(
      tokenTicketsAccountId,
      PrivateKey.fromStringDer(tokenTicketsPrivateKey)
    );

    // The NFT will be transferred from the seller to the buyer
    const transferTx = await new TransferTransaction()
      .addApprovedNftTransfer(nftId, ownerAccountId, fromAccountId) // Transfer NFT ownership (approved)
      .addHbarTransfer(fromAccountId, new Hbar(-price)) // Deduct HBAR from buyer
      .addHbarTransfer(ownerAccountId, new Hbar(price)) // Send HBAR to seller
      .setTransactionId(TransactionId.generate(tokenTicketsAccountId)) // Set transaction ID
      .freezeWith(client); // Freeze the transaction after all transfers are added

    console.log("Signing the transaction...");
    const signedTx = await transferTx.sign(sellerPrivateKey); // Sign with seller's private key

    // const freeze2 = signedTx.freezeWithSigner(signer);


    // const signedTxId2 = signedTx.signWithSigner(signer);

    console.log("Executing transfer transaction...");
    // const transferResult = await signedTxId2.execute(client); // Execute the transaction
    // const transferResult = await signedTx.executeWith(client); // Execute the transaction

    await executeTransaction(AccountId.fromString(fromAccountId), signedTx);

    console.log("Ticket purchased successfully:", transferResult);
    return transferResult;
  } catch (err) {
    console.error("Error during ticket purchase:", err.message || err);
    throw err;
  }
};
