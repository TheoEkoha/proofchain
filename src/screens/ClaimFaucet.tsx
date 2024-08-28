import React from "react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import CertificationCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCardSkeleton from "../components/Card/CertificationCardSkeleton.component";
import {
  Button,
  Heading,
  Highlight,
  Stack,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import step1 from "../assets/images/step1.webp";
import step2 from "../assets/images/step2.webp";
import step3 from "../assets/images/step3.webp";

export const ClaimFaucet = () => {
  return (
    <div>
      <Heading lineHeight="tall" pb={"2%"}>
        <Highlight
          query="Claim"
          styles={{ px: "2", py: "1", rounded: "full", bg: "blue.300" }}
        >
          Claim ETH
        </Highlight>
      </Heading>
      <Heading as="h4" size="md" lineHeight="tall">
        Follow instructions to claim free ETH to create your digital
        certificate, it allows you to sign transactions on blockchain
      </Heading>
      <Heading as="h6" size="xs" lineHeight="tall" pb={"2%"}>
        Be careful, this is not real money, this is only on testnet network
        (Arbitrum Sepolia), thanks
      </Heading>
      <Stack pb={"3%"}>
        <Heading as="h2" size="xl" lineHeight="tall">
          1. Visit Thirdweb Faucet
        </Heading>
        <Text>
          Click on
          <Link target="_blank" href="https://thirdweb.com/arbitrum-sepolia">
            {" https://thirdweb.com/arbitrum-sepolia "}
          </Link>
          to access Arbitrum Sepolia Faucet
        </Text>
      </Stack>
      <Stack pb={"3%"}>
        <Heading as="h2" size="xl" lineHeight="tall">
          2. Connect
        </Heading>
        <Text>You can use your wallet or classic auth</Text>
        <Stack direction="row">
          <Image src={step1} alt="Dan Abramov" />
        </Stack>
      </Stack>
      <Stack pb={"3%"}>
        <Heading as="h2" size="xl" lineHeight="tall">
          3. Claim your free ETH
        </Heading>
        <Text>You can get 0,01 ETH/day.</Text>
        <Stack direction="row">
          <Image src={step3} alt="Dan Abramov" />
        </Stack>
      </Stack>
      <Stack pb={"10%"}>
        <Heading as="h2" size="xl" lineHeight="tall">
          4. Congratulations
        </Heading>
        <Stack>
          <Text>You can get now create your certificate just here</Text>
          <Link href={"/create-digital-certification"}>
            <Button colorScheme="blue" size="lg">
              Create my certificate
            </Button>
          </Link>
        </Stack>
      </Stack>
    </div>
  );
};
