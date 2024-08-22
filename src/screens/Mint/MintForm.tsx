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
import { Document, Page } from "react-pdf";
import CertificationCard, {
  CertificationStatus,
} from "../../components/Card/CertificationCard.component";

export const MintForm = (props: FormStepProps) => {
  const { description } = props;
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Watch the file field to get the file data
  const file = watch("file");
  const image = watch("image");
  const certificationTitle = "Web 3 developper"; //watch("certificationTitle");
  const certificationDescription =
    "The Certified Web 3.0 Professional (CW3P) certification recognizes a professional’s expertise in the domain of web3, the future of the internet. CW3P-certified graduates are recognized for mastering web3 basics and the relationship between web3 and Ethereum, NFTs, and the metaverse. This certificate also focuses on web3 use cases, benefits, and the risks associated with web3 technologies along with applications of web3 in digital art, metaverse, and other applications."; //watch("certificationDescription");
  const tags = watch("tags");
  const emitor = "Phantom"; //watch("emitor");

  useEffect(() => {
    if (file && file.length > 0) {
      // Reset the page number when the file changes
      setPageNumber(1);
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

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
          image={window.URL.createObjectURL(image[0])}
          status={CertificationStatus.CERTIFIED}
          emitor={emitor}
          tags={tags}
          description={certificationDescription}
        />
      </Box>
    </>
  );
};
