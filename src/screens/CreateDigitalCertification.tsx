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
import MultiStepForm from "./Mint/MultiStepForm";
import { useForm, FormProvider } from "react-hook-form";

interface FormStepProps {
  title: string;
  subtitle: string;
  description: string;
}

const steps: FormStepProps[] = [
  {
    title: "Create",
    subtitle: "Load certificate information",
    description: "Certificate information",
  },
  {
    title: "Upload",
    subtitle: "Browse files",
    description: "Select your files",
  },
  {
    title: "Publication",
    subtitle: "Mint your certification",
    description: "Congratulations ! 🚀",
  },
];

export function CreateDigitalCertification() {
  const methods = useForm();

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <div className="p-2">
      <Box overflowX="auto" px={2} py={4}>
        <Stepper size="lg" index={activeStep}>
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
                {/* <StepDescription>{step.subtitle}</StepDescription> */}
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box mt={10}>
        <FormProvider {...methods}>
          <MultiStepForm
            steps={steps}
            step={activeStep}
            setStep={setActiveStep}
          />
        </FormProvider>
      </Box>
    </div>
  );
}
