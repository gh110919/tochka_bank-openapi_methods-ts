import "./src/server/server";

import { config } from "dotenv";
import path from "path";
import { auth } from "./src/oauth/auth";
import { getAllConsentsList } from "./src/methods/consents/get-all-consents-list";

config({ path: path.join(__dirname, "../env/.env") });

(async (env: NodeJS.ProcessEnv) => {
  auth(env);

  const accountId = env.ACCOUNT_ID;
  const customerCode = env.CUSTOMER_CODE;

  try {
    // /*  */
    // const transactions = await getAuthorizedCardTransactions({ accountId });
    // console.log("transactions", transactions.message.data.Data.Transactions[0]);
    // /*  */
    // const balance = await getBalanceInfo({ accountId });
    // console.log("balance", balance.message.data.Data.Balance[0]);
    // /*  */
    // const balancesList = await getBalancesList();
    // console.log("balancesList", balancesList.message.data.Data.Balance[0]);
    // /*  */
    // const accountInfo = await getAccountInfo({ accountId });
    // console.log("accountInfo", accountInfo.message.data.Data.accountDetails);
    // /*  */
    // const accountsList = await getAccountsList();
    // console.log("accountsList", accountsList.message.data.Data.Account);
    // /*  */
    // const customerInfo = await getCustomerInfo({ customerCode });
    // console.log("customerInfo", customerInfo.message.data.Data);
    // /*  */
    // const customersList = await getCustomersList();
    // console.log("customersList", customersList.message.data.Data);
    // /*  */
    // const statementsList = await getStatementsList({ limit: 5 });
    // console.log("statementsList", statementsList.message.data.Data.Statement);
    // /*  */
    // const operationList = await getPaymentOperationList({
    //   customerCode,
    //   fromDate: "2024-01-01",
    //   toDate: "2024-09-29",
    //   page: 1,
    //   perPage: 1000,
    //   status: "APPROVED",
    // });
    // console.log("operationList", operationList.message.data.Data.Operation);
    // /*  */
    // const consents = await getAllConsentsList();
    // console.log('consents', consents.message.data.Data)
    // /*  */
  } catch (error) {
    console.error(error);
  }
})(process.env);
