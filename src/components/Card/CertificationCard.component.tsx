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
import { Helmet } from "react-helmet";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { LinkedinShare } from "react-share-kit";

export const CertificationStatus = {
  CERTIFIED: "CERTIFIED",
  PENDING: "PENDING",
};

const shareButtonTitle = (certificateTitle: string) => {
  return `I'm very proud to annonce you that I obtain my new certificate: ${certificateTitle}. I create my digital certificate on my ProofChain`;
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
  shareable?: boolean;
  shareableViewOnly?: boolean;
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
    shareable,
    shareableViewOnly,
    isLoading,
  } = props;

  const navigate = useNavigate();
  const handlePreview = (certificateData: CertificationCardProps) => {
    const url = "https://www.linkedin.com/shareArticle";
    const params = new URLSearchParams({
      url: "https://example.com/certificate",
    });
    const urlRedirection = `${url}?${params.toString()}`;
    window.open(urlRedirection, "_blank", "rel=noopener noreferrer");
  };

  const displayedTags = tags || tagsValue?.map(getTagDetails);

  return (
    <>
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content="https://example.com/certificate" />
        <meta property="og:type" content="website" />
      </Helmet>
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
              <Heading alt="og:title" size="md">
                {title}
              </Heading>
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
        {displayDivider && <Divider />}
        {owner && (
          <>
            <CardFooter>
              <Stack direction={"row"} spacing={4} align={"center"}>
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
        {shareable && (
          <>
            <CardFooter justifyContent={"space-between"}>
              <HStack justifyContent={"space-evenly"}>
                <Skeleton isLoaded={!isLoading}>
                  <LinkedinShareButton
                    url={window.location.href}
                    style={{ paddingRight: "16px" }}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    title={shareButtonTitle(title)}
                    hashtags={["certification", "ProofChain"]}
                    url={window.location.href}
                  >
                    <XIcon size={32} round />
                  </TwitterShareButton>
                </Skeleton>
              </HStack>
            </CardFooter>
          </>
        )}
        {shareableViewOnly && (
          <>
            <CardFooter justifyContent={"space-between"}>
              <HStack justifyContent={"space-evenly"}>
                <Skeleton isLoaded={!isLoading}>
                  <LinkedinShareButton style={{ paddingRight: "16px" }}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton>
                    <XIcon size={32} round />
                  </TwitterShareButton>
                </Skeleton>
              </HStack>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
};

export default CertificationCard;
