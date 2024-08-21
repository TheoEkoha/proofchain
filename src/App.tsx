import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import { client } from "./client";
import { chain } from "./main";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import Card from "./components/Card/Card.components";
import { LandingPage } from "./screens/LandingPage";

const wallets = [
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

export function App() {
  return (
    <>
      <LandingPage></LandingPage>
    </>
  );
}
