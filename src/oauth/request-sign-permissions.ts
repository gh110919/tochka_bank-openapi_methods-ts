import axios from "axios";
import { stringify } from "querystring";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  code: string;
};

type TParams<T> = Partial<{
  client_id: string;
  consent_id: string;
  data: T;
}>;
/* Сформируйте запрос на подписание списка разрешений и попросите пользователя подтвердить список */
export const requestSignPermissions = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, consent_id } = params!;

  const redirectQuery = `&${stringify({
    scope: "accounts balances customers statements sbp payments acquiring",
    consent_id,
  })}`;

  /* https://brontosaur.ru/request_sign_permissions */
  const redirect_uri = `http://localhost/request_sign_permissions/${redirectQuery}`;

  const query = `?${stringify({
    client_id,
    response_type: "code id_token",
    state: "Vuihvsds",
    redirect_uri,
  })}`;

  const url = `https://enter.tochka.com/connect/authorize${query}`;

  try {
    return {
      success: true,
      message: await axios.get(url),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
