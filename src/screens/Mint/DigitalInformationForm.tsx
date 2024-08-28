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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { Select } from "chakra-react-select";
import { skillTags } from "../../utils/skills";

export const DigitalInformationForm = ({
  description,
}: {
  description: string;
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // Convertir skillTags en format adapté pour chakra-react-select
  const selectOptions = skillTags.map((tag) => ({
    value: tag.value,
    label: tag.label,
    color: tag.color,
  }));

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
          <FormErrorMessage>
            <>{errors.firstName?.message}</>
          </FormErrorMessage>
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
          <FormErrorMessage>
            <>{errors.lastName?.message}</>
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={!!errors.title} mb="4">
        <FormLabel htmlFor="certification-title" fontWeight={"normal"}>
          Title of the certification
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="certification-title"
            placeholder="Certified Full-Stack Web Developer"
            {...register("title", { required: "Title is required" })}
          />
        </InputGroup>
        <FormErrorMessage>
          <>{errors.title?.message}</>
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.description} mb="4">
        <FormLabel htmlFor="certification-description" fontWeight={"normal"}>
          Description of the certification
        </FormLabel>
        <InputGroup size="md">
          <Textarea
            id="certification-description"
            placeholder="This certification validates your expertise in designing, developing..."
            {...register("description", {
              required: "Description is required",
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          <>{errors.description?.message}</>
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.identifiant} mb="4">
        <FormLabel htmlFor="identifiant" fontWeight={"normal"}>
          Certificate ID
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="identifiant"
            placeholder="CE1632921337"
            {...register("identifiant", {
              required: "Identifiant is required",
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          <>{errors.identifiant?.message}</>
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
              options={selectOptions}
              tagVariant="solid"
              placeholder="Select some skills..."
              closeMenuOnSelect={false}
              onChange={(selectedOptions) => {
                onChange(
                  selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [],
                );
              }}
              onBlur={onBlur}
              value={selectOptions.filter((option) =>
                value?.includes(option.value),
              )}
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
        <FormErrorMessage>
          <>{errors.tags?.message}</>
        </FormErrorMessage>
      </FormControl>

      <Flex mt="2%">
        <FormControl isInvalid={!!errors.issuedBy} mr="5%">
          <FormLabel htmlFor="issuedBy" fontWeight={"normal"}>
            Issued by
          </FormLabel>
          <Input
            id="issuedBy"
            placeholder="Company name."
            {...register("issuedBy", { required: "Issuer is required" })}
          />
          <FormErrorMessage>
            <>{errors.issuedBy?.message}</>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.issuedOn}>
          <FormLabel htmlFor="date-obtention">Issued on</FormLabel>
          <Input
            id="date-obtention"
            placeholder="Date of obtention"
            size="md"
            type="date"
            {...register("issuedOn", {
              required: "Please select the date",
            })}
          />
          <FormErrorMessage>
            <>{errors.issuedOn?.message}</>
          </FormErrorMessage>
        </FormControl>
      </Flex>
    </>
  );
};
