import React from "react";
import {
  Progress,
  Heading,
  Text,
  Box,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";

const ProgressStats = () => {
  return (
    <Center>
      <Box p={10} maxW="1250px">
        <Text>800/100</Text>
        <Heading size={useBreakpointValue(["md", "lg"])} mb={2}>
          80% of NFTs minted
        </Heading>
        <Progress
          width={useBreakpointValue([null, "5xl"])}
          hasStripe
          isAnimated
          colorScheme="pink"
          value={80}
          bg={"#f1c0da"}
          borderRadius="lg"
          height={10}
        />
      </Box>
    </Center>
  );
};

export default ProgressStats;
