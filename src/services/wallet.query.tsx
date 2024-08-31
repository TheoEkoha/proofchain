import { useEffect, useState } from "react";
import { useActiveWallet } from "thirdweb/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const LOCAL_STORAGE_KEY_ADDRESS = "thirdweb:active-address";

export function isUserConnected() {
  return localStorage.getItem("thirdweb:active-wallet-id");
}

// export function getUserConnected() {
//   if (localStorage.getItem("thirdweb:active-wallet-id")) {
//     return localStorage.getItem(LOCAL_STORAGE_KEY_ADDRESS);
//   }
//   return null;
// }

// function loadFromLocalStorage(queryClient: QueryClient) {
//   const storedAddress = getUserConnected();

//   if (storedAddress) {
//     queryClient.setQueryData(["wallet", "address"], storedAddress);
//   }
// }

// function saveToLocalStorage(address: string | null) {
//   if (address) {
//     localStorage.setItem(LOCAL_STORAGE_KEY_ADDRESS, address);
//   } else {
//     localStorage.removeItem(LOCAL_STORAGE_KEY_ADDRESS);
//   }
// }

// function clearLocalStorage() {
//   localStorage.removeItem(LOCAL_STORAGE_KEY_ADDRESS);
// }

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

      // Utilisation du hook addListener pour gérer les déconnexions
      wallet.addListener("disconnect", handleDisconnect);

      // Nettoyage du listener lorsque le composant se démonte ou que le wallet change
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
