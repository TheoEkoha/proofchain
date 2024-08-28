import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export default function TestnetFooter() {
  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        textAlign={"center"}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <Link
          href="https://sepolia.arbiscan.io/address/0x02902dEFb667aCe8D3aD7517967156d4706a6788"
          isExternal
          _hover={{ textDecoration: "underline" }}
        >
          <Text>Deployed on Arbitrum Sepolia (Testnet)</Text>
        </Link>
      </Container>
    </Box>
  );
}
