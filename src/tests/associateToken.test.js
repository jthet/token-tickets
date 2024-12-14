const getClient = require("../services/local/account/getClient.js");
const associateToken = require("../services/local/tokens/associateToken.js"); // Adjust the import path as needed
const createAccount = require("../services/local/account/createAccount.js");

describe("associateToken", () => {
  test("placeholder", async () => {
    const client = getClient();

    const { receipt, newAccountPublicKey, newAccountPrivateKey } =
      await createAccount(client);
    const newAccountId = receipt.accountId;

    const tokenId = "0.0.5258853";

    const associateAccountRx = await associateToken(
      client,
      tokenId,
      newAccountId,
      newAccountPrivateKey
    );
    expect(associateAccountRx.status.toString()).toBe("SUCCESS");

    client.close();
  });
});
