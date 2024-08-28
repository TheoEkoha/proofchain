import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Button,
  ListItem,
  UnorderedList,
  Avatar,
  Highlight,
  Divider,
  Stack,
} from "@chakra-ui/react";
import NavBar from "../components/Navbar/Navbar.component";
import { TeamMember } from "../components/TeamMember/TeamMember.component";
import to from "../assets/images/to.webp";
import { FaLinkedin } from "react-icons/fa";
import { SocialButton } from "../components/SocialButton/SocialButton.component";

export const About = () => {
  return (
    <>
      <NavBar />
      <Container maxW="container.lg" py={10}>
        {/* Vision Section */}
        <VStack spacing={6} align="start">
          <Heading as="h1" size="2xl" mb={4}>
            About ProofChain
          </Heading>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Our Vision
            </Heading>
            <Text fontSize="md">
              ProofChain is an innovative platform dedicated to decentralized
              skill certification. Our goal is to enable everyone to prove their
              skills and achievements in a transparent, immutable, and
              verifiable way, while preserving the ownership and integrity of
              personal data. We believe in the future of Web3 and blockchain as
              transformative tools for education, professional development, and
              talent recognition.
            </Text>
          </Box>

          {/* Current Features Section */}
          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Current Features
            </Heading>
            <Text fontSize="md" mb={2}>
              We have developed the first version of ProofChain that allows
              users to certify and showcase their skills through Soulbound
              Tokens (SBTs). Once issued, these tokens are permanently attached
              to the user's wallet, ensuring that they cannot be transferred,
              exchanged, or resold.
            </Text>
            <Text as="u">Key Features:</Text>
            <UnorderedList>
              <ListItem>
                Certification via SBTs: Create and receive non-transferable
                digital certificates, securely proving your skills.
              </ListItem>
              <ListItem>
                Personal Dashboard: View and manage your SBTs in a dedicated
                space, with the ability to link them to professional platforms
                like LinkedIn and GitHub.
              </ListItem>
              <ListItem>
                Simplified Web3 Integration: Connect your Web3 wallet or sign-in
                with email/phone and start certifying your skills with just a
                few clicks, thanks to an intuitive user interface.
              </ListItem>
            </UnorderedList>
          </Box>

          {/* What's Coming Next Section */}
          <Box>
            <Heading as="h2" size="lg" mb={2}>
              What’s Coming Next ?
            </Heading>
            <Text fontSize="md" mb={2}>
              We are working on a key feature: the issuer/evaluator space. This
              space will allow educational institutions, companies, and trainers
              to certify skills in a verified and authenticated manner. Soon,
              you will be able to request skill validation directly on the
              platform, adding further credibility to your SBTs.
            </Text>
            <Text as="u">Upcoming Features:</Text>
            <UnorderedList>
              <ListItem>
                SBT Issuance by Verified Issuers: Add more weight to your
                certifications by having them validated by recognized experts in
                your field.
              </ListItem>
              <ListItem>
                API for Enterprises: Integrate ProofChain into your solution or
                training systems to automate the issuance and management of
                certificates.
              </ListItem>
            </UnorderedList>
          </Box>

          {/* Why ProofChain Section */}
          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Why ProofChain?
            </Heading>
            <Text fontSize="md">
              In a world where transparency and authenticity are crucial,
              ProofChain offers an innovative solution to ensure that skills and
              qualifications are recognized fairly and reliably. By leveraging
              blockchain technology, we ensure that each certification is
              immutable, traceable, and directly linked to its legitimate
              holder.
            </Text>
          </Box>

          {/* Our Team Section */}
          <Box mb={"10%"}>
            <Heading as="h2" size="lg" mb={2}>
              Our Team
            </Heading>
            <Text fontSize="md" mb={8}>
              ProofChain is the result of a passionate team dedicated to Web3
              and blockchain. We are committed to the continuous improvement of
              our platform to meet user needs, while exploring new ways to apply
              decentralization to skill development.
            </Text>
            <VStack spacing={2}>
              <TeamMember
                name="Théo Olivieri"
                role="Founder / Web3 Developer"
                image={to}
              />
              <SocialButton
                label={"LinkedIn"}
                href={"https://www.linkedin.com/in/theo-olivieri/"}
              >
                <FaLinkedin />
              </SocialButton>
            </VStack>
          </Box>
          <Divider />
          {/* Join Us Section */}
          <Box mb={"10%"}>
            <Heading as="h2" size="lg" mb={4}>
              <Highlight
                query="join us"
                styles={{ px: "2", py: "1", rounded: "full", bg: "teal.300" }}
              >
                Join Us on this Journey
              </Highlight>
            </Heading>
            <Text fontSize="md" mb={4}>
              We believe that ProofChain has the potential to revolutionize the
              way skills are certified and recognized. We invite everyone who
              shares our vision to join our community, contribute to the
              platform's development, and explore the limitless possibilities of
              Web3 together.
            </Text>
            <HStack justifyContent="center" spacing={4} mt={5}>
              <Link href="mailto:olivieri.theo@gmail.com">
                <Button colorScheme="blue" size="lg">
                  Contact Us
                </Button>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};
