import { Heading, Highlight, Text, Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import CertificationCard, {
  CertificationStatus,
} from "../../components/Card/CertificationCard.component";

export const MintForm = ({ description }: { description: string }) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const file = watch("file");
  const image = watch("image");
  const certificationTitle = watch("title");
  const certificationDescription = watch("description");
  const tags = watch("tags");
  const issuedBy = watch("issuedBy");
  const issuedOn = watch("issuedOn");
  const identifiant = watch("identifiant");

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
      <Box display={"flex"} justifyContent={"center"} mt={"2%"}>
        <Text>Your digital certification is ready to be created</Text>
      </Box>
      <Box display={"flex"} justifyContent={"center"} mt={"2%"}>
        <CertificationCard
          title={certificationTitle}
          image={image ? window.URL.createObjectURL(image[0]) : ""}
          status={CertificationStatus.CERTIFIED}
          issuedBy={issuedBy}
          issuedOn={issuedOn}
          identifiant={identifiant}
          tagsValue={tags}
          isMinted={false}
          description={certificationDescription}
        />
      </Box>
    </>
  );
};
