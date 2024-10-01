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
    merchantId: string;
    accountId: string;
    redirectUrl: string;
    imageParams: {
      width: number;
      height: number;
      mediaType: string;
    };
  };
};

type TResponse = {
  Data: {
    payload: string;
    qrcId: string;
    image: {
      width: number;
      height: number;
      mediaType: string;
      content: string;
    };
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
/* Метод для регистрации кассового QR-кода */
export const registerCashboxQrcode = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/cashbox-qr-code`;

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
