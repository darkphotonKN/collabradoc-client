import { getRequest } from "@/lib/api/requestHelpers";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type ResError = {
  errorMessage?: unknown;
  errorCode?: number;
  errorType?: string;
};

/*
 * Helper for http requests and saving the data in a react state together with life cycle.
 */
export default function useData<TDep, ResK>(
  endpoint: string,
  dependencies?: TDep[],
  auth?: boolean,
) {
  const [data, setData] = useState<ResK | null>();
  const [error, setError] = useState<ResError | null>();

  useEffect(() => {
    getData();
  }, [...(dependencies ?? [])]);

  async function getData() {
    const res = await getRequest<ResK>(endpoint, null, { auth });

    if (!res) return;

    if (res instanceof AxiosError) {
      setError({
        errorMessage: res.response?.data, // error message
        errorCode: res.response?.status, // error code
        errorType: res.code,
      });
      return;
    }

    setData(res);
  }

  return { data, error };
}
