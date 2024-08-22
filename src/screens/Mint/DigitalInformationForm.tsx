import React from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  Highlight,
  Textarea,
  GridItem,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { FormStepProps } from "./MultiStepForm";
import { Select } from "chakra-react-select";
import { skillTags } from "../../utils/skills";

export const DigitalInformationForm = ({ description }: FormStepProps) => {
  const {
    register,
    control,
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
          query="certification"
          styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
        >
          {description}
        </Highlight>
      </Heading>

      <Flex>
        <FormControl isInvalid={!!errors.firstName} mr="5%" mb="4">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="First name"
            {...register("firstName", { required: "First name is required" })}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName} mb="4">
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            {...register("lastName", { required: "Last name is required" })}
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={!!errors.certificationTitle} mb="4">
        <FormLabel htmlFor="certification-title" fontWeight={"normal"}>
          Title of certification
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="certification-title"
            placeholder="Certified Full-Stack Web Developer"
            {...register("certificationTitle", {
              required: "Title is required",
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.certificationTitle?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.certificationDescription} mb="4">
        <FormLabel htmlFor="certification-description" fontWeight={"normal"}>
          Description of certification
        </FormLabel>
        <InputGroup size="md">
          <Textarea
            id="certification-description"
            placeholder="This certification validates your expertise in designing, developing..."
            {...register("certificationDescription", {
              required: "Description is required",
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.certificationDescription?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.tags} mb="4">
        <FormLabel>Tag(s)</FormLabel>
        <Controller
          name="tags"
          control={control}
          rules={{ required: "Tag(s) are required" }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              isMulti
              selectedOptionStyle="color"
              name="tags"
              options={skillTags}
              tagVariant="solid"
              placeholder="Select some skills..."
              closeMenuOnSelect={false}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              chakraStyles={{
                container: (provided) => ({
                  ...provided,
                  maxWidth: "100%",
                  maxHeight: "100%",
                }),
                control: (provided) => ({
                  ...provided,
                  maxHeight: "100%",
                  overflow: "auto",
                }),
                menu: (provided) => ({
                  ...provided,
                  maxHeight: "200px",
                }),
                multiValue: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.data.color,
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
              size="md"
            />
          )}
        />
        <FormErrorMessage>{errors.tags?.message}</FormErrorMessage>
      </FormControl>

      <Flex mt="2%">
        <FormControl isInvalid={!!errors.emitor} mr="5%">
          <FormLabel htmlFor="emitor" fontWeight={"normal"}>
            Emitor
          </FormLabel>
          <Input
            id="emitor"
            placeholder="Company name."
            {...register("emitor", { required: "Emitor is required" })}
          />
          <FormErrorMessage>{errors.emitor?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.dateOfObtention}>
          <FormLabel htmlFor="date-obtention">Date of obtention</FormLabel>
          <Input
            id="date-obtention"
            placeholder="Date of obtention"
            size="md"
            type="date"
            lang="uk"
            {...register("dateOfObtention", { required: "Date is required" })}
          />
          <FormErrorMessage>{errors.dateOfObtention?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
    </>
  );
};
