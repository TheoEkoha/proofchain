import React, { useState } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";
import { chain, wallets } from "../../utils/wallet";
import { client } from "../../client";
import { Connect } from "../Connect/ConnectButton.component";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </>
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({
  children,
  isLast,
  to = "/",
  ...rest
}: {
  children: React.ReactElement;
  isLast: boolean;
  to: string;
}) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }: { isOpen: boolean }) => {
  const account = useActiveAccount();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify="space-between"
        direction={["column", "row"]}
        pt={[4, 4, 0, 0]}
        width="100%"
      >
        <Stack direction={["column", "row"]} spacing={8} align="center">
          <MenuItem to="/" isLast={!account}>
            <>Home</>
          </MenuItem>
          {account && (
            <MenuItem to="/dashboard" isLast={false}>
              <>Dashboard</>
            </MenuItem>
          )}
          {account && (
            <MenuItem to="/claim-faucet" isLast={false}>
              <> Claim Faucet</>
            </MenuItem>
          )}
          <MenuItem to="/about" isLast={true}>
            <>About</>
          </MenuItem>
        </Stack>
        <Connect label={"Sign in"} />
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({
  children,
  ...props
}: {
  children: React.ReactElement;
}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
