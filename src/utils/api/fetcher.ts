import { ServerResponseError } from '@/libs/error.service';

export default async function fetcher<TResult extends unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<TResult> {
  try {
    const response = await fetch(input, init);

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');

    const data = isJson ? await response.json() : await response.text();

    if (response.ok) {
      return data as TResult;
    }

    const castedData = data as TError;

    throw new ServerResponseError({
      code: castedData.code,
      message: castedData.message,
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
