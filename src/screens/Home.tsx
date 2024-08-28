import React from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import { Grid, GridItem, Heading, Highlight } from "@chakra-ui/react";

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
  const { contract } = useContract(smartContractAddressSepolia);
  const address = useAddress();

  const fetchTokens = async (): Promise<Token[]> => {
    if (!contract) return [];

    const currentTokenIdBigNumber: BigNumber =
      await contract.call("getCurrentTokenId");
    const currentTokenId = currentTokenIdBigNumber.toNumber();

    const allTokensData: Token[] = [];

    for (let tokenId = 0; tokenId < currentTokenId; tokenId++) {
      try {
        const currentTokenState: [boolean] = await contract.call(
          "getTokenState",
          [tokenId],
        );

        if (currentTokenState[0]) {
          const owner = await contract.call("ownerOf", [tokenId]);
          const metadata = await contract.call("getTokenMetadata", [tokenId]);

          const tokenData: Token = {
            tokenId: tokenId.toString(),
            owner,
            metadata: JSON.parse(metadata) as TokenMetadata,
          };

          allTokensData.push(tokenData);
        }
      } catch (error) {
        console.error(`Failed to fetch token ${tokenId}:`, error);
      }
    }

    return allTokensData;
  };

  const {
    data: allTokens = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["tokens", contract?.getAddress(), address], fetchTokens, {
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
          query="claimed"
          styles={{ px: "2", py: "1", rounded: "full", bg: "blue.300" }}
        >
          ProofChain's claimed certificates
        </Highlight>
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <GridItem key={index} w="100%">
                <CertificationCardSkeleton />
              </GridItem>
            ))
          : allTokens.map((token) => (
              <GridItem key={token.tokenId} w="100%">
                <CertificationCard
                  owner={token.owner}
                  title={token.metadata.title}
                  image={token.metadata.image}
                  status={CertificationStatus.CERTIFIED}
                  issuedBy={token.metadata.issuedBy}
                  issuedOn={token.metadata.issuedOn}
                  identifiant={token.metadata.identifiant}
                  tagsValue={token.metadata.tags}
                  description={token.metadata.description}
                  displayDivider
                />
              </GridItem>
            ))}
      </Grid>
    </div>
  );
};
