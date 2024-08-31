import React, { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract, useActiveWallet } from "thirdweb/react";
import { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import { Grid, GridItem, Heading, Highlight, Text } from "@chakra-ui/react";
import { client } from "../client";

const smartContractAddressSepolia = import.meta.env
  .VITE_TEMPLATE_SMART_CONTRACT_ADDRESS_SEPOLIA as string;

interface Token {
  tokenId: string;
  owner: string;
  metadata: TokenMetadata;
}

export interface TokenMetadata {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  tags: string[];
  issuedBy: string;
  issuedOn: string;
  file: string;
  image: string;
  identifiant: string;
}

export const MyCertifications = () => {
  const wallet = useActiveWallet(); // Obtention du portefeuille actif
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (wallet) {
      const account = wallet.getAccount();
      setAddress(account?.address ?? null);
    }
  }, [wallet]);

  // Initialise le contrat
  const contract = getContract({
    client, // Assurez-vous que `client` est défini correctement
    address: smartContractAddressSepolia,
    chain: sepolia,
  });

  // Fonction pour lire le nombre de tokens actuels
  const { data: currentTokenIdBigNumber } = useReadContract({
    contract,
    method: "function getCurrentTokenId() returns (uint256)",
    params: [],
  });

  // Si `currentTokenIdBigNumber` est undefined, initialisez à 0
  const currentTokenId = currentTokenIdBigNumber
    ? BigNumber.from(currentTokenIdBigNumber).toNumber()
    : 0;

  const fetchTokens = async (): Promise<Token[]> => {
    if (!contract || !currentTokenId || !address) return [];

    const userTokensData: Token[] = [];

    for (let tokenId = 0; tokenId < currentTokenId; tokenId++) {
      try {
        const currentTokenState: [boolean] = await contract.call(
          "getTokenState",
          [BigNumber.from(tokenId)],
        );

        if (currentTokenState[0]) {
          const owner = await contract.call("ownerOf", [
            BigNumber.from(tokenId),
          ]);

          if (owner === address) {
            const metadata = await contract.call("getTokenMetadata", [
              BigNumber.from(tokenId),
            ]);

            const tokenData: Token = {
              tokenId: tokenId.toString(),
              owner,
              metadata: JSON.parse(metadata) as TokenMetadata,
            };
            userTokensData.push(tokenData);
          }
        }
      } catch (error) {
        console.error(`Failed to fetch token ${tokenId}:`, error);
      }
    }

    return userTokensData;
  };

  const {
    data: userTokensData = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["tokens", contract, address], fetchTokens, {
    enabled: !!contract && !!address,
    onError: (err) => {
      console.error("Query failed: ", err);
    },
  });

  if (error) {
    return <div>Error fetching tokens: {(error as Error).message}</div>;
  }

  return (
    <div>
      <Heading lineHeight="tall" pb={"2%"}>
        <Highlight
          query="certifications"
          styles={{ px: "2", py: "1", rounded: "full", bg: "blue.300" }}
        >
          My certifications
        </Highlight>
      </Heading>
      {!isLoading && userTokensData.length === 0 ? (
        <Text>Sorry, you have no certification yet</Text>
      ) : (
        ""
      )}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <GridItem key={index} w="100%">
                <CertificationCardSkeleton />
              </GridItem>
            ))
          : userTokensData.map((token) => (
              <GridItem key={token.tokenId} w="100%">
                <CertificationCard
                  title={token.metadata.title}
                  image={token.metadata.image}
                  issuedBy={token.metadata.issuedBy}
                  issuedOn={token.metadata.issuedOn}
                  identifiant={token.metadata.identifiant}
                  tagsValue={token.metadata.tags}
                  description={token.metadata.description}
                  shareable
                />
              </GridItem>
            ))}
      </Grid>
    </div>
  );
};
