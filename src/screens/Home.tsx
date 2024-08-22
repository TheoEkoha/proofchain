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

const steps = [
  { title: "Fill", description: "Digital certification Info" },
  { title: "Upload", description: "Files IPFS" },
  { title: "Create", description: "Mint your SBT" },
];

export function Home() {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  console.log("ste", steps);
  return <div className="p-2">home</div>;
}
