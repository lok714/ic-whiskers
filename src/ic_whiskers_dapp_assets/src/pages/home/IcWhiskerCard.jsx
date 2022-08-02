import React from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  VStack,
  Skeleton,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const IcWhiskerCard = ({ mainImg, logoImg, show }) => {
  return (
    <NavLink to="/marketplace">
      <Flex
        flex={1}
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"auto"}
      >
        <Box
          role={"group"}
          w={"auto"}
          backgroundColor={"#fff"}
          rounded={"lg"}
          border={"2px"}
          borderColor={"#e5e8eb"}
          boxShadow="sm"
        >
          <Box rounded={"lg"} pos={"relative"} overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg="#fff"
              rounded={"lg"}
              height={["220px", null, "350px"]}
              width={"auto"}
              objectFit={"cover"}
              src={mainImg}
              fallback={<Skeleton height={["220px", null, "350px"]} />}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
          {show ? (
            <Flex p={2} align="center">
              <ChakraImage
                src={logoImg}
                h={["30px", null, "50px"]}
                w={"auto"}
                rounded="full"
              />
              <VStack px={3} align={"start"} justify={"space-between"}>
                <Text
                  color={"gray.500"}
                  casing={"uppercase"}
                  fontSize={{ base: "6pt", sm: "xs", md: "xs" }}
                >
                  CatPirate presents
                </Text>
                <Heading fontSize={{ base: "xs", sm: "xs", md: "sm" }}>
                  IC Whiskers
                </Heading>
              </VStack>
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </NavLink>
  );
};

export default IcWhiskerCard;
