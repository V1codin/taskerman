import fetcher from './fetcher';

import {
  API_BOARDS_URL,
  API_BOARD_UPDATE_URL,
  API_LISTS_URL,
  API_LIST_UPDATE_URL,
  API_SIGNUP_URL,
  API_SINGLE_BOARD_URL,
  API_USER_DELETE_URL,
  API_USER_GET_URL,
  API_USER_UPDATE_URL,
  AUTH_TOKEN_COOKIE_NAME,
  BASE_URL,
  isServer,
} from '../constants';

import type { ApiNS, HttpNS, Protocol, TMethods } from '@/types/api';

type TFetch = <JSON extends unknown>(
  input: RequestInfo,
  init?: RequestInit,
) => Promise<JSON> | never;

// * CurrentAuthProps could be null if it is not needed in another protocol impl
type CurrentAuthProps = HttpNS.TAuthProps;

type HttpProtocol = Protocol<CurrentAuthProps>;
type CurrentProtocol = HttpProtocol;

class Http implements HttpProtocol {
  private urls: HttpNS.IUrls;
  private fetch: TFetch;

  constructor(urls: HttpNS.IUrls, fetcher: TFetch) {
    this.urls = urls;
    this.fetch = fetcher;
  }

  private getJsonTypeHeaders() {
    return {
      'Content-type': 'application/json; charset=utf-8',
    };
  }

  private getAuthHeaders(authProps: HttpNS.TAuthProps) {
    if (authProps && authProps.token) {
      return `Bearer ${authProps.token}`;
    }

    if (!isServer()) {
      const token = localStorage.getItem(AUTH_TOKEN_COOKIE_NAME) || '';
      return `Bearer ${token}`;
    }
    return 'Bearer ';
  }

  private getFetcherOptions<T extends unknown>(method: TMethods, data?: T) {
    const headers: HeadersInit = this.getJsonTypeHeaders();
    if (method !== 'GET') {
      return {
        method: method,
        headers,
        body: JSON.stringify(data),
      };
    }

    return {
      method: method,
      headers,
    };
  }

  private getUrl(
    pagination: ApiNS.TPagination,
    type: ApiNS.TEntities,
    data: ApiNS.TGetData<ApiNS.TEntities>,
  ) {
    const parsed = Object.entries(data).reduce((acc, [key, prop]) => {
      return (acc += `?${key}=${prop}`);
    }, '');

    if (!pagination) {
      return this.urls[type].GET['single'] + parsed;
    }

    // TODO handle pagination on the server
    return (
      this.urls[type].GET['paginated'] +
      parsed +
      `&pagination=${pagination[0]}-${pagination[1]}`
    );
  }

  read<TResult extends unknown>(
    type: ApiNS.TEntities,
    data: ApiNS.TGetData<ApiNS.TEntities>,
    pagination: ApiNS.TPagination,
    authProps: CurrentAuthProps,
  ) {
    const url = this.getUrl(pagination, type, data);
    const options = this.getFetcherOptions('GET');

    options.headers['Authorization'] = this.getAuthHeaders(authProps);
    return this.fetch<TResult>(url, options);
  }

  create<TResult extends unknown>(
    type: ApiNS.TEntities,
    data: ApiNS.TCreateData<ApiNS.TEntities>,
  ) {
    const url = this.urls[type].POST;
    const options = this.getFetcherOptions('POST', data);

    return this.fetch<TResult>(url, options);
  }

  delete<TResult extends unknown>(
    type: ApiNS.TEntities,
    data: ApiNS.TDeleteData<ApiNS.TEntities>,
  ) {
    const url = this.urls[type].DELETE;
    const options = this.getFetcherOptions('DELETE', data);

    return this.fetch<TResult>(url, options);
  }

  update<TResult extends unknown>(
    type: ApiNS.TEntities,
    data: ApiNS.TUpdateData<ApiNS.TEntities>,
  ) {
    const url = this.urls[type].PATCH;

    const options = this.getFetcherOptions('PATCH', data);

    return this.fetch<TResult>(url, options);
  }
}

class Api {
  private protocol: CurrentProtocol;
  constructor(dataTransfer: CurrentProtocol) {
    this.protocol = dataTransfer;
  }

  read<T extends ApiNS.TEntities, TResult extends ApiNS.IReturnType[T]['read']>(
    type: T,
    data: ApiNS.TGetData<T>,
    pagination: ApiNS.TPagination,
    authProps: CurrentAuthProps,
  ) {
    return this.protocol.read<TResult, T>(type, data, pagination, authProps);
  }

  create<
    T extends ApiNS.TEntities,
    TResult extends ApiNS.IReturnType[T]['create'],
  >(type: T, data: ApiNS.TCreateData<T>) {
    return this.protocol.create<TResult>(type, data);
  }

  delete<
    T extends ApiNS.TEntities,
    TResult extends ApiNS.IReturnType[T]['delete'],
  >(type: T, data: ApiNS.TDeleteData<T>) {
    return this.protocol.delete<TResult>(type, data);
  }

  update<
    T extends ApiNS.TEntities,
    TResult extends ApiNS.IReturnType[T]['update'],
  >(type: T, data: ApiNS.TUpdateData<T>) {
    return this.protocol.update<TResult>(type, data);
  }
}

const http = new Http(
  {
    board: {
      DELETE: `${BASE_URL}${API_BOARDS_URL}`,
      POST: `${BASE_URL}${API_BOARDS_URL}`,
      PATCH: `${BASE_URL}${API_BOARD_UPDATE_URL}`,
      GET: {
        single: `${BASE_URL}${API_SINGLE_BOARD_URL}`,
        paginated: `${BASE_URL}${API_BOARDS_URL}`,
      },
    },
    list: {
      POST: `${BASE_URL}${API_LISTS_URL}`,
      DELETE: `${BASE_URL}${API_LISTS_URL}`,
      PATCH: `${BASE_URL}${API_LIST_UPDATE_URL}`,
      GET: {
        single: `${BASE_URL}${API_LISTS_URL}`,
      },
    },
    user: {
      POST: `${BASE_URL}${API_SIGNUP_URL}`,
      DELETE: `${BASE_URL}${API_USER_DELETE_URL}`,
      PATCH: `${BASE_URL}${API_USER_UPDATE_URL}`,
      GET: {
        single: `${BASE_URL}${API_USER_GET_URL}`,
      },
    },
  },
  fetcher,
);

export const api = new Api(http);
