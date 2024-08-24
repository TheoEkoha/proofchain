import React, { useEffect, useState } from "react";
import { useContract, useAddress, useContractRead } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { MultiStepFormData } from "./Mint/MultiStepForm";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import { Grid, GridItem } from "@chakra-ui/react";

const smartContractAddressSepolia = import.meta.env
  .VITE_TEMPLATE_SMART_CONTRACT_ADDRESS_SEPOLIA as string;

interface Token {
  tokenId: string;
  owner: string;
  metadata: MultiStepFormData;
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
  const [userTokens, setUserTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!contract) return;

      try {
        const currentTokenIdBigNumber: BigNumber =
          await contract.call("getCurrentTokenId");
        const currentTokenId = currentTokenIdBigNumber.toNumber();

        const allTokensData = [];
        const userTokensData = [];
        console.log(currentTokenId);

        for (let tokenId = 0; tokenId < currentTokenId; tokenId++) {
          try {
            const owner = await contract.call("ownerOf", [tokenId]);
            const metadata = await contract.call("getTokenMetadata", [tokenId]);

            const tokenData = {
              tokenId,
              owner,
              metadata: JSON.parse(metadata) as TokenMetadata,
            };

            allTokensData.push(tokenData);

            if (owner === address) {
              userTokensData.push(tokenData);
            }
          } catch (error) {
            console.error(`Failed to fetch token ${tokenId}:`, error);
          }
        }

        console.log("-> ", allTokensData);
        setAllTokens(allTokensData);
        setUserTokens(userTokensData);
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    fetchTokens();
  }, [contract, address]);

  return (
    <div>
      <h2>All Minted Tokens</h2>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {allTokens.map((token) => {
          console.log(token.metadata.image);
          return (
            <GridItem w="100%">
              {/* <p>{token.metadata.image}</p> */}
              <CertificationCard
                key={token.tokenId}
                title={token.metadata.title}
                image={token.metadata.image}
                // image={
                //   "https://bafybeibyi76ano76qoxb53ar3u4437eke5ekpo3m2mog3mn345o555oyja.ipfs.dweb.link/CW3BD%20screen.png"
                // }
                status={CertificationStatus.CERTIFIED}
                emitor={token.metadata.emitor}
                tagsValue={token.metadata.tags}
                description={token.metadata.description}
              />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
};
