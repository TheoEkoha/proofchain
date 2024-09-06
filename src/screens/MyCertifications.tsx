import React, { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import { Box, Grid, GridItem, Heading, Highlight, SimpleGrid, Text } from "@chakra-ui/react";
import { client, contractConfig } from "../client";
import { useAccount, useReadContract, useReadContracts } from "wagmi";

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
  const account = useAccount()
  const [tokens, setTokens] = useState<Token[]>([]);

  const { data: currentTokenIdBigNumber, isLoading: isLoadingCurrentTokenId } = useReadContract({
    ...contractConfig,
    functionName: 'getCurrentTokenId',
  });

  const currentTokenId = currentTokenIdBigNumber ? parseInt(currentTokenIdBigNumber.toString(), 10) : 0;
    const availableTokenCalls = Array.from({ length: currentTokenId }, (_, tokenId) => [
      {
        ...contractConfig,
        functionName: 'getTokenState',
        args: [tokenId]
      }
    ]).flat();

  const { data: availableTokenCallData, isLoading: isLoadingAvailableTokenCall } = useReadContracts({
    contracts: availableTokenCalls,
  });

  const availableTokensList = [];
  let calls = [];
  
  if (availableTokenCallData && !isLoadingAvailableTokenCall && !isLoadingCurrentTokenId) {
    for (const [index, availableToken] of (availableTokenCallData as any).entries()) {
      if (availableToken && availableToken?.result.length > 0 && (availableToken?.result as any)[0]) {
        availableTokensList.push(index);
      }
    }
    for (const tokenId of availableTokensList) {
      calls.push(
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
      )
    }
  }

  const { data, isLoading: isLoadingAllFetch } = useReadContracts({
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
            console.log(error)
          }
        }

        if (metadata && account?.address === owner) {
          allTokensData.push({
            tokenId: (i/2).toString(),
            owner: owner ? owner as string : "",
            metadata,
          });
        }
      }
      setTokens(allTokensData);
    }
  }, [data]);

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
      {!isLoadingAllFetch  && tokens.length === 0 ? (
        <Text>Sorry, you have no certification yet</Text>
      ) : (
        ""
      )}
      <SimpleGrid minChildWidth="300px" columns={3} spacing='50px'>
        {isLoadingAllFetch
          ? Array.from({ length: 4 }).map((_, index) => (
              <Box key={index} w="100%">
                <CertificationCardSkeleton />
              </Box>
            ))
          : tokens.map((token) => (
              <Box key={token.tokenId} w="100%">
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
