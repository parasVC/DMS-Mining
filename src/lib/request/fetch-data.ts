import { auth } from '@/auth';
import { FetcherProps } from './type';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchData = async ({
    url,
    method = "GET",
    body = null,
    options = {},
    headerOptions = {},
    token = false
} : FetcherProps): Promise<any> => {
  const baseUrl = process.env.NEXT_API_ENDPOINT;
  if (!baseUrl) {
    throw new Error("API endpoint is not configured");
  }

  // Prepare headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...headerOptions,
  };

  // Add authorization token if requested
  if (token) {
    const session = await auth();
    if (session?.session_id) {
      headers.authorization = `Bearer ${session.session_id}`;
    }
  }

  // Prepare request configuration
  const requestConfig = {
    method,
    headers,
    ...options,
    body: body ? JSON.stringify(body) : null,
  };
  const response = await fetch(`${baseUrl}/${url}`, requestConfig);
  if(response.status === 401) return {statusCode : 401};
  const result = await response.json();
  return result;
};
