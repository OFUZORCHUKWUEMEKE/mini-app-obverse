import { createConfig, http } from "wagmi";
import { base, monadTestnet } from "wagmi/chains";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

export const wagmiConfig = createConfig({
  chains: [base, monadTestnet],
  transports: {
    [base.id]: http(),
    [monadTestnet.id]: http(),
  },
  connectors: [farcasterMiniApp()],
});