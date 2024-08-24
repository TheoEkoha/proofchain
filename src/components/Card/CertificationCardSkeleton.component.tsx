import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export const CertificationCardSkeleton = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
    >
      <Skeleton height="200px" borderRadius="lg" />
      <Stack mt="6" spacing="3">
        <Skeleton height="20px" width="70%" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
        <Skeleton height="16px" width="40%" />
        <Wrap spacing={4}>
          {Array.from({ length: 3 }).map((_, index) => (
            <WrapItem key={index}>
              <SkeletonCircle size="8" />
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
    </Box>
  );
};

export default CertificationCardSkeleton;
