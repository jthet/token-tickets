import { AccountAllowanceApproveTransaction } from "@hashgraph/sdk";

export async function nftAllowanceFcn(
    tId,
    owner,
    spender,
    treasuryKey,
    client
  ) {

    const tokenTicketsAccountId =process.env.REACT_APP_TOKEN_TICKETS_ACCOUNT_ID;

    const allowanceTx = new AccountAllowanceApproveTransaction()
      .approveTokenNftAllowanceAllSerials(tId, owner, spender) // Can approve all serials under a NFT collection
      .freezeWith(client);
    const allowanceSign = await allowanceTx.sign(treasuryKey);
    const allowanceSubmit = await allowanceSign.execute(client);
    const allowanceRx = await allowanceSubmit.getReceipt(client);

    return allowanceRx;
  }
