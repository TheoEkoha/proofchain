import React, { useState } from "react";
import { Box, ButtonGroup, Button, Flex, useToast } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { DigitalInformationForm } from "./DigitalInformationForm";
import { UploadForm } from "./UploadForm";
import { MintForm } from "./MintForm";
import {
  useAddress,
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";

const smartContractAddressSepolia = import.meta.env
  .VITE_TEMPLATE_SMART_CONTRACT_ADDRESS_SEPOLIA as string;

export interface MultiStepFormProps {
  step: number;
  steps: { title: string; subtitle: string; description: string }[];
  setStep: (step: number) => void;
}

export interface MultiStepFormData {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  tags: string[];
  emitor: string;
  dateOfObtention: string;
  file: File | null;
  image: File | null;
  identifiant: string;
}

export default function MultiStepForm({
  step,
  steps,
  setStep,
}: MultiStepFormProps) {
  const methods = useFormContext<MultiStepFormData>();
  const { trigger, watch, reset } = methods; // Ajout de `reset`
  const address = useAddress();
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();

  const { contract, isLoading: contractLoading } = useContract(
    smartContractAddressSepolia,
  );
  const { mutateAsync: mint } = useContractWrite(contract, "mint");
  const { mutateAsync: upload, isLoading: uploadLoading } = useStorageUpload();

  const uploadToIpfs = async (file: File | null, image: File | null) => {
    if (!file || !image) {
      console.error("File or Image not provided");
      return { fileUri: null, imageUri: null };
    }

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

      return {
        imageUri: dataImage ? dataImage["0"] : null,
        fileUri: dataFile ? dataFile["0"] : null,
      };
    } catch (error) {
      console.error("Upload failed:", error);
      return { fileUri: null, imageUri: null };
    }
  };

  const handleMint = async () => {
    const data = watch();
    if (!contract || !address || !data) {
      console.error("Missing contract, address, or formData");
      return;
    }

    try {
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

      setIsMinting(true);
      const result = await mint({
        args: [address, JSON.stringify(metadata)],
      });
      setIsMinting(false);

      console.log("r:", result);
      toast({
        title: "Success!",
        description: "The SBT has been successfully minted.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      reset();
      setStep(0);
    } catch (err) {
      setIsMinting(false);
      toast({
        title: "Error!",
        description: "There was an error while minting the SBT.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      console.error("e:", err);
    }
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

  const getButtonText = () => {
    if (contractLoading) return "Loading";
    if (uploadLoading) return "Upload loading";
    if (isMinting) return "Transaction waiting";
    return "";
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
            {step !== 0 && (
              <Button
                onClick={() => setStep(step - 1)}
                isLoading={
                  step === 2
                    ? contractLoading || uploadLoading || isMinting
                    : false
                }
                colorScheme="gray"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
            )}

            {step !== 2 && (
              <Button
                w="7rem"
                isDisabled={step === 2}
                colorScheme="teal"
                variant="outline"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Flex>

          {step === 2 && (
            <Flex direction="column" align="center">
              <Button
                isLoading={contractLoading || uploadLoading || isMinting}
                onClick={handleMint}
                bgColor={"teal.400"}
                variant="solid"
                spinnerPlacement="start"
                textColor="white"
                loadingText={getButtonText()}
                style={{ whiteSpace: "nowrap" }}
              >
                Create
              </Button>
            </Flex>
          )}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}
