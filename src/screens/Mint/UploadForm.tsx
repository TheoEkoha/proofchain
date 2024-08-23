import React from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  FormErrorMessage,
  Highlight,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormStepProps } from "./MultiStepForm";

export const UploadForm = (props: FormStepProps) => {
  const { description } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          query="upload"
          styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
        >
          {description}
        </Highlight>
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={!!errors.image}>
        <FormLabel htmlFor="image" fontSize="sm" fontWeight="md">
          Image
        </FormLabel>
        <Input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
        <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        as={GridItem}
        colSpan={[6, 3]}
        isInvalid={!!errors.file}
        mt={"2%"}
      >
        <FormLabel htmlFor="file" fontSize="sm" fontWeight="md">
          File
        </FormLabel>
        <Input
          type="file"
          id="file"
          accept=".pdf"
          {...register("file", { required: "File (.pdf) is required" })}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
        <FormErrorMessage>{errors.file?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};
