"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "jotai";
import { ViewTransitions } from 'next-view-transitions'
import React from "react";

export const DefaultProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ViewTransitions>
    <Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
    </ViewTransitions>
  );
};

export default DefaultProviders;
