import {
  Stack,
  Heading,
  Text,
  Container,
  Icon,
  Flex,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { IconTerminal2 } from "@tabler/icons-react";
import React from "react";
import { useId } from "react";
import { FcDiploma1, FcInspection, FcUpload } from "react-icons/fc";
import { LinkedinIcon, XIcon } from "react-share";
import { GlareCard } from "../Card/GlareCard.component";

export function FeaturesSectionDemo2() {
  return (
    <div className="py-5 lg:py-5">
      <Stack
        className="py-5 lg:py-5"
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
      >
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          How it works
        </Heading>
        <Text color={"gray.400"} fontSize={{ base: "sm", sm: "lg" }}>
          ProofChain allows you to create simply your digital certificate thanks
          to the technology of blockchain
        </Text>
      </Stack>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature, idx) => (
          <GlareCard
            key={`feature-first-${idx}`} // Assure-toi que la clé est unique
            className="flex flex-col items-center justify-center"
          >
            <div
              style={{ height: 240, width: 275 }}
              key={feature.title} // Cette clé pourrait être non unique si les titres sont dupliqués
              className="relative bg-gradient-to-b dark:from-neutral-900  bg-gray-700 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
            >
              <Grid size={20} />
              <Stack align={"start"} spacing={2}>
                {feature.icon2 && (
                  <Flex
                    position={"relative"}
                    left={"18%"}
                    w={16}
                    h={16}
                    align={"center"}
                    justify={"center"}
                    color={"white"}
                    rounded={"full"}
                    bg={"black"}
                  >
                    <Icon as={feature.icon2} w={10} h={10} />
                  </Flex>
                )}
                <Flex
                  w={16}
                  h={16}
                  align={"center"}
                  justify={"center"}
                  color={"white"}
                  rounded={"full"}
                  bg={
                    feature?.icon2
                      ? "rgb(0, 119, 181)"
                      : useColorModeValue("gray.100", "gray.600")
                  }
                  {...(feature?.icon2 ? { position: "absolute" } : {})}
                >
                  <Icon as={feature.icon} w={10} h={10} />
                </Flex>
              </Stack>
              <Box mt={3}>
                <p className="text-base font-bold dark:text-white relative z-20">
                  {feature.title}
                </p>
                <p className=" dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
                  {feature.description}
                </p>
              </Box>
            </div>
          </GlareCard>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "1. Create",
    description: "Provide your certificate information",
    icon: FcInspection,
    icon2: null,
  },
  {
    title: "2. Upload",
    description: "Select your proofs of completion",
    icon: FcUpload,
    icon2: null,
  },
  {
    title: "3. Publish",
    description:
      "Your digital certification is ready to be created on the blockchain",
    icon: FcDiploma1,
    icon2: null,
  },
  {
    title: "4. Share",
    description:
      "Share and publish easily your certificates on your social media",
    icon: LinkedinIcon,
    icon2: XIcon,
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, index: number) => (
            <rect
              strokeWidth="0"
              key={`square-${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
