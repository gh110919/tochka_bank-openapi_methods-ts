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
    status: string;
  };
};

type TResponse = {
  Data: {
    result: boolean;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  legalId: string;
  data: T;
}>;
/* Метод устанавливает статус юрлица в Системе быстрых платежей */
export const setLegalEntityStatus = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { legalId, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/legal-entity/${legalId}`;

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
