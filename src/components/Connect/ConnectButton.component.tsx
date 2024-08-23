import { ConnectButton } from "thirdweb/react";
import { client } from "../../client";
import { chain, wallets } from "../../utils/wallet";

interface ConnectProps {
  label?: string;
}

export const Connect = (props: ConnectProps) => {
  const { label } = props;
  return (
    <div>
      <ConnectButton
        client={client}
        chain={chain}
        wallets={wallets}
        connectButton={{ label: label }}
        theme={"dark"}
        connectModal={{
          size: "wide",
          showThirdwebBranding: false,
        }}
      />
    </div>
  );
};
