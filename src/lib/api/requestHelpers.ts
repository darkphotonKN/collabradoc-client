import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from ".";
import { getToken } from "../auth/jwt";

type RequestOptions = {
  auth?: boolean;
};

export async function getRequest<T, K extends Record<string, any> = any>(
  endpoint: string,
  params?: K,
  options?: RequestOptions,
): Promise<T | null | AxiosError> {
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
): Promise<T | null | AxiosError> {
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

function handleAxiosError(err: unknown): AxiosError | null {
  console.error("Error:", err);
  if (axios.isAxiosError(err)) {
    return err;
  }
  return null;
}
