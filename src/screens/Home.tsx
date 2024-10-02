"use client";

import React, { useEffect, useState } from "react";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import {
  Box,
  GridItem,
  Heading,
  Highlight,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useReadContract, useReadContracts, useAccount } from "wagmi";
import { contractABI, contractConfig } from "../client";
import { Abi } from "viem";
import { random } from "lodash";

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

export const Home = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const {
    data: currentTokenIdBigNumber,
    isLoading: isLoadingCurrentTokenId,
    error: currentTokenIdError,
  } = useReadContract({
    ...contractConfig,
    functionName: "getCurrentTokenId",
  });

  const currentTokenId = currentTokenIdBigNumber
    ? parseInt(currentTokenIdBigNumber.toString(), 10)
    : 0;
  const calls = Array.from({ length: currentTokenId }, (_, tokenId) => [
    {
      ...contractConfig,
      functionName: "ownerOf",
      args: [tokenId],
    },
    {
      ...contractConfig,
      functionName: "getTokenMetadata",
      args: [tokenId],
    },
  ]).flat();

  const {
    data,
    isLoading: isLoadingAllFetch,
    error: allFetchError,
  } = useReadContracts({
    contracts: calls,
  });

  useEffect(() => {
    if (data) {
      const allTokensData: Token[] = [];
      for (let i = 0; i < data.length; i += 2) {
        const owner = data[i]?.result;
        const metadataResponse = data[i + 1]?.result as string;

        let metadata: TokenMetadata | null = null;
        if (metadataResponse) {
          try {
            metadata = JSON.parse(metadataResponse) as TokenMetadata;
          } catch (error) {
            console.log("Failed to parse metadata:", error);
          }
        }
        if (metadata) {
          allTokensData.push({
            tokenId: (i / 2).toString(),
            owner: owner ? (owner as string) : "",
            metadata,
          });
        }
      }
      console.log("allTokens", allTokensData);
      setTokens(allTokensData);
    }
  }, [data]);

  return (
    <div>
      <Heading lineHeight="tall" pb={"2%"}>
        <Highlight
          query="claimed"
          styles={{ px: "2", py: "1", rounded: "full", bg: "blue.300" }}
        >
          ProofChain's claimed certificates
        </Highlight>
      </Heading>

      {/* Affichage des erreurs si présentes */}
      {currentTokenIdError && (
        <Text color="red.500">
          <p>Error fetching current token ID: {currentTokenIdError.message}</p>
        </Text>
      )}
      {allFetchError && (
        <Text color="red.500">
          <p>Error fetching tokens: {allFetchError.message}</p>
        </Text>
      )}

      <SimpleGrid minChildWidth="300px" columns={3} spacing="50px">
        {isLoadingAllFetch
          ? Array.from({ length: 3 }).map((_, index) => (
              <GridItem key={index} w="100%">
                <CertificationCardSkeleton />
              </GridItem>
            ))
          : tokens.map((token, _index) => (
              <Box key={`grid-item-${token.tokenId}-${_index}`} w="100%">
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
              </Box>
            ))}
      </SimpleGrid>
    </div>
  );
};
