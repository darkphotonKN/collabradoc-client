import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from ".";

export async function getRequest<T, K extends Record<string, any>>(
	endpoint: string,
	params?: K,
): Promise<T | null | AxiosResponse<any | any>> {
	try {
		const response = await axiosInstance.get<T>(endpoint, {
			params: params,
		});

		return response?.data;
	} catch (err) {
		return handleAxiosError(err);
	}
}

export async function postRequest<T, K, V extends Record<string, any>>(
	endpoint: string,
	payload: K,
	params?: V,
): Promise<T | null | AxiosResponse<any | any>> {
	try {
		const response = await axiosInstance.post<T>(endpoint, payload, {
			params: params,
		});

		return response?.data;
	} catch (err) {
		return handleAxiosError(err);
	}
}

function handleAxiosError(err: unknown): AxiosResponse<any | any> | null {
	if (axios.isAxiosError(err)) {
		return err.response ?? null;
	}
	console.error("Error:", err);
	return null;
}
