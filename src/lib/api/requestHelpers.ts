import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from ".";
import { getToken } from "../auth/jwt";

type RequestOptions = {
  auth?: boolean;
};

export type ErrorResponse = {
  __type: "Error";
  status: number;
  message: string;
};

export async function getRequest<T, K extends Record<string, any> = any>(
  endpoint: string,
  params?: K,
  options?: RequestOptions,
): Promise<T | null | ErrorResponse> {
  try {
    const { auth } = options ?? {};

    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    const response = await axiosInstance.get<T>(endpoint, {
      params: params,
      headers,
    });

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function postRequest<T, K = any>(
  endpoint: string,
  payload: K,
  auth?: boolean,
): Promise<T | null | ErrorResponse> {
  try {
    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const response = await axiosInstance.post<T>(endpoint, payload, {
      headers,
    });

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function patchRequest<T, K = any>(
  endpoint: string,
  payload: K,
  auth?: boolean,
): Promise<T | null | ErrorResponse> {
  try {
    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const response = await axiosInstance.patch<T>(endpoint, payload, {
      headers,
    });

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

function handleAxiosError(err: unknown): ErrorResponse {
  console.error("Error:", err);
  if (axios.isAxiosError(err)) {
    return {
      __type: "Error",
      status: err?.response?.data?.status || 400,
      message: err?.response?.data?.message || err.message,
    };
  }
  return { __type: "Error", status: 500, message: "Unknown error occured." };
}

// custom type guard narrowing
export function isErrorResponse(res: any): res is ErrorResponse {
  return res && (res as ErrorResponse).__type === "Error";
}
