import React from "react";
import { Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { DigitalInformationForm } from "./DigitalInformationForm";
import { UploadForm } from "./UploadForm";
import { MintForm } from "./MintForm";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";

const smartContractAddressSepolia = import.meta.env
  .VITE_TEMPLATE_SMART_CONTRACT_ADDRESS_SEPOLIA as string;

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
  identifiant: string;
}

export default function MultiStepForm({
  step,
  steps,
  setStep,
}: MultiStepFormProps) {
  const methods = useForm<MultiStepFormData>();
  const { trigger, handleSubmit } = methods;
  const { watch } = useFormContext<MultiStepFormData>(); // Accès au contexte du formulaire
  const address = useAddress();

  const { contract, isLoading: contractLoading } = useContract(
    smartContractAddressSepolia,
  );
  const { data: contractName } = useContractRead(contract, "name");
  const { mutateAsync: mint } = useContractWrite(contract, "mint");
  const { mutateAsync: upload, isLoading: uploadLoading } = useStorageUpload();

  const uploadToIpfs = async (file: File, image: File) => {
    try {
      const uris = await upload({
        data: [file, image],
        options: { uploadWithGatewayUrl: true },
      });
      const fileUri = uris[0];
      const imageUri = uris[1];
      console.log("uploaded");
      return { fileUri, imageUri };
    } catch (error) {
      console.error("Upload failed:", error);
      return { fileUri: null, imageUri: null };
    }
  };

  const handleMint = async () => {
    const data = watch(); // Obtenez les données actuelles du formulaire
    if (!contract || !address || !data) {
      console.error("Missing contract, address, or formData");
      return;
    }

    try {
      console.log("before upload ipfs");
      const { fileUri, imageUri } = await uploadToIpfs(data.file, data.image);

      const metadata = {
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        description: data.description,
        tags: data.tags,
        emitor: data.emitor,
        dateOfObtention: data.dateOfObtention,
        file: fileUri || "",
        image: imageUri || "",
        identifiant: data.identifiant,
      };

      const metadataJSON = JSON.stringify(metadata);
      console.log(metadataJSON);

      const result = await mint({
        args: [address, metadataJSON],
      });

      console.log("Transaction réussie:", result);
    } catch (err) {
      console.error("Erreur lors de la mint:", err);
    }
  };

  const onSubmit = async (data: MultiStepFormData) => {
    console.log("Form Data received in onSubmit:", data); // Débogage
  };

  const handleNext = async () => {
    const isValid = await trigger(); // Valider le formulaire actuel
    if (isValid) {
      if (step === 2) {
        await handleMint(); // Appeler handleMint uniquement à la dernière étape
      } else {
        setStep(step + 1); // Passer à l'étape suivante
      }
    }
  };

  return (
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
              onClick={handleNext}
            >
              Next
            </Button>
          </Flex>

          {step === 2 && (
            <Flex direction="column" align="center">
              <Button
                isLoading={contractLoading || uploadLoading} // Indicateur de chargement
                onClick={handleMint}
                colorScheme="teal"
                variant="solid"
              >
                Mint NFT
              </Button>
            </Flex>
          )}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}
