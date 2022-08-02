import React from "react";
import {
  Flex,
  Stack,
  Button,
  Text,
  Heading,
  Container,
  Box,
} from "@chakra-ui/react";
import bg from "../../../assets/ic_whiskersBG.png";
import logo from "../../../assets/whiskers_logo.jpg";
import catLogo from "../../../assets/cat_logo.png";
import { GiCat } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import IcWhiskerCard from "./IcWhiskerCard";
import Gallery from "./Gallery";
import About from "./About";

const Home = () => {
  return (
    <Flex
      w={"full"}
      h={"100%"}
      backgroundImage={bg}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Box
        w="full"
        bgGradient={"linear(to right bottom, whiteAlpha.900, transparent)"}
      >
        <HomeBanner />
        <Gallery />
        <About />
      </Box>
    </Flex>
  );
};

const HomeBanner = () => {
  return (
    <Container maxW={"7xl"} px={20}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 5 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={"bold"}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            Mint, Collect and Trade IC Whisker NFTs
          </Heading>
          <Text color={"blackAlpha"} fontSize={{ base: "xl", md: "4xl" }}>
            A timeless set of hand drawn NFTs released by IC Whiskers
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={"row"}>
            <NavLink to={"/mint"}>
              <Button
                bg="pink.400"
                color="white"
                size={"lg"}
                colorScheme="pink.400"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                rightIcon={<GiCat />}
              >
                Collect
              </Button>
            </NavLink>
            <NavLink to={"/marketplace"}>
              <Button
                bg="white"
                boxShadow="base"
                color="pink.400"
                size={"lg"}
                colorScheme="pink.400"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                rightIcon={<GiCat />}
              >
                Trade
              </Button>
            </NavLink>
          </Stack>
        </Stack>
        <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={true} />
      </Stack>
    </Container>
  );
};

export default Home;
