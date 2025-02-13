import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T>;
}

type ApiMethod = 'get' | 'post' | 'put' | 'delete';

export function useApi<T>(
  method: ApiMethod,
  url: string,
  immediate = false
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService[method]<T>(url, ...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [method, url]
  );


  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []); 

  return { data, loading, error, execute };
}


export function useGet<T>(url: string, immediate = false) {
  return useApi<T>('get', url, immediate);
}

export function usePost<T>(url: string) {
  return useApi<T>('post', url);
}

export function usePut<T>(url: string) {
  return useApi<T>('put', url);
}

export function useDelete<T>(url: string) {
  return useApi<T>('delete', url);
}