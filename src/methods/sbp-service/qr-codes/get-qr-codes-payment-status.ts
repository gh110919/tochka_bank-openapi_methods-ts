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
    paymentList: {
      qrcId: string;
      code: string;
      status: string;
      message: string;
      trxId: string;
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
  qrc_ids: string;
  data: T;
}>;
/* Метод для получения статусов операций по динамическим QR-кодам */
export const getQrCodesPaymentStatus = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { qrc_ids } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/qr-codes/${qrc_ids}/payment-status`;

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
