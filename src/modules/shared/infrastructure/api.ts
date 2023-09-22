import { httpMethod } from '../domain/httpTypes';

interface Config {
  url: string;
  path: string;
  method: httpMethod;
  data?: any;
  onSuccess?: (res: any) => void;
  onFailure?: (err: any) => void;
  extraConfig?: RequestInit;
}

export const callApi = async ({ url, path, method, data, extraConfig = {}, onFailure, onSuccess }: Config) => {
  try {
    const response = await fetch(url + path, {
      method,
      body: JSON.stringify(data),
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorId': '4444', // sublime
      }),
      ...extraConfig,
    });
    const json = await response.json();
    onSuccess?.(json);
  } catch (error) {
    console.log('error', error);
    onFailure?.(error);
  }
};