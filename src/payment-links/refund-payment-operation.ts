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
    amount: string;
  };
};

type TResponse = {
  Data: {
    isRefund: boolean;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  operationId: string;
  data: T;
}>;
/* Метод для возврата платежа по карте */
export const refundPaymentOperation = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { operationId, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/acquiring/${apiVersion}/payments/${operationId}/refund`;

  const headers = {
    Authorization: `Bearer ${process.env.TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await axios.post(url, { headers, data }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
