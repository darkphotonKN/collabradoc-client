import { getRequest, isErrorResponse } from "@/lib/api/requestHelpers";
import { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type ResError = {
  errorMessage?: unknown;
  errorCode?: number;
  errorType?: string;
};

export type ApiResponse<DataT> = {
  status: number;
  message: string;
  data: DataT;
};

/*
 * Helper for http requests and saving the data in a react state together with life cycle.
 */
export default function useData<ResT, DepT>(
  endpoint: string,
  dependencies?: DepT[],
  auth?: boolean,
) {
  const [response, setResponse] = useState<ApiResponse<ResT> | null>();
  const [error, setError] = useState<ResError | null>();

  useEffect(() => {
    getData();
  }, [...(dependencies ?? [])]);

  async function getData() {
    const res = await getRequest<ApiResponse<ResT>>(endpoint, null, { auth });

    if (!res) return;

    if (isErrorResponse(res)) {
      if (res instanceof AxiosError) {
        setError({
          errorMessage: res.response?.data, // error message
          errorCode: res.response?.status, // error code
          errorType: res.code,
        });
      }
      console.error(res);
      return;
    }

    setResponse(res);
  }

  return { response, error };
}
