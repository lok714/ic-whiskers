import React from "react";
import { Box, Stack, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Purchase from "./Purchase";
import ProgressStats from "./Progress";
import Airdrop from "./Airdrop";

const mintOption1 = {
  amount: 100000000,
  nfts: 1,
};

const mintOption2 = {
  amount: 1000000000,
  nfts: 10,
};

const mintOption3 = {
  amount: 500000000,
  nfts: 5,
};

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={"gray.300"}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

const Mint = () => {
  return (
    <>
      <Box pt={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Mint IC Whiskers
          </Heading>
        </VStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Fan
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="5xl" fontWeight="900">
                  1
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  NFT
                </Text>
              </HStack>
            </Box>
            <VStack bg={"gray.50"} py={4} borderBottomRadius={"xl"}>
              <Box w="80%" pt={2}>
                <Purchase nfts={mintOption1.nfts} amount={mintOption1.amount} />
              </Box>
            </VStack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: "translate(-50%)" }}
              >
                <Text
                  textTransform="uppercase"
                  bg={"#ed64a6"}
                  px={3}
                  py={1}
                  color={"white"}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl"
                >
                  Most Popular
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Legendary Supporter
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="5xl" fontWeight="900">
                    10
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    NFTs
                  </Text>
                </HStack>
              </Box>
              <VStack bg={"gray.50"} py={4} borderBottomRadius={"xl"}>
                <Box w="80%" pt={2}>
                  <Purchase
                    nfts={mintOption2.nfts}
                    amount={mintOption2.amount}
                  />
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>

          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Super Fan
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="5xl" fontWeight="900">
                  5
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  NFTs
                </Text>
              </HStack>
            </Box>
            <VStack bg={"gray.50"} py={4} borderBottomRadius={"xl"}>
              <Box w="80%" pt={2}>
                <Purchase nfts={mintOption3.nfts} amount={mintOption3.amount} />
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Box>
      <Airdrop />
      <ProgressStats />
    </>
  );
};

export default Mint;
