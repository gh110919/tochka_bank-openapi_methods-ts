import axios from "axios";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};
let a = null;
type TRequest = null;

type TResponse = {
  Data: {
    MerchantList: {
      status: string;
      createdAt: string;
      address: string;
      city: string;
      countryCode: string;
      countrySubDivisionCode: string;
      zipCode: string;
      merchantId: string;
      legalId: string;
      brandName: string;
      capabilities: string;
      contactPhoneNumber: string;
      mcc: string;
      additionalContacts: {}[];
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
  legalId: string;
  data: T;
}>;
/* Метод для получения списка ТСП юрлица */
export const getMerchantsList = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { legalId } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/merchant/legal-entity/${legalId}`;

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
