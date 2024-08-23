import { useState } from "react";
import { Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { DigitalInformationForm } from "./DigitalInformationForm";
import { UploadForm } from "./UploadForm";
import { MintForm } from "./MintForm";
import { MediaRenderer, useStorageUpload } from "@thirdweb-dev/react";

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

interface MultiStepFormData {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  tags: string[];
  emitor: string;
  dateOfObtention: string;
  file: File;
  image: File;
}

export default function MultiStepForm({
  step,
  steps,
  setStep,
}: MultiStepFormProps) {
  const methods = useForm();
  const { trigger, handleSubmit } = methods;
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  const [fileUris, setFileUris] = useState<{
    fileUri: string;
    imageUri: string;
  } | null>(null);

  const uploadToIpfs = async (file: File, image: File) => {
    try {
      const uris = await upload({
        data: [file, image],
        options: { uploadWithGatewayUrl: true },
      });

      const fileJson = uris?.[0];
      const reponseFile = await fetch(fileJson);
      const dataFile = await reponseFile.json();

      const imageJson = uris?.[1];
      const reponseImage = await fetch(imageJson);
      const dataImage = await reponseImage.json();

      console.log("Image URI  -> ", uris[1]);
      console.log("Image URI FINAL -> ", dataFile["0"]);
      setFileUris({
        imageUri: dataImage ? dataImage["0"] : null,
        fileUri: dataFile ? dataFile["0"] : null,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const onSubmit = (data: MultiStepFormData) => {
    console.log("MintformData", data);
    uploadToIpfs(data.file, data.image);
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
                isLoading={isLoading}
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
              <Button
                isLoading={isLoading}
                w="7rem"
                colorScheme="teal"
                variant="solid"
                type="submit"
              >
                Submit
              </Button>
            )}
          </Flex>
        </ButtonGroup>
      </Box>
    </FormProvider>
  );
}
