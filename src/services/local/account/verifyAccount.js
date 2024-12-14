import { PrivateKey, AccountInfoQuery } from '@hashgraph/sdk';

/**
 * Verifies that the provided account ID and private key match.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Client} [params.client=getClient()] - The Hedera client instance.
 * @param {string} params.accountId - The account ID to verify.
 * @param {string} params.privateKeyString - The private key in DER format to verify.
 * @returns {Promise<boolean>} - Returns true if the private key matches the account ID, false otherwise.
 * @throws {Error} - Throws an error if the account ID or private key is invalid.
 */
async function verifyAccountIdAndPrivateKey(
  client,
  accountId,
  privateKeyString
) {
  // client here is only used to submit api requests.
  try {
    if (!accountId || !privateKeyString) {
      throw new Error('Both accountId and privateKeyString are required');
    }
    // Derive the public key from the private key
    try {
      const privateKey = PrivateKey.fromStringDer(privateKeyString);
    } catch (error) {
      throw new Error('Invalid private key (must be DER encoded):\n', error);
    }

    const privateKey = PrivateKey.fromStringDer(privateKeyString);
    const publicKey = privateKey.publicKey;

    // get account information from account ID
    const accountInfo = await new AccountInfoQuery()
      .setAccountId(accountId)
      .execute(client);
    // public key associated with the accountID
    const accountPublicKey = accountInfo.key;

    // comparing public key from private key to public key from accountID
    if (publicKey.toString() === accountPublicKey.toString()) {
      return true; // The private key matches the AccountID
    } else {
      return false; // The private key does not match the AccountID
    }
  } catch (error) {
    console.error('Error verifying account ID and private key:', error);
    return false;
  }
}

async function verifyAccount(client, accountId, privateKeyString) {
  const isVerified = await verifyAccountIdAndPrivateKey(
    client,
    accountId,
    privateKeyString
  );

  if (!isVerified) {
    throw new Error(
      "Invalid treasury account ID or private key. Keys don't match"
    );
  }
  // console.log('Treasury Account ID and Private Key verified');
}

export default verifyAccount;
