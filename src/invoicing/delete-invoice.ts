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
    result: boolean;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  customerCode: string;
  documentId: string;
  data: T;
}>;
/* Метод для удаления счета на оплату */
export const deleteInvoice = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode, documentId } = params!;

  const apiVersion = process.env.API_VERSION;

  const url = `https://enter.tochka.com/uapi/invoice/${apiVersion}/bills/${customerCode}/${documentId}`;

  const headers = {
    Authorization: `Bearer ${process.env.TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await axios.delete(url, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
