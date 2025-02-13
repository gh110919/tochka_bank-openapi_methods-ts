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
    amount: number;
    currency: string;
    paymentPurpose: string;
    qrcType: string;
    imageParams: {
      width: number;
      height: number;
      mediaType: string;
    };
    sourceName: string;
    ttl: number;
    redirectUrl: string;
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
  merchantId: string;
  accountId: string;
  data: T;
}>;
/* Метод для регистрации статического или динамического QR-кода в Системе быстрых платежей */
export const registerQrCode = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { merchantId, accountId, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/qr-code/merchant/${merchantId}/${accountId}`;

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
