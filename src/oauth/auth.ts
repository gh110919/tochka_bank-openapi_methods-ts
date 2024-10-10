import { checkAccessToken } from "./check-access-token";
import { exchangeCodeAccess } from "./exchange-code-access";
import { exchangeRefreshToken } from "./exchange-refresh-token";
import { getTokenPermissions } from "./get-token-permissions";
import { requestSignPermissions } from "./request-sign-permissions";
import { setPermissions } from "./set-permissions";

export const auth = async (env: NodeJS.ProcessEnv) => {
  const client_id = env.CLIENT_ID;
  const client_secret = env.CLIENT_SECRET;

  const tokenPermissions = await getTokenPermissions({
    client_id,
    client_secret,
  });

  const permissions = await setPermissions({
    access_token: tokenPermissions.message.data.access_token,
    data: {
      Data: {
        permissions: [
          "ReadAccountsBasic",
          "ReadAccountsDetail",
          "MakeAcquiringOperation",
          "ReadAcquiringData",
          "ReadBalances",
          "ReadStatements",
          "ReadCustomerData",
          "ReadSBPData",
          "EditSBPData",
          "CreatePaymentForSign",
          "CreatePaymentOrder",
          "ManageWebhookData",
          "ManageInvoiceData",
        ],
      },
    },
  });

  const signPermissions = await requestSignPermissions({
    client_id: permissions.message.data.Data.clientId,
    consent_id: permissions.message.data.Data.consentId,
  });

  console.log("signPermissions", signPermissions); 

  const access = await exchangeCodeAccess({
    client_id,
    client_secret,
    code: signPermissions.message.data.code,
  });

  const refresh = await exchangeRefreshToken({
    client_id,
    client_secret,
    refresh_token: access.message.data.refresh_token,
  });

  const jwtToken = await checkAccessToken({
    access_token: refresh.message.data.access_token,
  });

  // console.log("jwtToken", jwtToken);
};
