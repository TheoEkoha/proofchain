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
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { LinkedinShare } from "react-share-kit";
import { formatDate } from "../../utils/format";
import { MediaRenderer } from "thirdweb/react";
import { client } from "../../client";

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
  status?: string;
  issuedBy: string;
  issuedOn: string;
  identifiant: string;
  owner?: string;
  tags?: { value: string; label: string; color: string }[];
  tagsValue?: string[];
  displayDivider?: boolean;
  shareable?: boolean;
  shareableViewOnly?: boolean;
  isLoading?: boolean;
  isMinted?: boolean;
}

const CertificationCard = (props: CertificationCardProps) => {
  const {
    image,
    title,
    description,
    status,
    identifiant,
    issuedBy,
    issuedOn,
    owner,
    tags,
    tagsValue,
    displayDivider,
    shareable,
    shareableViewOnly,
    isLoading,
    isMinted = true
  } = props;

  const displayedTags = tags || tagsValue?.map(getTagDetails);

  return (
    <>
      <Card maxW="sm" h={"100%"} overflow="hidden">
        <CardBody>
          <Skeleton isLoaded={!isLoading}>
            {isMinted ? (
              <MediaRenderer 
              style={{
                objectFit: "contain",
                maxHeight: "100%",
                width: "100%",
                borderRadius: "lg"
              }}
              src={image}
              alt="Certification image" client={client}/>
            ): (<Image
              objectFit="contain"
              src={image}
              maxH={{ base: "100%", sm: "250px" }}
              alt="Certification image"
              borderRadius="lg"
            />)}
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
                Issued by: {issuedBy}
              </Text>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text fontSize="sm" as="i">
                Issued on: {formatDate(issuedOn)}
              </Text>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text fontSize="sm" as="i">
                Certificate ID: {identifiant}
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
                  {displayedTags?.map((tag, _index) => {
                    if (!(typeof tag.value === "object") && tag.value !== null)
                      return (
                        <WrapItem key={`${tag.label}-${_index}`}>
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
                  <LinkedinShareButton url="/" style={{ paddingRight: "16px" }}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton url="/">
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
