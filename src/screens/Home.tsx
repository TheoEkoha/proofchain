import React, { useEffect, useState } from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
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
  emitor: string;
  dateOfObtention: string;
  file: string;
  image: string;
  identifiant: string;
}

export const Home = () => {
  const { contract } = useContract(smartContractAddressSepolia);
  const address = useAddress();
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!contract) return;

      try {
        const currentTokenIdBigNumber: BigNumber =
          await contract.call("getCurrentTokenId");
        const currentTokenId = currentTokenIdBigNumber.toNumber();

        const allTokensData = [];

        for (let tokenId = 0; tokenId < currentTokenId; tokenId++) {
          try {
            const currentTokenState: [boolean] = await contract.call(
              "getTokenState",
              [tokenId],
            );
            if (currentTokenState[0]) {
              const owner = await contract.call("ownerOf", [tokenId]);
              const metadata = await contract.call("getTokenMetadata", [
                tokenId,
              ]);

              const tokenData = {
                tokenId,
                owner,
                metadata: JSON.parse(metadata) as TokenMetadata,
              };

              allTokensData.push(tokenData);
            }
          } catch (error) {
            console.error(`Failed to fetch token ${tokenId}:`, error);
          }
        }

        setAllTokens(allTokensData);
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [contract, address]);

  return (
    <div>
      <Heading lineHeight="tall" pb={"2%"}>
        <Highlight
          query="minted"
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          All minted certifications
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
                  title={token.metadata.title}
                  image={token.metadata.image}
                  status={CertificationStatus.CERTIFIED}
                  emitor={token.metadata.emitor}
                  tagsValue={token.metadata.tags}
                  description={token.metadata.description}
                />
              </GridItem>
            ))}
      </Grid>
    </div>
  );
};
