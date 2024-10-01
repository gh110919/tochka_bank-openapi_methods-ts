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
    address: string;
    city: string;
    countryCode: string;
    countrySubDivisionCode: string;
    zipCode: string;
    brandName: string;
    capabilities: string;
    contactPhoneNumber: string;
    mcc: string;
  };
};

type TResponse = {
  Data: {
    merchantId: string;
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

/* Метод для регистрации ТСП в Системе быстрых платежей */
export const registerMerchant = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { legalId, data } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/merchant/legal-entity/${legalId}`;

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
