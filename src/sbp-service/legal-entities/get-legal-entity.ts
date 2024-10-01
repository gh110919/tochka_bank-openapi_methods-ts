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
    status: string;
    legalId: string;
    createdAt: string;
    address: string;
    city: string;
    countryCode: string;
    countrySubDivisionCode: string;
    zipCode: string;
    customerCode: string;
    entityType: string;
    inn: string;
    kpp: string;
    name: string;
    ogrn: string;
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
/* Метод для получения данных юрлица в Системе быстрых платежей */
export const getLegalEntity = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { legalId } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/legal-entity/${legalId}`;

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
