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
  Divider,
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
import FeaturesGrid from "../components/Features/FeaturesGrid.component";

export const LandingPage = () => {
  return (
    <>
      {" "}
      <NavBar />
      <main className="p-4 pb-10 min-h-[100vh] flex justify-center container max-w-screen-lg mx-auto">
        <div>
          <Header />
          <Stack className="flex justify-center mb-20">
            <SimpleGrid minChildWidth="300px" columns={3} spacing='50px'>
              <CertificationCard
                title="Certified Web 3.0 Professional (CW3P)"
                image={CW3PImage}
                status={CertificationStatus.CERTIFIED}
                issuedBy="101 Blockchains"
                issuedOn="08-07-2024"
                description={
                  "The Certified Web 3.0 Professional (CW3P) certification recognizes a professional’s expertise in the domain of web3, the future of the internet. CW3P-certified graduates are recognized for mastering web3 basics and the relationship between web3 and Ethereum, NFTs, and the metaverse. This certificate also focuses on web3 use cases, benefits, and the risks associated with web3 technologies along with applications of web3 in digital art, metaverse, and other applications."
                }
                identifiant="111578635"
                displayDivider
                shareableViewOnly
              />
              <CertificationCard
                title="Certified Web3 Blockchain Developer (CW3BD)"
                image={CW3BDImage}
                status={CertificationStatus.CERTIFIED}
                issuedBy="101 Blockchains"
                issuedOn="08-14-2024"
                description={
                  "The Certified Web3 Blockchain Developer (CW3BD) certification recognizes a professional’s expertise in the domain of web3, the future of the internet. CW3BD-certified graduates are recognized for mastering web3 basics and the relationship between web3 and Ethereum, NFTs, and the metaverse. This certificate also focuses on web3 use cases, benefits, and the risks associated with web3 technologies along with applications of web3 in digital art, metaverse, and other applications."
                }
                identifiant="112308052"
                displayDivider
                shareableViewOnly
              />
            </SimpleGrid>
          </Stack>
          <Divider mb={10} />
          <FeaturesGrid></FeaturesGrid>
          <Divider mt={10} mb={10} />
          <Stack className="flex justify-center mb-20">
            <Heading textAlign="center" lineHeight="tall">
              <Highlight
                query="certification"
                styles={{ px: "2", py: "1", rounded: "full", bg: "blue.300" }}
              >
                Create a new certification
              </Highlight>
            </Heading>
            <Text textAlign="center" fontSize="xl">
              Submit your evidence for a certified assessment, make your career
              efficient !
            </Text>
            <Box mt={10}>
              <FormControl>
                <SimpleGrid spacing='50px'>
                  <GridItem colSpan={3}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Linux foundation - Product Manager"
                      type="text"
                    />
                  </GridItem>
                  <GridItem colSpan={3}>
                    <FormLabel>Issued by</FormLabel>
                    <Input placeholder="Linux foundation" type="text" />
                  </GridItem>
                  <GridItem colSpan={3} >
                    <FormLabel>Issued on</FormLabel>
                    <Input
                      placeholder="Date of obtention"
                      size="md"
                      type="date"
                    />
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
                  
                {/* </Grid> */}
                </SimpleGrid>
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