import { useEffect } from "react";
import { useActiveWallet } from "thirdweb/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Chain } from "thirdweb";

const LOCAL_STORAGE_KEY_ADDRESS = "walletAddress";
const LOCAL_STORAGE_KEY_CHAINID = "walletChainId";
const LOCAL_STORAGE_KEY_WALLET_ID = "walletId";

export function useWalletInfo() {
  const wallet = useActiveWallet();
  const queryClient = useQueryClient();

  const handleChainChange = (newChain: Chain | undefined) => {
    const newChainId = newChain?.id ?? null;

    localStorage.setItem(LOCAL_STORAGE_KEY_CHAINID, JSON.stringify(newChainId));
    queryClient.setQueryData(["chainId"], newChainId);
  };

  useEffect(() => {
    if (wallet) {
      const chain = wallet.getChain();
      const initialChainId = chain?.id ?? null;

      const account = wallet.getAccount();
      localStorage.setItem(LOCAL_STORAGE_KEY_ADDRESS, account?.address || "");

      localStorage.setItem(
        LOCAL_STORAGE_KEY_CHAINID,
        JSON.stringify(initialChainId),
      );

      const walletId = wallet.id;
      localStorage.setItem(LOCAL_STORAGE_KEY_WALLET_ID, walletId);

      queryClient.setQueryData(["chainId"], initialChainId);

      const unsubscribe = wallet.subscribe("chainChanged", handleChainChange);

      return () => {
        unsubscribe();
      };
    }
  }, [wallet, queryClient]);

  useEffect(() => {
    const storedAddress = localStorage.getItem(LOCAL_STORAGE_KEY_ADDRESS);
    const storedChainId = localStorage.getItem(LOCAL_STORAGE_KEY_CHAINID);
    const storedWalletId = localStorage.getItem(LOCAL_STORAGE_KEY_WALLET_ID);

    if (storedAddress) {
      queryClient.setQueryData(["address"], storedAddress);
    }

    if (storedChainId) {
      queryClient.setQueryData(["chainId"], JSON.parse(storedChainId));
    }

    if (storedWalletId) {
      queryClient.setQueryData(["walletId"], storedWalletId);
    }
  }, [queryClient]);

  const { data: address, isLoading: isAddressLoading } = useQuery(
    ["address"],
    async () => {
      if (wallet) {
        const account = wallet.getAccount();
        return account?.address || null;
      }
      return null;
    },
    {
      enabled: !!wallet,
      staleTime: 1000 * 60 * 5,
    },
  );

  const { data: chainId, isLoading: isChainIdLoading } = useQuery(
    ["chainId"],
    async () => {
      if (!wallet) {
        console.log("Wallet is undefined, skipping chainId query.");
        return null;
      }
      const chain = wallet.getChain();
      return chain?.id ?? null;
    },
    {
      enabled: !!wallet,
      staleTime: 1000 * 60 * 5,
    },
  );

  const { data: currentWalletId, isLoading: isWalletIdLoading } = useQuery(
    ["walletId"],
    async () => {
      return wallet?.id || null;
    },
    {
      enabled: !!wallet,
      staleTime: 1000 * 60 * 5,
    },
  );

  return {
    address,
    chainId,
    walletId: currentWalletId,
    isAddressLoading,
    isChainIdLoading,
    isWalletIdLoading,
  };
}
