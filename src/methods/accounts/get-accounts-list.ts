import axios from "axios";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  Data: {
    Account: {
      customerCode: string;
      accountId: string;
      transitAccount: string;
      status: string;
      statusUpdateDateTime: string;
      currency: string;
      accountType: string;
      accountSubType: string;
      registrationDate: string;
      accountDetails: {
        schemeName: string;
        identification: string;
        name: string;
      }[];
    }[];
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  data: T;
}>;
/* Метод для получения списка доступных счетов */
export const getAccountsList = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/open-banking/${apiVersion}/accounts`;

  const headers = {
    Authorization: `Bearer ${process.env.TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await axios.get(url, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
