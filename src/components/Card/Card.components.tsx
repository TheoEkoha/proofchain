import {
  Box,
  Center,
  Heading,
  Text,
  HStack,
  Divider,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";
import eth from "./icon-ethereum.svg";
import clock from "./icon-clock.svg";
import view from "./icon-view.svg";

function Card() {
  const textColor = "#8BACD9";
  const cyan = "#00FFF8";

  return (
    <Box bg="#15263F" color="white" borderRadius="2xl" p={6} w={350}>
      <Box position="relative"></Box>
      <Heading
        as="h2"
        fontSize="22px"
        mb={4}
        cursor="pointer"
        _hover={{
          color: "#00FFF8",
        }}
      >
        Equilibrium #3429
      </Heading>
      <Text color={textColor} mb={6} fontSize="18px">
        Our Equilibrium collection promotes balance and calm.
      </Text>
      <HStack justify="space-between">
        <Flex align="center">
          <Text color="#00FFF8" fontWeight="bold">
            0.041 ETH
          </Text>
        </Flex>
        <Flex align="center">
          <Text color={textColor}>3 days left</Text>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Card;
