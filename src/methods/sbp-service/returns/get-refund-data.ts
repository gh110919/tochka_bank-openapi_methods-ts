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
    requestId: string;
    status: string;
    statusDescription: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  request_id: string;
  data: T;
}>;
/* Метод для получения информация о платеже-возврате по Системе быстрых платежей */
export const getRefundData = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { request_id } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/refund/${request_id}`;

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
