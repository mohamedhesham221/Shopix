'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProvider = ({children}) => {
  const queryClient = React.useMemo(() => new QueryClient(), []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
};

export default ReactQueryProvider;