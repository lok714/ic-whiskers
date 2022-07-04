import React from "react";
import {
  Flex,
  Stack,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import bg from "../../../assets/whiskers_bg.png";
import { GiCat } from "react-icons/gi";

const Home = () => {
  return (
    <Flex
      w={"full"}
      h={"85vh"}
      // backgroundImage={bg}
      // backgroundSize={"cover"}
      // backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"black"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Mint, Collect and Trade
          </Text>
          <Heading
            bgGradient="linear(to-t, #f953c6, #b91d73)"
            bgClip="text"
            fontSize={useBreakpointValue({ base: "5xl", md: "6xl" })}
          >
            IC Whiskers
          </Heading>
          <Stack direction={"row"}>
            <Button
              size={useBreakpointValue(["sm", "lg"])}
              fontSize={{ base: "sm", sm: "sm", md: "md" }}
              rounded={"full"}
              color={"white"}
              bgGradient="linear(to-r, #c61682, #ec63d6)"
              _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
              leftIcon={<GiCat />}
            >
              Mint ICWhisker
            </Button>
            <Button
              size={useBreakpointValue(["sm", "lg"])}
              fontSize={{ base: "sm", sm: "sm", md: "md" }}
              fontWeight={"bold"}
              rounded={"full"}
              color={"white"}
              bgGradient="linear(to-r, #c61682, #ec63d6)"
              _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
              leftIcon={<GiCat />}
            >
              Trade ICWhisker
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Home;
