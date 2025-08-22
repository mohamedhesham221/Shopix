// ReactQueryProvider.jsx
// Wrapper provider for React Query setup in Next.js (App Router).
// - Creates a single QueryClient instance using useMemo
// - Exposes QueryClientProvider around the app
// - Central place to extend configuration (devtools, cache time, retry, etc.)

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