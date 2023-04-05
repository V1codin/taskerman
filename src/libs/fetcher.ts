import { ServerResponseError } from './error.service';

export default async function fetcher<JSON extends unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> | never {
  try {
    const response = await fetch(input, init);

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new ServerResponseError({
      code: data.code,
      message: data.message,
    });
  } catch (e) {
    if (e instanceof ServerResponseError) {
      throw e;
    }
    throw new ServerResponseError({
      code: 500,
      message: 'Error: Server does not response',
    });
  }
}
