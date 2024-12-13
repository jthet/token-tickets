import { PrivateKey, AccountCreateTransaction, Hbar } from '@hashgraph/sdk';

async function createAccount(client) {
  // returns receipt, newAccountPublicKey, newAccountPrivateKey in DER format
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  // creating new account with 1000 tinybars
  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);
  const receipt = await newAccount.getReceipt(client);
  // const newAccountId = receipt.accountId;
  return { receipt, newAccountPublicKey, newAccountPrivateKey };
}

export default createAccount;
