import fetcher from './fetcher';

import {
  API_BOARDS_URL,
  API_BOARD_UPDATE_URL,
  API_MEMBERS_URL,
  API_SIGNUP_URL,
  API_SINGLE_BOARD_URL,
  API_USER_DELETE_URL,
  API_USER_GET_URL,
  API_USER_UPDATE_URL,
  AUTH_TOKEN_COOKIE_NAME,
  API_NOTIFICATIONS_URL,
  isServer,
  API_NOTIFICATION_DECLINE_URL,
  API_NOTIFICATION_CONFIRM_URL,
} from '../constants';

import type {
  ApiNS,
  CurrentProtocol,
  HttpNS,
  HttpProtocol,
  RequestConfig,
  TMethods,
} from '@/types/api';

type TFetch = <JSON extends unknown>(
  input: RequestInfo,
  init?: RequestInit,
) => Promise<JSON> | never;

class HttpService<TFetcher extends TFetch> implements HttpProtocol {
  private urls: HttpNS.IUrls;
  private readonly fetch: TFetcher;

  constructor(urls: HttpNS.IUrls, fetcher: TFetcher) {
    this.urls = urls;
    this.fetch = fetcher;
  }

  revalidateData<TResult extends unknown>(path: string) {
    return this.fetch<TResult>(`/api/revalidate?path=${path}`);
  }

  private getJsonTypeHeaders() {
    return {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  private getAuthHeaders(authProps?: HttpNS.TAuthProps) {
    if (!authProps) {
      return '';
    }

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

  private getUrlParamsFromObj(data: Record<string, string> | null): string {
    if (!data) {
      return '';
    }

    return Object.entries(data).reduce((acc, [key, prop], index, arr) => {
      return (acc += `${key}=${prop}${index === arr.length - 1 ? '' : '&'}`);
    }, '?');
  }

  private getReadUrl(
    type: TEntities,
    additionalParams: string = '',
    additionalPath: string = '',
    pagination?: ApiNS.TPagination,
  ) {
    if (!pagination) {
      return this.urls[type].GET['single'] + additionalPath + additionalParams;
    }

    // ? if there is no end point of pagination
    // ? make request of all boards that belong to requesting user
    const start = pagination[0];
    const end = typeof pagination[1] !== 'undefined' ? pagination[1] : '';
    // TODO handle pagination on the server
    return (
      this.urls[type].GET['paginated'] +
      additionalPath +
      additionalParams +
      `&pagination=${start}-${end}`
    );
  }

  private getUrl<TEntity extends TEntities>(
    type: TEntity,
    method: keyof HttpNS.TUrl,
  ) {
    if (typeof this.urls[type][method] === 'string') {
      return this.urls[type][method];
    }
    return this.urls[type][method] as HttpNS.TGetUrls;
  }

  read<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TGetData<TEntities>,
    getConfig: RequestConfig = {},
  ) {
    const additionalParams = this.getUrlParamsFromObj(data);

    const url = this.getReadUrl(
      type,
      additionalParams,
      getConfig.additionalPath,
      getConfig.pagination,
    );
    const options = this.getFetcherOptions('GET');

    options.headers['Authorization'] = this.getAuthHeaders(getConfig.authProps);

    return this.fetch<TResult>(url, options);
  }

  create<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TCreateData<TEntities>,
  ) {
    const url = this.urls[type].POST;
    const options = this.getFetcherOptions('POST', data);

    return this.fetch<TResult>(url, options);
  }

  delete<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TDeleteData<TEntities>,
  ) {
    const additionalParams = this.getUrlParamsFromObj(data || {});
    const url = this.getUrl(type, 'DELETE') + additionalParams;
    const options = this.getFetcherOptions('DELETE');

    return this.fetch<TResult>(url, options);
  }

  update<TResult extends unknown>(
    type: TEntities,
    data: ApiNS.TUpdateData<TEntities>,
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

  revalidateData(path: string) {
    return this.protocol.revalidateData<{ revalidated: true; now: Date }>(path);
  }

  read<
    TRequestEntity extends TEntities,
    TResult extends ApiNS.IReturnType[TRequestEntity]['read'],
  >(
    type: TRequestEntity,
    data: ApiNS.TGetData<TRequestEntity>,
    getConfig: RequestConfig = {},
  ) {
    return this.protocol.read<TResult, TRequestEntity>(type, data, getConfig);
  }

  create<T extends TEntities, TResult extends ApiNS.IReturnType[T]['create']>(
    type: T,
    data: ApiNS.TCreateData<T>,
  ) {
    return this.protocol.create<TResult>(type, data);
  }

  delete<T extends TEntities, TResult extends ApiNS.IReturnType[T]['delete']>(
    type: T,
    data: ApiNS.TDeleteData<T>,
  ) {
    return this.protocol.delete<TResult>(type, data);
  }

  update<T extends TEntities, TResult extends ApiNS.IReturnType[T]['update']>(
    type: T,
    data: ApiNS.TUpdateData<T>,
  ) {
    return this.protocol.update<TResult>(type, data);
  }
}

const http = new HttpService(
  {
    board: {
      DELETE: API_BOARDS_URL,
      POST: API_BOARDS_URL,
      PATCH: API_BOARD_UPDATE_URL,
      GET: {
        single: API_SINGLE_BOARD_URL,
        paginated: API_BOARDS_URL,
      },
    },
    user: {
      POST: API_SIGNUP_URL,
      DELETE: API_USER_DELETE_URL,
      PATCH: API_USER_UPDATE_URL,
      GET: {
        single: API_USER_GET_URL,
      },
    },
    board_members: {
      GET: {
        single: API_MEMBERS_URL,
      },
      POST: API_MEMBERS_URL,
      DELETE: API_MEMBERS_URL,
      PATCH: API_MEMBERS_URL,
    },
    notification: {
      GET: {
        single: API_NOTIFICATIONS_URL,
      },
      POST: API_NOTIFICATIONS_URL,
      DELETE: API_NOTIFICATIONS_URL,
      PATCH: API_NOTIFICATIONS_URL,
    },
    notification_decline: {
      GET: {
        single: API_NOTIFICATION_DECLINE_URL,
      },
      POST: API_NOTIFICATION_DECLINE_URL,
      PATCH: API_NOTIFICATION_DECLINE_URL,
      DELETE: API_NOTIFICATION_DECLINE_URL,
    },
    notification_confirm: {
      GET: {
        single: API_NOTIFICATION_CONFIRM_URL,
      },
      POST: API_NOTIFICATION_CONFIRM_URL,
      PATCH: API_NOTIFICATION_CONFIRM_URL,
      DELETE: API_NOTIFICATION_CONFIRM_URL,
    },
    record: {
      GET: {
        single: '',
      },
      DELETE: '',
      PATCH: '',
      POST: '',
      PUT: '',
    },
  },
  fetcher,
);

export const api = new Api(http);
