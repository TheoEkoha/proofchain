import { defineChain } from "thirdweb";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";

export const ARTITRUM_SEPOLIA = 421614;
export const ARTITRUM_ONE = 42161;
export const chain = defineChain(ARTITRUM_SEPOLIA);

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("me.rainbow"),
];
