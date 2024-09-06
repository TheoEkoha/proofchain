import thirdwebIcon from "../../thirdweb.svg";
import logo from "../../assets/images/logo.webp";
import NavBar from "../Navbar/Navbar.component";
import NavBarComponent from "../Navbar/Navbar.component";
import {
  Highlight,
  Heading,
  useHighlight,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <div className="flex flex-col items-center mb-20 md:mb-20">
        <div>
          <VStack spacing={10} paddingBottom={6}>
            <img src={logo} alt="" className="size-[250px] md:size-[250px]" />
            <Heading as="h1" mb={5} size="4xl" noOfLines={1}>
              ProofChain
            </Heading>
          </VStack>
          <Heading as={"h2"} textAlign="center" lineHeight="md">
            <Highlight
              query={["certification", "diplomas"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "blue.300",
              }}
            >
              Discover the future of certification,
            </Highlight>
          </Heading>
          <Heading as={"h2"} textAlign="center" lineHeight="md" color={"white"}>
            <Highlight
              query={["digital"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "teal.300",
              }}
            >
              Create a digital and lifetime signature
            </Highlight>
          </Heading>
        </div>
      </div>
    </>
  );
};

export default Header;
