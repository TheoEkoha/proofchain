"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import { Grid, GridItem, Heading, Highlight } from "@chakra-ui/react";
import { useReadContract, useReadContracts, useAccount } from 'wagmi';
import { contractABI, contractConfig } from "../client";
import { Abi } from "viem";
import { random } from "lodash";

const smartContractAddressSepolia = import.meta.env.VITE_TEMPLATE_SMART_CONTRACT_ADDRESS_SEPOLIA as string;

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
  const { data: currentTokenIdBigNumber, isLoading: isLoadingCurrentTokenId } = useReadContract({
    ...contractConfig,
    functionName: 'getCurrentTokenId',
  });

  const currentTokenId = currentTokenIdBigNumber ? parseInt(currentTokenIdBigNumber.toString(), 10) : 0;
  const calls = Array.from({ length: currentTokenId }, (_, tokenId) => [
      {
        ...contractConfig,
        functionName: 'ownerOf',
        args: [tokenId],
      },
      {
        ...contractConfig,
        functionName: 'getTokenMetadata',
        args: [tokenId],
      },
    ]).flat();

  const { data, isLoading: isLoadingAllFetch } = useReadContracts({
    contracts: calls,
  });

  useEffect(() => {
    if (data) {
      const allTokensData: Token[] = [];
      for (let i = 0; i < data.length; i += 2) {
        const owner = data[i]?.result;
        const metadataResponse = data[i + 1]?.result;

        let metadata: TokenMetadata | null = null;
        if (metadataResponse) {
          try {
            metadata = JSON.parse(metadataResponse) as TokenMetadata;
          } catch (error) {
            console.log(error)
          }
        }
        if (metadata) {
          allTokensData.push({
            tokenId: (i/2).toString(),
            owner: owner,
            metadata,
          });
        }
      }
      console.log("allTokens", allTokensData)
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
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {isLoadingAllFetch
          ? Array.from({ length: 4 }).map((_, index) => (
              <GridItem key={index} w="100%">
                <CertificationCardSkeleton />
              </GridItem>
            ))
          : tokens.map((token, _index) => (
            <GridItem key={`grid-item-${token.tokenId}-${_index}`} w="100%">
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
