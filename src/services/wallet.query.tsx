import { useEffect, useState } from "react";
import { useActiveWallet } from "thirdweb/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const LOCAL_STORAGE_KEY_ADDRESS = "thirdweb:active-address";

export function isUserConnected() {
  return localStorage.getItem("thirdweb:active-wallet-id");
}

export function useWalletInfo() {
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  const [isWalletConnected, setIsWalletConnected] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    if (wallet) {
      wallet.getAddress().then((address) => {
        const initialAddress = address || null;
        queryClient.setQueryData(["wallet", "address"], initialAddress);
        setIsWalletConnected(!!initialAddress);
      });

      const handleDisconnect = () => {
        console.log("Wallet disconnected");
        queryClient.setQueryData(["wallet", "address"], null);
        setIsWalletConnected(false);
      };

      wallet.addListener("disconnect", handleDisconnect);

      return () => {
        wallet.removeListener("disconnect", handleDisconnect);
      };
    } else {
      console.log("No wallet connected");
      queryClient.setQueryData(["wallet", "address"], null);
      setIsWalletConnected(false);
    }
  }, [wallet, queryClient]);

  const { data: address, isLoading: isAddressLoading } = useQuery(
    ["wallet", "address"],
    () => {
      return wallet?.getAddress() || null;
    },
    {
      enabled: !!wallet,
      staleTime: 1000 * 60 * 5,
    },
  );

  return {
    address,
    isAddressLoading,
    isWalletConnected,
  };
}
