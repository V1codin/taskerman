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
    code: data.code || response.status || 500,
    message:
      data.message || response.statusText || 'Error: Server does not response',
  });
}
