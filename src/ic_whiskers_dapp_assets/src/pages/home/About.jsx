import React from "react";
import {
  Center,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Box,
  Container,
  SimpleGrid,
  Image as ChakraImage,
} from "@chakra-ui/react";
import Powered from "../../../assets/powered.dark.svg";

const about = [
  { label: "Total Subscribers", value: "71,887" },
  { label: "Avg. Open Rate", value: "56.87%" },
  { label: "Avg. Click Rate", value: "12.87%" },
];

const About = () => {
  return (
    <>
      <Center py={5}>
        <Heading
          fontWeight={"bold"}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          About
        </Heading>
      </Center>
      <Box as="section" py={{ base: "4", md: "8" }}>
        <Container>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
            {about.map(({ label, value }) => (
              <Stat key={label} label={label} value={value} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* <Center>
        <ChakraImage
          transform="scale(1.0)"
          bg="#fff"
          rounded={"lg"}
          height={"100px"}
          width={"auto"}
          objectFit={"cover"}
          src={Powered}
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Center> */}
    </>
  );
};

export const Stat = (props) => {
  const { label, value, ...boxProps } = props;

  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      borderRadius="lg"
      boxShadow={"lg"}
      bg={"white"}
      {...boxProps}
    >
      <Stack>
        <Text fontSize="md" color="muted">
          {label}
        </Text>
        <Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
          {value}
        </Heading>
      </Stack>
    </Box>
  );
};
export default About;
