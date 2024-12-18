import {
  TokenAssociateTransaction,
  TransferTransaction,
  PrivateKey,
  AccountId,
  Hbar,
} from "@hashgraph/sdk";
import { executeTransaction, hc } from "../wallet/hashconnect.ts";

/**
 * Handles purchasing a ticket by associating the token and transferring ownership.
 * @param tokenId - The ID of the NFT ticket token.
 * @param serialNumber - The serial number of the NFT.
 * @param buyerAccountId - The account ID of the buyer.
 * @param price - The price of the ticket in HBAR.
 * @param supplyKey - The supply key used to sign the transfer.
 * @param ownerAccountId - The account ID of the current ticket owner (seller).
 */
export const handleBuyTicket = async (
  tokenId: string,
  serialNumber: number,
  buyerAccountId: string,
  price: number,
  supplyKey: string,
  ownerAccountId: string
) => {
  try {
    if (!buyerAccountId) {
      throw new Error("Buyer account is missing.");
    }

    console.log(`Starting purchase for Ticket #${serialNumber}...`);
    const signer = hc.getSigner(AccountId.fromString(buyerAccountId));
    const supplyKeyObj = PrivateKey.fromStringDer(supplyKey); // Convert supplyKey to PrivateKey object

    // Step 1: Associate the buyer account with the token
    console.log("Associating buyer account with token...");
    const associateTx = await new TokenAssociateTransaction()
      .setAccountId(buyerAccountId)
      .setTokenIds([tokenId])
      .freezeWithSigner(signer);

    try {
      const associateResult = await executeTransaction(
        AccountId.fromString(buyerAccountId),
        associateTx
      );

      console.log("Token association successful:", associateResult);
    }
    catch (err) {
      console.error("Error during token association, token may already be associated:", err);
    }

    // Step 2: Transfer NFT (Ticket) and payment
    console.log("Executing transfer transaction...");
    const transferTx = await new TransferTransaction()
      .addNftTransfer(tokenId, serialNumber, ownerAccountId, buyerAccountId) // Transfer NFT ownership
      .addHbarTransfer(buyerAccountId, -price) // Deduct HBAR from buyer
      .addHbarTransfer(ownerAccountId, price) // Send HBAR to the seller (owner)
      .freezeWithSigner(signer);

    // Step 3: Sign transaction with supplyKey
    const signedTx = await transferTx.sign(supplyKeyObj); // Sign using the supplyKey

    // Step 4: Execute transfer transaction
    const transferResult = await executeTransaction(
      AccountId.fromString(buyerAccountId),
      signedTx
    );

    console.log("Ticket purchased successfully:", transferResult);
    return transferResult;
  } catch (err) {
    console.error("Error during ticket purchase:", err);
    throw err;
  }
};
