'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
