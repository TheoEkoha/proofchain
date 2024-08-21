import thirdwebIcon from "../../thirdweb.svg";
import NavBar from "../Navbar/Navbar.component";
import NavBarComponent from "../Navbar/Navbar.component";
import { Highlight, Heading, useHighlight } from "@chakra-ui/react";

const Header = () => {
  const highlight = useHighlight({
    text: `Discover the future of certification, diplomas`,
    query: ["certification", "diplomas"],
    styles: {
      px: "2",
      py: "1",
      rounded: "full",
      fontSize: "3xl",
      bg: "teal.100",
    },
  });

  return (
    <>
      <div className="flex flex-col items-center mb-20 md:mb-20">
        <div>
          <img
            src={thirdwebIcon}
            alt=""
            className="size-[150px] md:size-[150px]"
            style={{
              filter: "drop-shadow(0px 0px 24px #a726a9a8)",
            }}
          />
          <Heading as="h1" mb={5} size="4xl" noOfLines={1}>
            ProofChain
          </Heading>
          <Heading as={"h2"} lineHeight="md">
            <Highlight
              query={["certification", "diplomas"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "teal.100",
              }}
            >
              Discover the future of certification, diplomas
            </Highlight>
          </Heading>
          <Heading as={"h2"} lineHeight="md">
            <Highlight
              query={["digital"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "orange.100",
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
