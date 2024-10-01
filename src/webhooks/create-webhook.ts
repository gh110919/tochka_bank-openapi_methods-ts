import axios from "axios";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  webhooksList: string[];
  url: string;
};

type TResponse = {
  Data: {
    webhooksList: string[];
    url: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  client_id: string;
  data: T;
}>;
/* Метод для создания вебхуков */
export const createWebhook = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/webhook/${apiVersion}/${client_id}`;

  const headers = {
    Authorization: `Bearer ${process.env.TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await axios.put(url, { headers, data }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
