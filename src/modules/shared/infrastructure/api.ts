import { httpMethod } from '../domain/httpTypes';

interface Config {
  url: string;
  path: string;
  method: httpMethod;
  data?: any;
  onSuccess?: <T = any>(res: T) => void;
  onFailure?: (err: unknown) => void;
  extraConfig?: RequestInit;
}

export const fetchData = async ({ url, path, method, data, extraConfig, onFailure, onSuccess }: Config) => {
  try {
    const response = await fetch(url + path, {
      method,
      body: data,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorId': '12345678',
      },
      ...extraConfig,
    });
    const json = await response.json();
    onSuccess?.(json);
  } catch (error) {
    console.log('error', error);
    onFailure?.(error);
  }
};