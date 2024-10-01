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
    accountId: string;
    merchantId: string;
    legalId: string;
    createdAt: string;
    qrcId: string;
    amount: number;
    currency: string;
    paymentPurpose: string;
    paramsId: string;
    ttl: number;
    commission: {
      mcc: string;
      percent: number;
      description: string;
    };
    image: {
      width: number;
      height: number;
      mediaType: string;
      content: string;
    };
    redirectUrl: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  qrcId: string;
  data: T;
}>;
/* Метод для получения информации о кассовом QR-коде */
export const getCashboxQrcode = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { qrcId, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/cashbox-qr-code/${qrcId}`;

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
