import React, { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import { Grid, GridItem, Heading, Highlight, Text } from "@chakra-ui/react";
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
  const { data: currentTokenIdBigNumber, isPending: isPendingCurrentTokenId } = useReadContract({
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

  const { data, isPending: isPendingAllFetch } = useReadContracts({
    contracts: calls,
  });

  useEffect(() => {
    if (data) {
      const allTokensData: Token[] = [];
      for (let i = 0; i < data.length; i += 2) {
        const owner = data[i];
        const metadataResponse = data[i + 1];

        let metadata: TokenMetadata | null = null;
        if (metadataResponse?.result) {
          try {
            metadata = JSON.parse(metadataResponse.result) as TokenMetadata;
          } catch (error) {
            console.log(error)
          }
        }
        if (metadata && account?.address === owner) {
          allTokensData.push({
            tokenId: (i/2).toString(),
            owner: owner?.result,
            metadata,
          });
        }
      }
      setTokens(allTokensData);
    }
  }, [data]);

  console.log("is pendingg ", isPendingAllFetch)
  console.log("is length ", tokens.length)


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
      {isPendingAllFetch !== undefined && tokens.length === 0 ? (
        <Text>Sorry, you have no certification yet</Text>
      ) : (
        ""
      )}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isPendingAllFetch
          ? Array.from({ length: 4 }).map((_, index) => (
              <GridItem key={index} w="100%">
                <CertificationCardSkeleton />
              </GridItem>
            ))
          : tokens.map((token) => (
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
