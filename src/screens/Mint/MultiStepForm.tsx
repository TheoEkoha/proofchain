import { useState } from "react";
import { Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { DigitalInformationForm } from "./DigitalInformationForm";
import { UploadForm } from "./UploadForm";
import { MintForm } from "./MintForm";

export interface FormStepProps {
  title?: string;
  subtitle?: string;
  description: string;
}

export interface MultiStepFormProps {
  step: number;
  steps: { title: string; subtitle: string; description: string }[];
  setStep: (step: number) => void;
}

export default function MultiStepForm({
  step,
  steps,
  setStep,
}: MultiStepFormProps) {
  const methods = useForm();
  const { trigger, handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log("MintformData", data);
    // Vous pouvez gérer l'envoi des données ici
  };

  const handleNext = async () => {
    const isValid = await trigger(); // Valide le formulaire en cours
    if (isValid) {
      setStep(step + 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 0 ? (
          <DigitalInformationForm description={steps[step].description} />
        ) : step === 1 ? (
          <UploadForm description={steps[step].description} />
        ) : (
          <MintForm description={steps[step].description} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => setStep(step - 1)}
                isDisabled={step === 0}
                colorScheme="gray"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 2}
                colorScheme="teal"
                variant="outline"
                onClick={handleNext} // On appelle handleNext ici
              >
                Next
              </Button>
            </Flex>
            {step === 2 && (
              <Button w="7rem" colorScheme="teal" variant="solid" type="submit">
                Submit
              </Button>
            )}
          </Flex>
        </ButtonGroup>
      </Box>
    </FormProvider>
  );
}
