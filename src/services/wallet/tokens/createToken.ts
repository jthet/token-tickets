import {
  AccountId,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} from "@hashgraph/sdk";
import { executeTransaction, hc } from "../wallet/hashconnect.ts";

/**
 * Handles creating a new token on the Hedera network.
 * @param fromAccountId - The account ID of the event organizer.
 * @param tokenDetails - Details for the token (name, symbol, memo).
 * @returns The result of the transaction execution.
 */
export const handleCreateToken = async (
  fromAccountId: string,
  tokenDetails: { name: string; symbol: string; memo: string }
) => {
  try {
    if (!fromAccountId) {
      throw new Error("No connected account found.");
    }

    const { name, symbol, memo } = tokenDetails;

    const supplyKey = PrivateKey.generateED25519();
    const signer = hc.getSigner(AccountId.fromString(fromAccountId));

    const frozenTransaction = await new TokenCreateTransaction()
      .setTokenName(name || "Default Token Name")
      .setTokenSymbol(symbol || "DEFAULT")
      .setTokenMemo(memo || "No Memo Provided")
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(fromAccountId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(500)
      .setSupplyKey(supplyKey)
      .freezeWithSigner(signer);

    const executeResult = await executeTransaction(
      AccountId.fromString(fromAccountId),
      frozenTransaction
    );

    console.log("Transaction Result:", executeResult);
    return executeResult; // Return the result for additional processing
  } catch (err) {
    console.error("Token creation failed:", err);
    throw err; // Throw the error for the caller to handle
  }
};
