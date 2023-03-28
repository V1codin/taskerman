import { ServerResponseError } from './error.service';

export default async function fetcher<JSON extends unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const response = await fetch(input, init);

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new ServerResponseError({
    message: data.message || response.statusText,
    code: data.code || response.status,
  });
}
