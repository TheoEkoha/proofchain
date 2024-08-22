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
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { LuBadgeCheck } from "react-icons/lu";
import { capitalize } from "lodash";

export const CertificationStatus = {
  CERTIFIED: "CERTIFIED",
  PENDING: "PENDING",
};

const displayStatus = (status) => {
  if (status === CertificationStatus.CERTIFIED) {
    return (
      <Tag size={"lg"} key={"lg"} variant="outline" colorScheme="blue">
        <TagLabel>{capitalize(status)}</TagLabel>
        <TagRightIcon as={LuBadgeCheck} />
      </Tag>
    );
  }
};

interface CertificationCardProps {
  image: string;
  title: string;
  description: string;
  status: string;
  emitor: string;
  tags?: { value: string; label: string; color: string }[];
  displayDivider?: boolean;
}
const CertificationCard = (props: CertificationCardProps) => {
  const { image, title, description, status, emitor, tags, displayDivider } =
    props;

  return (
    <Card maxW="sm" overflow="hidden">
      <CardBody>
        <Image
          objectFit="contain"
          src={image}
          maxH={{ base: "100%", sm: "250px" }}
          alt="Certification image"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text fontSize="sm" noOfLines={3}>
            {description}
          </Text>
          <Text fontSize="sm" as="i">
            Emitor: {emitor}
          </Text>
          <Box
            overflow="auto"
            overscrollY={"auto"}
            textOverflow="ellipsis"
            maxHeight="5.5rem"
            lineHeight="1.5rem"
          >
            <Wrap spacing={4} shouldWrapChildren>
              {tags?.map((tag) => (
                <WrapItem key={tag.value}>
                  <Tag
                    size={"md"}
                    variant="solid"
                    bg={tag.color}
                    color={tag.color.includes("yellow") ? "black" : "white"}
                  >
                    {tag.label}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Stack>
      </CardBody>
      {displayDivider && (
        <>
          <Divider />
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
        </>
      )}
    </Card>
  );
};

export default CertificationCard;
