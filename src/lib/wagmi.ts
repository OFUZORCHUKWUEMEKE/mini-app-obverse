import { createConfig, http } from "wagmi";
import { base, monad } from "wagmi/chains";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

export const wagmiConfig = createConfig({
  chains: [base, monad],
  transports: {
    [base.id]: http(),
    [monad.id]: http(),
  },
  connectors: [farcasterMiniApp()],
});