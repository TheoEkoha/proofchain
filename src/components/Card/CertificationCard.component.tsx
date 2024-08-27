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
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import { LuBadgeCheck } from "react-icons/lu";
import { capitalize } from "lodash";
import { skillTags } from "../../utils/skills";
import { Address } from "../Address/Address.component";
import { useNavigate } from "@tanstack/react-router";

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
  return tag || { value: tagValue, label: tagValue, color: "gray.500" };
};

interface CertificationCardProps {
  image: string;
  title: string;
  description: string;
  status: string;
  emitor: string;
  owner?: string;
  tags?: { value: string; label: string; color: string }[];
  tagsValue?: string[];
  displayDivider?: boolean;
  isLoading?: boolean;
}

const CertificationCard = (props: CertificationCardProps) => {
  const {
    image,
    title,
    description,
    status,
    emitor,
    owner,
    tags,
    tagsValue,
    displayDivider,
    isLoading,
  } = props;

  const navigate = useNavigate();
  const handlePreview = (certificateData: CertificationCardProps) => {
    // const url = "https://www.linkedin.com/sharing/share-offsite/";
    // const params = new URLSearchParams({
    //   url: "https://google.fr",
    //   title: certificateData.title,
    //   description: certificateData.description,
    //   image: certificateData.image,
    // });
    const url = "https://www.linkedin.com/shareArticle";
    const params = new URLSearchParams({
      title: certificateData.title,
      description: certificateData.description,
      image: certificateData.image,
      url: "https://google.fr",
    });
    console.log(")--> ", `${url}?${params.toString()}`);

    return `${url}?${params.toString()}`;

    return navigate({ to: `${url}?${params.toString()}` });
  };

  const displayedTags = tags || tagsValue?.map(getTagDetails);

  return (
    <Card maxW="sm" h={"100%"} overflow="hidden">
      <CardBody>
        <Skeleton isLoaded={!isLoading}>
          <Image
            objectFit="contain"
            src={image}
            maxH={{ base: "100%", sm: "250px" }}
            alt="Certification image"
            borderRadius="lg"
          />
        </Skeleton>
        <Stack mt="6" spacing="3">
          <Skeleton isLoaded={!isLoading}>
            <Heading size="md">{title}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="sm" noOfLines={3}>
              {description}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="sm" as="i">
              Issued by: {emitor}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Box
              overflow="auto"
              overscrollY={"auto"}
              textOverflow="ellipsis"
              maxHeight="5.5rem"
              lineHeight="1.5rem"
            >
              <Wrap spacing="8px">
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
          </Skeleton>
        </Stack>
      </CardBody>
      {owner && (
        <>
          <Divider />
          <CardFooter>
            <Stack mb={"2%"} direction={"row"} spacing={4} align={"center"}>
              <HStack
                justifyContent="space-between"
                direction="column"
                spacing={2}
                fontSize="sm"
                width="100%"
              >
                <Text color={"gray.500"}>Owner:</Text>
                <Address
                  ellipsis={{
                    headClip: 8,
                    tailClip: 6,
                  }}
                  copyable
                  address={owner}
                />
              </HStack>
            </Stack>
          </CardFooter>
        </>
      )}
      {displayDivider && (
        <>
          <Divider />
          <CardFooter>
            <Box>
              <ButtonGroup spacing="2">
                <Skeleton isLoaded={!isLoading}>
                  {displayStatus(status)}
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() =>
                      handlePreview({ ...props } as CertificationCardProps)
                    }
                  >
                    Preview
                  </Button>
                </Skeleton>
              </ButtonGroup>
            </Box>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default CertificationCard;
