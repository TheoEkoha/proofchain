import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Highlight,
  Text,
  CardBody,
  Card,
  CardFooter,
  Button,
  Image,
  Tag,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  AvatarBadge,
  Wrap,
  WrapItem,
  Avatar,
  VStack,
  GridItem,
  Grid,
  Icon,
} from "@chakra-ui/react";

import { FiTwitter, FiLinkedin } from "react-icons/fi";

import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

import x from "../assets/images/x-logo-white.png";

import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import NftCard, {
  CertificationStatus,
} from "../components/Card/CertificationCard.component";
import CertificationCard from "../components/Card/CertificationCard.component";
import NavBar from "../components/Navbar/Navbar.component";
import Header from "../components/Header/Header.component";
import CW3PImage from "../assets/images/CW3P.webp";
import CW3BDImage from "../assets/images/CW3BD.webp";
import { skillTags } from "../utils/skills";
import { chain, wallets } from "../utils/wallet";
import { Connect } from "../components/Connect/ConnectButton.component";
import { XIcon } from "react-share";
import Footer from "../layouts/Footer";

export const LandingPage = () => {
  return (
    <>
      {" "}
      <NavBar />
      <main className="p-4 pb-10 min-h-[100vh] flex justify-center container max-w-screen-lg mx-auto">
        <div>
          <Header />
          <Stack className="flex justify-center mb-20">
            <SimpleGrid columns={2} spacing={4}>
              <CertificationCard
                title="Certified Web 3.0 Professional (CW3P)"
                image={CW3PImage}
                status={CertificationStatus.CERTIFIED}
                emitor="101 Blockchains"
                description={
                  "The Certified Web 3.0 Professional (CW3P) certification recognizes a professional’s expertise in the domain of web3, the future of the internet. CW3P-certified graduates are recognized for mastering web3 basics and the relationship between web3 and Ethereum, NFTs, and the metaverse. This certificate also focuses on web3 use cases, benefits, and the risks associated with web3 technologies along with applications of web3 in digital art, metaverse, and other applications."
                }
                displayDivider
                shareableViewOnly
              />
              <CertificationCard
                title="Certified Web3 Blockchain Developer (CW3BD)"
                image={CW3BDImage}
                status={CertificationStatus.CERTIFIED}
                emitor="101 Blockchains"
                description={
                  "The Certified Web3 Blockchain Developer (CW3BD) certification recognizes a professional’s expertise in the domain of web3, the future of the internet. CW3BD-certified graduates are recognized for mastering web3 basics and the relationship between web3 and Ethereum, NFTs, and the metaverse. This certificate also focuses on web3 use cases, benefits, and the risks associated with web3 technologies along with applications of web3 in digital art, metaverse, and other applications."
                }
                displayDivider
                shareableViewOnly
              />
            </SimpleGrid>
          </Stack>
          <Stack className="flex justify-center mb-20">
            <Heading lineHeight="tall">
              <Highlight
                query="skills"
                styles={{ px: "2", py: "1", rounded: "full", bg: "teal.200" }}
              >
                Skills Management
              </Highlight>
            </Heading>
            <Text fontSize="xl">
              Organize and share your digital certification securely
            </Text>
            <SimpleGrid
              mt={10}
              minChildWidth="120px"
              spacing="40px"
              columns={2}
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "150px" }}
                  src="https://d1.awsstatic.com/certification/badges/AWS-Certified-Data-Engineer-Associate_badge_300x300.a231ff0ff32a28adf061d3f7fa36564964b4a4b5.png"
                  alt="AWS Certified Data Engineer"
                />
                <Stack>
                  <CardBody>
                    <Heading size="md">Public certification</Heading>
                    <Text fontSize="sm">
                      Display your skills visible to all
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <VStack align="start">
                      <HStack>
                        <Tag variant={"solid"} bgColor="purple.400">
                          Data
                        </Tag>
                        <Tag variant={"solid"} bgColor="red.500">
                          DevOps
                        </Tag>
                      </HStack>
                      <HStack>
                        <Wrap>
                          <WrapItem>
                            <Avatar
                              mr={0.5}
                              size="xs"
                              name="John Doe"
                              src="https://bit.ly/dan-abramov"
                            />
                            <Text>John Doe </Text>
                          </WrapItem>
                        </Wrap>
                      </HStack>
                    </VStack>
                  </CardFooter>
                </Stack>
              </Card>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "150px" }}
                  src="https://d1.awsstatic.com/certification/badges/AWS-Certified-Data-Engineer-Associate_badge_300x300.a231ff0ff32a28adf061d3f7fa36564964b4a4b5.png"
                  alt="AWS Certified Data Engineer"
                />
                <Stack>
                  <CardBody>
                    <Heading size="md">Private certification</Heading>
                    <Text fontSize="sm">
                      Keep some certifications confidential
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <VStack align="start">
                      <Tag>Private</Tag>
                    </VStack>
                  </CardFooter>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>
          <Stack className="flex justify-center mb-20">
            <Heading lineHeight="tall">
              <Highlight
                query="share"
                styles={{ px: "2", py: "1", rounded: "full", bg: "teal.200" }}
              >
                Share with people
              </Highlight>
            </Heading>
            <Text fontSize="xl">
              Share, publy easily your certificates on social media.
            </Text>
            <HStack spacing={4} mt={4} justify={"space-evenly"}>
              <Image
                boxSize="100px"
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
                }
              />
              <XIcon size={100} round />
            </HStack>
          </Stack>
          <Stack className="flex justify-center mb-20">
            <Heading lineHeight="tall">
              <Highlight
                query="certification"
                styles={{ px: "2", py: "1", rounded: "full", bg: "blue.200" }}
              >
                Create a new certification
              </Highlight>
            </Heading>
            <Text fontSize="xl">
              Submit your evidence for a certified assessment, make your career
              efficient !
            </Text>
            <Box mt={10}>
              <FormControl>
                <Grid
                  h="200px"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={4}
                >
                  <GridItem colSpan={3}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Linux foundation - Product Manager"
                      type="text"
                    />
                    {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                  </GridItem>
                  <GridItem colStart={4} colEnd={6}>
                    <FormLabel>Issued by</FormLabel>
                    <Input placeholder="Linux foundation" type="text" />
                  </GridItem>
                  <GridItem colSpan={3} maxWidth="100%">
                    <FormLabel>Tag(s)</FormLabel>
                    <Select
                      isMulti
                      selectedOptionStyle="color"
                      name="colors"
                      options={skillTags}
                      tagVariant="solid"
                      placeholder="Select some skills..."
                      closeMenuOnSelect={false}
                      chakraStyles={{
                        container: (provided) => ({
                          ...provided,
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }),
                        control: (provided) => ({
                          ...provided,
                          maxHeight: "100%",
                          overflow: "auto",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          maxHeight: "200px",
                        }),
                        multiValue: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.data.color,
                        }),
                        multiValueLabel: (provided, state) => ({
                          ...provided,
                          color: "white",
                        }),
                      }}
                      size="md"
                    />
                  </GridItem>
                  <GridItem colStart={4} colEnd={6}>
                    <FormLabel>Issued on</FormLabel>
                    <Input
                      placeholder="Date of obtention"
                      size="md"
                      type="date"
                    />
                  </GridItem>
                </Grid>
              </FormControl>
            </Box>
            <Stack textAlign="center" alignContent={"center"}>
              <Text fontSize="sm">and more...</Text>
              <Box mt={5} alignContent={"center"} maxWidth={"100%"}>
                <Connect label={"Get started now !"} />
                {/* rediriger sur le dashboard ou remonter en haut de la page */}
              </Box>
            </Stack>
            <Box></Box>
          </Stack>
        </div>
      </main>
    </>
  );
};
