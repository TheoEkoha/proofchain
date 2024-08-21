import React from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  HStack,
  Box,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
  TagLabel,
  TagRightIcon,
  Tag,
} from "@chakra-ui/react";
import { LuBadgeCheck } from "react-icons/lu";
import { Icon } from "@chakra-ui/react";
import { capitalize } from "lodash";

interface CertificationCardProps {
  title: string;
  image: string;
  description: string;
  status: string;
  certifier: string;
}

export const CertificationStatus = {
  CERTIFIED: "CERTIFTIED",
  PENDING: "PENDING",
};

const displayStatus = (status: CertificationStatus) => {
  if (status == CertificationStatus.CERTIFIED)
    return (
      <Tag size={"lg"} key={"lg"} variant="outline" colorScheme="blue">
        <TagLabel>{capitalize(status)}</TagLabel>
        <TagRightIcon as={LuBadgeCheck} />
      </Tag>
    );
};

const CertificationCard = (props: CertificationCardProps) => {
  const { image, title, description, status, certifier } = props;

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          objectFit="contain"
          src={image}
          maxH={{ base: "100%", sm: "250px" }}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text fontSize="sm" noOfLines={3}>
            {description}
          </Text>
          <Text fontSize="sm" as="i">
            Emited by: {certifier}
          </Text>
        </Stack>
      </CardBody>
      <Divider></Divider>
      <CardFooter>
        <Box>
          <ButtonGroup spacing="2">
            {displayStatus(status)}
            <Button variant="ghost" colorScheme="blue">
              Preview
            </Button>
          </ButtonGroup>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default CertificationCard;
