"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmi";

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface FarcasterContextValue {
  user: FarcasterUser | null;
  isLoading: boolean;
  isMiniApp: boolean;
}

const FarcasterContext = createContext<FarcasterContextValue>({
  user: null,
  isLoading: true,
  isMiniApp: false,
});

export function useFarcaster() {
  return useContext(FarcasterContext);
}

const queryClient = new QueryClient();

export function FarcasterProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMiniApp, setIsMiniApp] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const { sdk } = await import("@farcaster/miniapp-sdk");
        const context = await sdk.context;

        if (context?.user) {
          setIsMiniApp(true);
          setUser({
            fid: context.user.fid,
            username: context.user.username,
            displayName: context.user.displayName,
            pfpUrl: context.user.pfpUrl,
          });
        }

        await sdk.actions.ready();
      } catch {
        // Not running inside Farcaster client — regular browser
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  return (
    <FarcasterContext.Provider value={{ user, isLoading, isMiniApp }}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </FarcasterContext.Provider>
  );
}