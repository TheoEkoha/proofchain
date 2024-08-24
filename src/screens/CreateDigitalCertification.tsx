import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/react";
import MultiStepForm, { FormStepProps } from "./Mint/MultiStepForm";
import { useForm, FormProvider } from "react-hook-form";

const steps: FormStepProps[] = [
  {
    title: "Fill",
    subtitle: "Digital certification information",
    description: "Fill your certification information",
  },
  { title: "Upload", subtitle: "File", description: "Upload your file" },
  {
    title: "Publication",
    subtitle: "Mint your certification",
    description: "Creation of your digital certification",
  },
];

export function CreateDigitalCertification() {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      description: "",
      tags: [],
      emitor: "",
      dateOfObtention: "",
      file: null,
      image: null,
      identifiant: "",
    },
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  return (
    <div className="p-2">
      <Stepper size="lg" index={activeStep} colorScheme="teal">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.subtitle}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Box mt={10}>
        <FormProvider {...methods}>
          <MultiStepForm
            steps={steps}
            step={activeStep}
            setStep={setActiveStep} // Correctly set this to setStep
          />
        </FormProvider>
      </Box>
    </div>
  );
}
