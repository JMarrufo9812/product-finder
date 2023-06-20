import axios, { AxiosError, AxiosResponse } from 'axios';
import type {
  SavedPromiseRecord,
  DisableStatusHandling,
  CustomPropertiesRequestConfig,
} from '@/services/interfaces/request';
import { API_ROOT, TOKEN } from '@/config/enviroment';

const client = axios.create({
  baseURL: API_ROOT,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Error de servidor:', error)
    return Promise.reject(error);
  }
);

const pendingPromises: SavedPromiseRecord = {};

function setPromise(
  options: CustomPropertiesRequestConfig,
  promise: Promise<unknown>
) {
  const { url } = options;
  pendingPromises[url] = {
    url,
    promise,
    options,
  };
}

function getPromise(options: CustomPropertiesRequestConfig) {
  const { url } = options;
  const saved = pendingPromises[url];
  if (
    saved &&
    typeof saved !== 'undefined' &&
    JSON.stringify(saved.options) === JSON.stringify(options)
  ) {
    return saved.promise;
  } else {
    return null;
  }
}

function removePromise(options: CustomPropertiesRequestConfig) {
  const saved = pendingPromises[options.url];
  if (saved && JSON.stringify(saved.options) === JSON.stringify(options)) {
    pendingPromises[options.url] = null;
  }
}

export async function makeRequest<T>(
  options: CustomPropertiesRequestConfig,
  mappingFunction: Function,
  disableStatusHandling?: DisableStatusHandling
): Promise<T> {

  options.headers = { 
    ...options.headers,
    Authorization: TOKEN,
  }

  const currentPromise = getPromise(options);
  if (currentPromise) {
    return currentPromise;
  }
  if (disableStatusHandling) {
    options.disableStatusHandling = disableStatusHandling;
  }
  const promise = new Promise<T>((resolve, reject) => {
    client
      .request(options)
      .then(
        (data: AxiosResponse<T>) => {
          resolve(mappingFunction(data.data, data.headers));
        },
        (error: AxiosError) => {
          reject(error);
        }
      )
      .finally(() => {
        removePromise(options);
      });
  });
  setPromise(options, promise);
  return promise;
}