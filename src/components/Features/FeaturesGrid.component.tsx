import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcDiploma1, FcInspection, FcUpload } from "react-icons/fc";
import { LinkedinIcon, XIcon } from "react-share";

interface CardFeatureProps {
  heading: string;
  description: string;
  icon: React.ReactElement;
  icon2?: React.ReactElement;
  href?: string;
}

const CardFeature = ({
  heading,
  description,
  icon,
  icon2,
  href,
}: CardFeatureProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        {icon2 && (
          <Flex
            position={"relative"}
            left={"18%"}
            w={16}
            h={16}
            align={"center"}
            justify={"center"}
            color={"white"}
            rounded={"full"}
            bg={"black"}
          >
            {icon2}
          </Flex>
        )}
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={
            icon2
              ? "rgb(0, 119, 181)"
              : useColorModeValue("gray.100", "gray.600")
          }
          {...(icon2 ? { position: "absolute" } : {})}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function FeaturesGrid() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          How it works
        </Heading>
        <Text color={"gray.400"} fontSize={{ base: "sm", sm: "lg" }}>
          ProofChain allows you to create simply your digital certificate thanks
          to the technology of blockchain
        </Text>
      </Stack>

      <Container maxW={"3xl"} mt={12}>
        <Flex
          flexWrap="wrap"
          gridGap={4}
          justify="center"
          gridTemplateColumns="repeat(2, 1fr)"
        >
          <CardFeature
            heading={"1. Create"}
            icon={<Icon as={FcInspection} w={10} h={10} />}
            description={"Provide your certificate information"}
            href={"#"}
          />
          <CardFeature
            heading={"2. Upload"}
            icon={<Icon as={FcUpload} w={10} h={10} />}
            description={"Select your proofs of completion"}
            href={"#"}
          />
          <CardFeature
            heading={"3. Publish"}
            icon={<Icon as={FcDiploma1} w={10} h={10} />}
            description={
              "Your digital certification is ready to be created on the blockchain"
            }
            href={"#"}
          />
          <CardFeature
            heading={"4. Share"}
            icon={<Icon as={LinkedinIcon} w={10} h={10} />}
            icon2={<Icon as={XIcon} w={10} h={10} />}
            description={
              "Share and publish easily your certificates on your social media"
            }
          />
        </Flex>
      </Container>
    </Box>
  );
}
