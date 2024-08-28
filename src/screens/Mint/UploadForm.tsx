import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  FormErrorMessage,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const UploadForm = ({ description }: { description: string }) => {
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
        {description}
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={!!errors.image}>
        <VStack alignItems="start">
          <FormLabel htmlFor="image" fontSize="sm" fontWeight="md">
            Proof of certificate completion
          </FormLabel>
          <Text color="grey" fontSize="xs">
            Please provide an image
          </Text>
        </VStack>

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
        <FormErrorMessage>
          <>{errors.image?.message}</>
        </FormErrorMessage>
      </FormControl>
      <FormControl
        as={GridItem}
        colSpan={[6, 3]}
        isInvalid={!!errors.file}
        mt={"2%"}
      >
        <Text color="grey" fontSize="xs">
          Please provide a PDF format
        </Text>
        <Input
          type="file"
          id="file"
          accept=".pdf"
          {...register("file", {
            required: "File (.pdf) is required",
            validate: {
              lessThan3MB: (files) =>
                files[0]?.size < 3 * 1024 * 1024 ||
                "File size must be less than 3MB",
            },
          })}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
        <FormErrorMessage>
          <>{errors.file?.message}</>
        </FormErrorMessage>
      </FormControl>
    </>
  );
};
