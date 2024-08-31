import React, { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { DigitalInformationForm } from "./DigitalInformationForm";
import { UploadForm } from "./UploadForm";
import { MintForm } from "./MintForm";
import { upload } from "thirdweb/storage";
import { sendTransaction, getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../client";

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
  issuedBy: string;
  issuedOn: string;
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
  const { trigger, watch, reset } = methods;
  const [isMinting, setIsMinting] = useState(false);
  const toast = useToast();

  const [account, setAccount] = useState<string | null>(null);

  // Utilisation de useEffect pour récupérer le compte actif
  useEffect(() => {
    const getActiveAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      }
    };
    getActiveAccount();
  }, []);

  // Préparation du contrat
  const contract = getContract({
    address: smartContractAddressSepolia,
    chain: sepolia,
    client
  });

  const uploadToIpfs = async (file: File | null, image: File | null) => {
    if (!file || !image) {
      console.error("File or Image not provided");
      return { fileUri: null, imageUri: null };
    }
  
    try {
      const uris = await upload({
        client: client,
        files: [file, image],
        options: { uploadWithGatewayUrl: true },
      });
  
      // Le tableau `uris` contient les URLs des fichiers uploadés
      const fileUri = uris?.[0] ?? null;
      const imageUri = uris?.[1] ?? null;
  
      return {
        fileUri,
        imageUri,
      };
    } catch (error) {
      console.error("Upload failed:", error);
      return { fileUri: null, imageUri: null };
    }
  };

  const handleMint = async () => {
    const data = watch();
    toast({
      title: "Please wait",
      description: "This might take several minutes",
      status: "info",
      duration: 10000,
      isClosable: true,
    });

    if (!contract || !account || !data) {
      console.error("Missing contract, account, or formData");
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
        issuedBy: data.issuedBy,
        issuedOn: data.issuedOn,
        file: fileUri || "",
        image: imageUri || "",
        identifiant: data.identifiant,
      };

      setIsMinting(true);

      // Préparation de l'appel du contrat pour le minting
      const transaction = await prepareContractCall({
        contract,
        method: "mint",
        params: [account, JSON.stringify(metadata)],
      });

      // Envoi de la transaction
      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      setIsMinting(false);
      console.log("Transaction Hash:", transactionHash);
      toast({
        title: "Success !",
        description: "Your certificate has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setStep(0);
      reset();
    } catch (err) {
      setIsMinting(false);
      toast({
        title: "Error !",
        description: "There was an error while creating the certificate.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Minting error:", err);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (step === 2) {
        await handleMint();
      } else {
        setStep(step + 1);
      }
    }
  };

  const getButtonText = () => {
    if (isMinting) return "Transaction waiting...";
    return "Create";
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
                isLoading={isMinting}
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
                colorScheme="blue"
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
                isLoading={isMinting}
                onClick={handleMint}
                bgColor={"blue.300"}
                variant="solid"
                spinnerPlacement="start"
                textColor="white"
                loadingText={getButtonText()}
                style={{ whiteSpace: "nowrap" }}
              >
                {getButtonText()}
              </Button>
            </Flex>
          )}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}
