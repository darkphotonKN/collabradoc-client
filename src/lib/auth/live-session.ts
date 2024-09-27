// -- Live Session Helpers --

import { ApiResponse } from "@/type/api";
import {
  getRequest,
  isErrorResponse,
  postRequest,
} from "../api/requestHelpers";

/**
 * Authrozies an existing live session via its sessionId. Returns a boolean indicating if that sessionId is authorized.
 **/
export async function authorizeLiveSession(
  sessionId: string,
): Promise<boolean> {
  console.log("Authorizing live session with sessionId:", sessionId);

  const response = await getRequest<ApiResponse<boolean>>(
    `/livesession/auth?sessionId=${sessionId}`,
    null,
    { auth: true },
  );

  if (!response || isErrorResponse(response)) return false;

  console.log("isAuthorized:", response.data);

  return response.data;
}

export async function getLiveSession(documentId: string) {}

/**
 * Creates a live session and returns the live session link.
 **/
export async function createLiveSession(
  documentId: number,
): Promise<string | undefined> {
  console.log("liveSessionLink getting with documentId:", documentId);

  const response = await postRequest<ApiResponse<string>>(
    "/livesession",
    { documentId },
    true,
  );

  if (!response || isErrorResponse(response)) return;

  const { data: newLiveSessionLink } = response;

  return newLiveSessionLink;
}

/**
 * Validate that document is a community doc
 **/
export async function isCommunityDoc(documentId: string): Promise<boolean> {
  return true;
}
