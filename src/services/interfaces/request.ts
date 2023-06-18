import type { AxiosRequestConfig } from 'axios'

interface SavedPromise {
  url: string
  promise: Promise<any>
  options: AxiosRequestConfig
}

export interface SavedPromiseRecord {
  [key: string]: SavedPromise
}

export interface DisableStatusHandling {
  [key: number]: Boolean
}

export interface CustomPropertiesRequestConfig extends AxiosRequestConfig {
  disableStatusHandling?: DisableStatusHandling
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}