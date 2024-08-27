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
} from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <div className="flex flex-col items-center mb-20 md:mb-20">
        <div>
          <HStack>
            <img src={logo} alt="" className="size-[350px] md:size-[350px]" />
            <Heading as="h1" mb={5} size="4xl" noOfLines={1}>
              ProofChain
            </Heading>
          </HStack>
          <Heading as={"h2"} lineHeight="md">
            <Highlight
              query={["certification", "diplomas"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "blue.200",
              }}
            >
              Discover the future of certification, diplomas
            </Highlight>
          </Heading>
          <Heading as={"h2"} lineHeight="md" color={"white"}>
            <Highlight
              query={["digital"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "teal.200",
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
