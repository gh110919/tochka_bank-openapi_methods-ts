import axios from "axios";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  Data: {
    bankCode: string;
    accountCode: string;
    amount: string;
    currency: string;
    qrcId: string;
    purpose: string;
    refTransactionId: string;
  };
};

type TResponse = {
  Data: {
    requestId: string;
    status: string;
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
/* Метод запрашивает возврат платежа через Систему быстрых платежей */
export const startRefund = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/refund`;

  const headers = {
    Authorization: `Bearer ${process.env.TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await axios.post(url, data, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
