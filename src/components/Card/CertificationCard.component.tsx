import React from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Box,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
  Tag,
  Wrap,
  WrapItem,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import { LuBadgeCheck } from "react-icons/lu";
import { capitalize } from "lodash";
import { skillTags } from "../../utils/skills";

export const CertificationStatus = {
  CERTIFIED: "CERTIFIED",
  PENDING: "PENDING",
};

const displayStatus = (status: string) => {
  if (status === CertificationStatus.CERTIFIED) {
    return (
      <Tag size={"lg"} key={"lg"} variant="outline" colorScheme="blue">
        <TagLabel>{capitalize(status)}</TagLabel>
        <TagRightIcon as={LuBadgeCheck} />
      </Tag>
    );
  }
};

const getTagDetails = (tagValue: string) => {
  const tag = skillTags.find((t) => t.value === tagValue);
  return tag || { value: tagValue, label: tagValue, color: "gray.500" }; // Valeur par défaut si non trouvé
};

interface CertificationCardProps {
  image: string;
  title: string;
  description: string;
  status: string;
  emitor: string;
  tags?: { value: string; label: string; color: string }[];
  tagsValue?: string[];
  displayDivider?: boolean;
}

const CertificationCard = (props: CertificationCardProps) => {
  const {
    image,
    title,
    description,
    status,
    emitor,
    tags,
    tagsValue,
    displayDivider,
  } = props;

  const displayedTags = tags || tagsValue?.map(getTagDetails);

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
              {displayedTags?.map((tag) => {
                if (!(typeof tag.value === "object") && tag.value !== null)
                  return (
                    <WrapItem key={tag.label}>
                      <Tag size={"md"} variant="solid" bg={tag.color}>
                        {tag.label}
                      </Tag>
                    </WrapItem>
                  );
              })}
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
