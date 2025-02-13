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
    currency: string;
    paymentPurpose: string;
    ttl: number;
  };
};

type TResponse = {
  Data: {
    qrcId: string;
    amount: number;
    currency: string;
    paramsId: string;
    paymentPurpose: string;
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
/* Метод для активации кассового QR-кода */
export const activateCashboxQrcode = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { qrcId, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/cashbox-qr-code/${qrcId}/activate`;

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
