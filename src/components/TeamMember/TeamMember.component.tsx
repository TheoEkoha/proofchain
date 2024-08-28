import React from "react";
import { Avatar, Box, Text, VStack } from "@chakra-ui/react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <Box textAlign="center">
      <Avatar size="2xl" src={image} mb={4} />
      <Text fontWeight="bold">{name}</Text>
      <Text>{role}</Text>
    </Box>
  );
};
