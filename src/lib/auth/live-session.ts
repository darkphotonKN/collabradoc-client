// -- Live Session Helpers --

import { ApiResponse } from "@/type/api";
import { getRequest, postRequest } from "../api/requestHelpers";
import { AxiosError } from "axios";

export async function authorizeLiveSession(
  sessionId: string,
): Promise<boolean> {
  console.log("Authorizing live session with sessionId:", sessionId);

  const response = await getRequest<ApiResponse<boolean>>(
    `/livesession/auth?sessionId=${sessionId}`,
    null,
    { auth: true },
  );

  if (!response || response instanceof AxiosError) return false;

  console.log("isAuthorized:", response.data);

  return response.data;
}

export async function getLiveSession(documentId: string) { }

export async function createLiveSession(
  documentId: number,
): Promise<string | undefined> {
  console.log("liveSessionLink getting with documentId:", documentId);

  const response = await postRequest<ApiResponse<string>>(
    "/livesession",
    { documentId },
    true,
  );

  // use narrowing / type guard to return error state
  if (!response || response instanceof AxiosError) return;

  const { data: newLiveSessionLink } = response;

  return newLiveSessionLink;
}
