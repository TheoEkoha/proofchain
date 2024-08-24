import React, { useState, useEffect } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  GridItem,
  FormErrorMessage,
  Highlight,
  Text,
  Box,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormStepProps } from "./MultiStepForm";
import { useStorageUpload } from "@thirdweb-dev/react";
import CertificationCard, {
  CertificationStatus,
} from "../../components/Card/CertificationCard.component";

export const MintForm = (props: FormStepProps) => {
  const { description } = props;
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  // Watch the file field to get the file data
  const file = watch("file");
  const image = watch("image");

  //const certificationTitle = "Web 3 developper";
  const certificationTitle = watch("certificationTitle");

  //const certificationDescription = "The Certified Web 3.0 Professional (CW3P) certification recognizes a professional’s expertise in the domain of web3, the future of the internet. CW3P-certified graduates are recognized for mastering web3 basics and the relationship between web3 and Ethereum, NFTs, and the metaverse. This certificate also focuses on web3 use cases, benefits, and the risks associated with web3 technologies along with applications of web3 in digital art, metaverse, and other applications.";
  const certificationDescription = watch("certificationDescription");

  const tags = watch("tags");
  //const emitor = "Phantom";
  const emitor = watch("emitor");

  return (
    <>
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        lineHeight="tall"
      >
        <Highlight
          query="certification"
          styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
        >
          {description}
        </Highlight>
      </Heading>
      <Box display={"flex"} justifyContent={"center"} mt={"2%"}>
        <Text>Your digital certification will look like</Text>
      </Box>
      <Box display={"flex"} justifyContent={"center"} mt={"2%"}>
        <CertificationCard
          title={certificationTitle}
          //image={window.URL.createObjectURL(image[0])}
          image={
            "https://bafybeibyi76ano76qoxb53ar3u4437eke5ekpo3m2mog3mn345o555oyja.ipfs.dweb.link/CW3BD%20screen.png"
          }
          status={CertificationStatus.CERTIFIED}
          emitor={emitor}
          tags={tags}
          description={certificationDescription}
        />
      </Box>
    </>
  );
};
