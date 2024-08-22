import { useEffect, useState } from "react";
import { useActiveWallet } from "thirdweb/react";
import { useQueryClient, useQuery, QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

const LOCAL_STORAGE_KEY_ADDRESS = "thirdweb:active-address";

export function getUserConnected() {
  if (localStorage.getItem("thirdweb:active-wallet-id")) {
    return localStorage.getItem(LOCAL_STORAGE_KEY_ADDRESS);
  }
  return null;
}

function loadFromLocalStorage(queryClient: QueryClient) {
  const storedAddress = getUserConnected();

  if (storedAddress) {
    queryClient.setQueryData(["wallet", "address"], storedAddress);
  }
}

function saveToLocalStorage(address: string | null) {
  if (address) {
    localStorage.setItem(LOCAL_STORAGE_KEY_ADDRESS, address);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ADDRESS);
  }
}

function clearLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_ADDRESS);
}

export function useWalletInfo() {
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  const [isWalletConnected, setIsWalletConnected] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    loadFromLocalStorage(queryClient);
  }, [queryClient]);

  useEffect(() => {
    if (wallet) {
      const account = wallet.getAccount();

      const handleDisconnect = () => {
        console.log("Wallet disconnected");
        clearLocalStorage();
        queryClient.setQueryData(["wallet", "address"], null);
        setIsWalletConnected(false);
      };

      wallet.subscribe("disconnect", handleDisconnect);

      const initialAddress = account?.address || null;

      saveToLocalStorage(initialAddress);

      queryClient.setQueryData(["wallet", "address"], initialAddress);
      setIsWalletConnected(!!initialAddress);
    } else {
      clearLocalStorage();
      queryClient.setQueryData(["wallet", "address"], null);
      setIsWalletConnected(false);
    }
  }, [wallet, queryClient]);

  const { data: address, isLoading: isAddressLoading } = useQuery(
    ["wallet", "address"],
    () => {
      const storedAddress = localStorage.getItem(LOCAL_STORAGE_KEY_ADDRESS);
      return storedAddress || null;
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
