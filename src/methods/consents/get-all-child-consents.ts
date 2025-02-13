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
    Consent: {
      status: string;
      creationDateTime: string;
      statusUpdateDateTime: string;
      permissions: string[];
      expirationDateTime: string;
      consentId: string;
      customerCode: string;
      applicationName: string;
      clientId: string;
      isValid: boolean;
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
  consentId: string;
  data: T;
}>;
/* Метод для получения всех дочерних разрешений */
export const getAllChildConsents = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { consentId } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/consent/${apiVersion}/consents/${consentId}/child`;

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
